import Bird from './bird.js';
import { randomRange } from './utils.js';

// Manages bird spawning, difficulty growth, and efficient reuse of obstacle objects.
export default class ObstacleManager {
    constructor(screenWidth, screenHeight, sprite = null) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.birds = [];
        this.birdFrames = {};
        this.pool = Array.from({ length: 16 }, () => new Bird(sprite));

        this.spawnTimer = 0;
        this.spawnInterval = 1.8;
        this.minInterval = 0.85;
        this.maxInterval = 2.4;
        this.elapsedTime = 0;
        this.difficultyModifier = 0;
    }

    reset() {
        this.spawnTimer = 0;
        this.spawnInterval = 1.6;
        this.elapsedTime = 0;
        this.difficultyModifier = 0;
        this.birds.length = 0;
        this.pool.forEach((bird) => {
            bird.x = -1000;
        });
    }

    resize(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.pool.forEach((bird) => {
            bird.screenWidth = screenWidth;
            bird.screenHeight = screenHeight;
        });
    }

    setSprite(sprite) {
        // set sprite for existing pool and future birds
        for (const b of this.pool) {
            b.sprite = sprite;
            if (sprite && sprite.width && sprite.height) {
                const approx = Math.round(sprite.width / sprite.height);
                b.frameCount = Math.max(1, approx);
                b.frameWidth = Math.floor(sprite.width / b.frameCount);
                b.frameHeight = sprite.height;
            }
        }
    }

    setBirdFrames(birdFrames) {
        this.birdFrames = birdFrames || {};
        // apply to existing pool
        for (const b of this.pool) {
            b.setFramesByType(b.type, this.birdFrames);
        }
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
        this.spawnTimer += deltaTime;
        this.difficultyModifier = Math.min(4.0, this.elapsedTime * 0.06);

        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnBirds();
            this.spawnTimer = 0;
            this.spawnInterval = Math.max(
                this.minInterval,
                randomRange(this.minInterval, this.maxInterval) - this.difficultyModifier * 0.08,
            );
        }

        for (const bird of this.birds) {
            bird.update(deltaTime);
        }

        for (let index = this.birds.length - 1; index >= 0; index -= 1) {
            const bird = this.birds[index];
            if (bird.isOffScreen()) {
                this.pool.push(bird);
                this.birds.splice(index, 1);
            }
        }
    }

    spawnBirds() {
        const birdCount = Math.random() < 0.22 ? 2 : 1;
        const speedRange = {
            min: 250 + this.difficultyModifier * 15,
            max: 380 + this.difficultyModifier * 12,
        };

        for (let index = 0; index < birdCount; index += 1) {
            const bird = this.pool.pop() || new Bird();
            bird.reset(this.screenWidth, this.screenHeight, this.difficultyModifier * 34, speedRange);
            // assign the correct animation frames based on the bird's type
            bird.setFramesByType(bird.type, this.birdFrames);

            if (birdCount === 2) {
                bird.x += index * 68;
                bird.y = Math.min(bird.y + index * 40, this.screenHeight - bird.height - 20);
            }

            this.birds.push(bird);
        }
    }

    draw(context) {
        for (const bird of this.birds) {
            bird.draw(context);
        }
    }
}
