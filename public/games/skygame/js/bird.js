import { randomRange } from './utils.js';

const OBSTACLE_TYPES = ['brown-bird', 'white-bird'];

// Bird represents a flying obstacle with a smooth, natural wing-flap animation.
export default class Bird {
    constructor(spriteImage = null) {
        this.width = 66;
        this.height = 42;
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.wingPhase = 0;
        this.flapSpeed = 0;
        this.bobPhase = 0;
        this.bobAmplitude = 0;
        this.baseY = 0;
        this.type = 'brown-bird';
        this.sprite = spriteImage;
        this.frames = [];
        this.frameCount = 0;
        this.frameIndex = 0;
        this.frameFloat = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
        if (this.sprite && this.sprite.width && this.sprite.height) {
            // try to detect horizontal frames by aspect ratio
            const approx = Math.round(this.sprite.width / this.sprite.height);
            this.frameCount = Math.max(1, approx);
            this.frameWidth = Math.floor(this.sprite.width / this.frameCount);
            this.frameHeight = this.sprite.height;
        }
    }

    reset(screenWidth, screenHeight, speedModifier = 0, speedRange = { min: 250, max: 380 }) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.x = this.screenWidth + 20;
        this.baseY = randomRange(this.screenHeight * 0.08, this.screenHeight * 0.82 - this.height);
        this.speed = randomRange(speedRange.min, speedRange.max) + speedModifier;
        // Per-bird randomization so birds don't flap in sync.
        this.wingPhase = randomRange(0, Math.PI * 2);
        this.flapSpeed = randomRange(5.5, 8.5); // flaps per cycle
        this.bobPhase = randomRange(0, Math.PI * 2);
        this.bobAmplitude = randomRange(2, 6);
        this.frameFloat = 0;
        this.frameIndex = 0;
        this.y = this.baseY;
        this.type = OBSTACLE_TYPES[Math.floor(randomRange(0, OBSTACLE_TYPES.length))];
    }

    // Assign the correct animation frames for this bird's type.
    setFramesByType(type, birdFrames = {}) {
        this.type = type || this.type;
        const key = this.type.startsWith('white') ? 'white' : 'brown';
        const frames = birdFrames ? birdFrames[key] : null;
        if (Array.isArray(frames) && frames.length > 0) {
            this.frames = frames.filter((f) => f != null);
            this.frameCount = this.frames.length;
        } else {
            this.frames = [];
            this.frameCount = 0;
        }
    }

    getBounds() {
        // Return a smaller, centered hitbox (55% width / 60% height) so
        // collisions only trigger on actual visual overlap, not when the
        // player is still visually far from the bird.
        const hitW = this.width * 0.55;
        const hitH = this.height * 0.6;
        return {
            x: this.x + (this.width - hitW) * 0.5,
            y: this.y + (this.height - hitH) * 0.5,
            width: hitW,
            height: hitH,
        };
    }

    update(deltaTime) {
        this.x -= this.speed * deltaTime;
        this.wingPhase += deltaTime * this.flapSpeed;
        this.bobPhase += deltaTime * 2.2;

        // Gentle vertical bob for a natural gliding flight path.
        this.y = this.baseY + Math.sin(this.bobPhase) * this.bobAmplitude;

        if (this.frameCount > 0) {
            // Map the wing phase onto a smooth up-and-down cycle so the wings
            // flap continuously instead of snapping back to frame 0.
            const cycle = Math.sin(this.wingPhase); // -1 .. 1
            const t = (cycle + 1) * 0.5; // 0 .. 1
            this.frameFloat = t * (this.frameCount - 1);
            this.frameIndex = Math.round(this.frameFloat);
        }
    }

    isOffScreen() {
        return this.x + this.width < -20;
    }

    draw(context) {
        context.save();
        // Prefer the per-frame animation when frames are available.
        if (this.frames.length > 0) {
            const frame = this.frames[this.frameIndex % this.frames.length];
            if (frame) {
                context.drawImage(frame, this.x, this.y, this.width, this.height);
                context.restore();
                return;
            }
        }
        // Fallback to sprite sheet slicing.
        if (this.sprite && this.frameCount > 0) {
            const frame = Math.max(0, Math.min(this.frameCount - 1, Math.round(this.frameFloat)));
            const sx = frame * this.frameWidth;
            const sy = 0;
            context.drawImage(this.sprite, sx, sy, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
        } else {
            context.translate(this.x, this.y);
            context.fillStyle = '#ffd166';
            context.shadowColor = 'rgba(255, 209, 102, 0.32)';
            context.shadowBlur = 18;
            context.fillRect(0, 0, this.width, this.height);
            context.fillStyle = '#2b1f0f';
            context.beginPath();
            context.moveTo(this.width * 0.16, this.height * 0.34);
            context.lineTo(this.width * 0.5, this.height * 0.48);
            context.lineTo(this.width * 0.16, this.height * 0.68);
            context.closePath();
            context.fill();
        }
        context.restore();
    }
}
