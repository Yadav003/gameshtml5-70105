import { randomRange } from './utils.js';

// Simple particle pool to avoid allocations in the main loop.
export default class ParticleSystem {
    constructor(maxParticles = 40) {
        this.particles = Array.from({ length: maxParticles }, () => this.createParticle());
        this.activeParticles = [];
    }

    createParticle() {
        return {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            life: 0,
            alpha: 0,
            radius: 0,
        };
    }

    spawn(x, y, count = 8) {
        for (let index = 0; index < count; index += 1) {
            const particle = this.particles.find((entry) => entry.life <= 0);
            if (!particle) {
                return;
            }
            particle.x = x;
            particle.y = y;
            particle.vx = randomRange(-90, 90);
            particle.vy = randomRange(-210, -70);
            particle.life = 0.4 + Math.random() * 0.22;
            particle.alpha = 1;
            particle.radius = randomRange(2.4, 4.8);
            this.activeParticles.push(particle);
        }
    }

    update(deltaTime) {
        const active = [];
        for (const particle of this.activeParticles) {
            if (particle.life <= 0) {
                continue;
            }
            particle.life -= deltaTime;
            particle.x += particle.vx * deltaTime;
            particle.y += particle.vy * deltaTime;
            particle.alpha = particle.life / 0.4;
            if (particle.life > 0) {
                active.push(particle);
            }
        }
        this.activeParticles = active;
    }

    draw(context) {
        context.save();
        context.fillStyle = 'rgba(255,255,255,0.92)';
        for (const particle of this.activeParticles) {
            context.globalAlpha = Math.max(particle.alpha, 0);
            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
        }
        context.restore();
    }
}
