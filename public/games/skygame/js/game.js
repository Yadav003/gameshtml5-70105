import Player from './player.js';
import InputManager from './input.js';
import UIManager from './ui.js';
import ObstacleManager from './obstacleManager.js';
import Background from './background.js';
import ParticleSystem from './particles.js';
import AudioManager from './audio.js';
import { rectanglesIntersect } from './utils.js';

export const GameState = {
    Intro: 'INTRO',
    Playing: 'PLAYING',
    GameOver: 'GAME_OVER',
};

const STORAGE_KEY = 'sky-escape-best-score';

export default class Game {
    constructor(canvas, overlay, muteButton, assets = {}, birdFrames = null) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.overlay = overlay;
        this.input = new InputManager();
        this.ui = new UIManager(overlay);
        this.audioManager = new AudioManager();
        this.background = new Background(0, 0);
        this.particleSystem = new ParticleSystem(48);
        this.muteButton = muteButton;
        this.assets = assets;
        this.birdFrames = birdFrames;
        this.topUI = document.getElementById('top-ui');
        this.scoreLabel = document.getElementById('score-label');
        this.backButton = document.getElementById('back-button');

        this.state = GameState.Intro;
        this.lastTimestamp = 0;
        this.deltaTime = 0;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.gameTimer = 0;
        this.score = 0;
        this.scoreTimer = 0;
        this.bestScore = this.loadBestScore();
        this.shakeTimer = 0;
        this.shakeIntensity = 0;
        this.hitFlashTimer = 0;

        this.resize();
        this.player = new Player(this.screenWidth, this.screenHeight, this.assets);
        this.obstacles = new ObstacleManager(this.screenWidth, this.screenHeight);

        // wire assets into subsystems
        if (this.assets && this.assets.background) {
            this.background.setImage(this.assets.background);
        }
        if (this.birdFrames) {
            this.obstacles.setBirdFrames(this.birdFrames);
        } else if (this.assets && this.assets.bird_sprite) {
            this.obstacles.setSprite(this.assets.bird_sprite);
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleMuteToggle = this.handleMuteToggle.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.audioManager.init();
        this.configureMuteButton();
    }

    resize() {
        const devicePixelRatio = window.devicePixelRatio || 1;
        const parentRect = this.canvas.parentElement.getBoundingClientRect();
        const width = Math.max(1, Math.floor(parentRect.width));
        const height = Math.max(1, Math.floor(parentRect.height));

        this.screenWidth = width;
        this.screenHeight = height;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = Math.floor(width * devicePixelRatio);
        this.canvas.height = Math.floor(height * devicePixelRatio);
        this.context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        if (this.player) {
            this.player.resize(width, height);
        }

        if (this.obstacles) {
            this.obstacles.resize(width, height);
        }

        this.background.resize(width, height);
    }

    start() {
        this.input.attach(this.canvas);
        if (this.muteButton) {
            this.muteButton.addEventListener('click', this.handleMuteToggle);
        }
        if (this.backButton) {
            this.backButton.addEventListener('click', this.handleBack);
        }
        window.addEventListener('resize', this.handleResize);
        this.showIntro();
        this.lastTimestamp = performance.now();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    showIntro() {
        this.state = GameState.Intro;
        this.hideTopUI();
        this.ui.showIntro(this.handleStart);
    }

    setupNewGame() {
        this.player.reset();
        this.obstacles.reset();
        this.gameTimer = 0;
        this.score = 0;
        this.scoreTimer = 0;
        this.state = GameState.Playing;
        this.lastTimestamp = performance.now();
        this.ui.hide();
        this.showTopUI();
        this.updateScoreLabel();
        this.audioManager.startAmbient();
        this.shakeTimer = 0;
        this.hitFlashTimer = 0;
        // ensure player hit state cleared
        if (this.player) this.player.hit = false;

        // spawn an initial set of birds immediately to avoid countdown
        if (this.obstacles && typeof this.obstacles.spawnBirds === 'function') {
            this.obstacles.spawnBirds();
        }
    }

    handleStart() {
        this.setupNewGame();
    }

    handleRestart() {
        this.setupNewGame();
    }

    loadBestScore() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? Number(stored) : 0;
    }

    configureMuteButton() {
        if (!this.muteButton) {
            return;
        }
        this.updateMuteButton();
    }

    showTopUI() {
        if (this.topUI) {
            this.topUI.classList.remove('hidden');
        }
    }

    hideTopUI() {
        if (this.topUI) {
            this.topUI.classList.add('hidden');
        }
    }

    handleBack() {
        if (this.state === GameState.Playing) {
            this.audioManager.stopAmbient();
        }

        // Prefer a real back navigation when possible
        if (window.history && window.history.length > 1) {
            window.history.back();
            return;
        }

        // Fallback redirect
        try {
            window.location.href = '/playarena/games';
        } catch (e) {
            this.showIntro();
        }
    }

    updateScoreLabel() {
        if (!this.scoreLabel) {
            return;
        }
        const currentScore = String(this.score).padStart(6, '0');
        this.scoreLabel.textContent = currentScore;
    }

    async handleMuteToggle() {
        await this.audioManager.resume();
        const muted = this.audioManager.toggleMute();
        this.updateMuteButton(muted);
    }

    updateMuteButton(muted = this.audioManager.muted) {
        if (!this.muteButton) {
            return;
        }
        this.muteButton.textContent = muted ? '🔇' : '🔊';
        this.muteButton.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    }

    saveBestScore(score) {
        if (score > this.bestScore) {
            this.bestScore = score;
            localStorage.setItem(STORAGE_KEY, String(this.bestScore));
        }
    }

    // Start a screen shake effect
    triggerScreenShake(duration = 0.2, intensity = 6) {
        this.shakeTimer = duration;
        this.shakeIntensity = intensity;
    }

    // Compute current shake offset based on remaining shake time
    getShakeOffset() {
        if (!this.shakeTimer || this.shakeTimer <= 0) {
            return { x: 0, y: 0 };
        }
        // ease out the shake over time
        const t = Math.max(0, Math.min(1, this.shakeTimer / 0.6));
        const mag = this.shakeIntensity * t;
        return {
            x: (Math.random() * 2 - 1) * mag,
            y: (Math.random() * 2 - 1) * mag,
        };
    }

    update(deltaTime) {
        this.background.update(deltaTime);
        this.particleSystem.update(deltaTime);
        if (this.hitFlashTimer > 0) {
            this.hitFlashTimer -= deltaTime;
        }
        if (this.shakeTimer > 0) {
            this.shakeTimer -= deltaTime;
        }

        if (this.state !== GameState.Playing) {
            return;
        }

        const jumpRequested = this.input.consumeJump();
        if (jumpRequested) {
            this.particleSystem.spawn(this.player.x + this.player.width * 0.5, this.player.y + this.player.height, 10);
            void this.audioManager.playJump();
        }

        this.player.update(deltaTime, jumpRequested);
        this.obstacles.update(deltaTime);

        this.gameTimer += deltaTime;

        // Score increases by +1 every 0.5 seconds (2 points per second),
        // always incrementing by 1 so the sequence stays 1,2,3,4,5...
        this.scoreTimer += deltaTime;
        if (this.scoreTimer >= 0.5) {
            this.scoreTimer -= 0.5;
            this.score += 1;
            this.updateScoreLabel();
        }

        if (this.isPlayerOutOfBounds() || this.detectCollision()) {
            this.endGame();
        }
    }

    isPlayerOutOfBounds() {
        return this.player.y <= 0 || this.player.y >= this.screenHeight - this.player.height;
    }

    detectCollision() {
        const playerBounds = this.player.getBounds ? this.player.getBounds() : {
            x: this.player.x,
            y: this.player.y,
            width: this.player.width,
            height: this.player.height,
        };

        return this.obstacles.birds.some((bird) => {
            return rectanglesIntersect(playerBounds, bird.getBounds());
        });
    }

    endGame() {
        this.state = GameState.GameOver;
        this.hideTopUI();
        this.saveBestScore(this.score);
        this.audioManager.stopAmbient();
        void this.audioManager.playCollision();
        window.setTimeout(() => {
            void this.audioManager.playGameOver();
        }, 120);
        this.triggerScreenShake(0.24, 8);
        this.hitFlashTimer = 0.22;
        // Show hit appearance if player supports it
        if (this.player) {
            this.player.hit = true;
        }
        this.ui.showGameOver(this.score, this.bestScore, this.handleRestart);
    }

    render() {
        const width = this.canvas.width / (window.devicePixelRatio || 1);
        const height = this.canvas.height / (window.devicePixelRatio || 1);
        const shake = this.getShakeOffset();

        this.context.clearRect(0, 0, width, height);
        this.context.save();
        this.context.translate(shake.x, shake.y);

        this.background.draw(this.context);
        this.drawFramework(width, height);
        this.obstacles.draw(this.context);
        this.player.draw(this.context);
        this.particleSystem.draw(this.context);
        this.context.restore();

        if (this.hitFlashTimer > 0) {
            this.context.save();
            this.context.fillStyle = `rgba(255, 255, 255, ${Math.min(this.hitFlashTimer * 3, 0.28)})`;
            this.context.fillRect(0, 0, width, height);
            this.context.restore();
        }
    }


    drawFramework(width, height) {
        const topLineY = height * 0.05;
        const bottomLineY = height * 0.95;

        this.context.save();
        this.context.lineWidth = 6;
        this.context.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        this.context.setLineDash([14, 14]);

        this.context.beginPath();
        this.context.moveTo(0, topLineY);
        this.context.lineTo(width, topLineY);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(0, bottomLineY);
        this.context.lineTo(width, bottomLineY);
        this.context.stroke();

        this.context.restore();
    }

    handleResize() {
        this.resize();
    }

    gameLoop(timestamp) {
        const rawDelta = (timestamp - this.lastTimestamp) / 1000;
        this.deltaTime = Math.min(rawDelta, 0.035);
        this.lastTimestamp = timestamp;

        this.update(this.deltaTime);
        this.render();

        requestAnimationFrame((nextTime) => this.gameLoop(nextTime));
    }
}
