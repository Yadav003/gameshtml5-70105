import { randomRange } from './utils.js';

const CLOUD_COUNT = 12;
const LAYER_SPEEDS = [12, 24, 38];
const CLOUD_COLORS = ['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.55)'];

export default class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.layers = this.generateCloudLayers();
        this.image = null;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.layers = this.generateCloudLayers();
    }

    setImage(img) {
        this.image = img;
    }

    generateCloudLayers() {
        const layers = [];
        for (let layerIndex = 0; layerIndex < LAYER_SPEEDS.length; layerIndex += 1) {
            const clouds = [];
            for (let count = 0; count < CLOUD_COUNT / 3; count += 1) {
                clouds.push({
                    x: randomRange(0, this.width * 1.2),
                    y: randomRange(this.height * 0.06, this.height * 0.42),
                    width: randomRange(this.width * 0.18, this.width * 0.32),
                    height: randomRange(this.height * 0.08, this.height * 0.14),
                    speed: LAYER_SPEEDS[layerIndex],
                    alpha: 0.45 + layerIndex * 0.15,
                });
            }
            layers.push(clouds);
        }
        return layers;
    }

    update(deltaTime) {
        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex += 1) {
            const clouds = this.layers[layerIndex];
            const speed = LAYER_SPEEDS[layerIndex];
            for (const cloud of clouds) {
                cloud.x -= speed * deltaTime;
                if (cloud.x + cloud.width < -80) {
                    cloud.x = this.width + randomRange(20, 160);
                    cloud.y = randomRange(this.height * 0.08, this.height * 0.44);
                }
            }
        }
    }

    draw(context) {
        context.save();
        // Draw full-bleed background image if provided using CSS-like cover behavior
        if (this.image) {
            const img = this.image;
            const canvasRatio = this.width / this.height;
            const imgRatio = img.width / img.height;

            let drawWidth = this.width;
            let drawHeight = this.height;
            let sx = 0;
            let sy = 0;
            let sWidth = img.width;
            let sHeight = img.height;

            if (imgRatio > canvasRatio) {
                // image is wider — crop sides
                sWidth = Math.round(img.height * canvasRatio);
                sx = Math.round((img.width - sWidth) * 0.5);
            } else if (imgRatio < canvasRatio) {
                // image is taller — crop top/bottom
                sHeight = Math.round(img.width / canvasRatio);
                sy = Math.round((img.height - sHeight) * 0.5);
            }

            context.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, drawWidth, drawHeight);
        } else {
            const gradient = context.createLinearGradient(0, 0, 0, this.height);
            gradient.addColorStop(0, '#66c2ff');
            gradient.addColorStop(0.4, '#93d7ff');
            gradient.addColorStop(1, '#b2e4ff');
            context.fillStyle = gradient;
            context.fillRect(0, 0, this.width, this.height);

            context.fillStyle = 'rgba(255,255,255,0.18)';
            context.fillRect(0, this.height * 0.72, this.width, this.height * 0.32);
        }

        for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex += 1) {
            const clouds = this.layers[layerIndex];
            const color = CLOUD_COLORS[layerIndex];
            context.globalAlpha = clouds[0].alpha;
            context.fillStyle = color;
            for (const cloud of clouds) {
                context.beginPath();
                context.ellipse(cloud.x + cloud.width * 0.25, cloud.y + cloud.height * 0.55, cloud.width * 0.3, cloud.height * 0.28, 0, 0, Math.PI * 2);
                context.ellipse(cloud.x + cloud.width * 0.55, cloud.y + cloud.height * 0.32, cloud.width * 0.42, cloud.height * 0.3, 0, 0, Math.PI * 2);
                context.ellipse(cloud.x + cloud.width * 0.78, cloud.y + cloud.height * 0.48, cloud.width * 0.2, cloud.height * 0.24, 0, 0, Math.PI * 2);
                context.fill();
            }
        }
        context.restore();
    }
}
