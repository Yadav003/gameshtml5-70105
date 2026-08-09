import { clamp } from './utils.js';

// Player controls physics, position, and rendering state.
export default class Player {
    constructor(screenWidth, screenHeight, assets = {}) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.width = 60;
        this.height = 44;
        this.x = this.screenWidth * 0.3;
        this.y = screenHeight * 0.4;
        this.velocityY = 0;

        this.jumpStrength = -460;
        this.gravity = 1150;
        this.maxFallSpeed = 780;
        this.minY = 0;
        this.maxY = this.screenHeight - this.height;
        this.floatPhase = 0;
        this.floatAmplitude = 2.0;
        this.swingPhase = 0;
        this.swingAmplitude = 0.036; // radians

        // Asset images (SVG) for different states
        this.assets = assets;
        this.images = {
            idle: assets.player_idle || null,
            jump: assets.player_jump || null,
            fall: assets.player_fall || null,
            hit: assets.player_hit || null,
            shadow: assets.player_shadow || null,
        };
        this.hit = false;
    }

    reset() {
        this.x = this.screenWidth * 0.3;
        this.y = this.screenHeight * 0.4;
        this.velocityY = 0;
        this.floatPhase = 0;
        this.swingPhase = 0;
        this.hit = false;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }

    update(deltaTime, shouldJump) {
        if (shouldJump) {
            this.velocityY = this.jumpStrength;
        }

        this.velocityY += this.gravity * deltaTime;
        this.velocityY = clamp(this.velocityY, -Infinity, this.maxFallSpeed);

        this.y += this.velocityY * deltaTime;
        this.y = clamp(this.y, this.minY, this.maxY);

        if (this.y <= this.minY || this.y >= this.maxY) {
            this.velocityY = 0;
        }

        this.floatPhase += deltaTime * 2.1;
        this.swingPhase += deltaTime * 3.8;
    }

    resize(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.x = this.screenWidth * 0.3;
        this.maxY = this.screenHeight - this.height;
        this.y = clamp(this.y, this.minY, this.maxY);
    }

    draw(context) {
        const floatOffset = Math.sin(this.floatPhase) * this.floatAmplitude;
        const drawY = this.y + floatOffset;
        // Draw shadow beneath player using shadow image if available
        context.save();
        const centerX = this.x + this.width * 0.5;
        const shadowImg = this.images.shadow;
        // Shadow scale/alpha depends on vertical position (lower == larger/darker)
        const t = clamp((drawY - this.minY) / (this.maxY - this.minY), 0, 1);
        const shadowScale = 0.6 + t * 0.8; // 0.6 -> 1.4
        const shadowAlpha = 0.28 + t * 0.36; // 0.28 -> 0.64

        if (shadowImg) {
            const sw = shadowImg.width;
            const sh = shadowImg.height;
            const dw = Math.max(12, this.width * shadowScale);
            const dh = (sh / sw) * dw;
            context.globalAlpha = shadowAlpha;
            context.drawImage(shadowImg, centerX - dw * 0.5, drawY + this.height + 6, dw, dh);
            context.globalAlpha = 1;
        } else {
            // fallback soft ellipse shadow
            context.fillStyle = `rgba(8,30,56,${0.12 + t * 0.2})`;
            context.beginPath();
            context.ellipse(centerX, drawY + this.height + 10, this.width * 0.4 * shadowScale, this.height * 0.15 * shadowScale, 0, 0, Math.PI * 2);
            context.fill();
        }

        // Choose the appropriate sprite based on vertical velocity and hit state
        let sprite = this.images.idle;
        if (this.hit && this.images.hit) {
            sprite = this.images.hit;
        } else if (this.velocityY < -60 && this.images.jump) {
            sprite = this.images.jump;
        } else if (this.velocityY > 120 && this.images.fall) {
            sprite = this.images.fall;
        } else if (this.images.idle) {
            sprite = this.images.idle;
        }

        if (sprite) {
            // subtle rotation while floating: velocity-based + gentle swing
            const velRot = Math.max(-0.12, Math.min(0.12, this.velocityY / 1600));
            const swingRot = Math.sin(this.swingPhase) * this.swingAmplitude;
            const rot = velRot + swingRot;
            context.translate(centerX, drawY + this.height * 0.5);
            context.rotate(rot);
            const drawW = this.width * 1.4;
            const drawH = (sprite.height / sprite.width) * drawW;
            context.drawImage(sprite, -drawW * 0.5, -this.height * 0.5, drawW, drawH);
        } else {
            // fallback: simple rectangle placeholder
            context.fillStyle = '#95d7ff';
            context.fillRect(this.x, drawY, this.width, this.height);
        }

        context.restore();
    }
}
