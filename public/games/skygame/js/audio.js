// AudioManager uses the Web Audio API to generate lightweight game sounds.
const AudioContext = window.AudioContext || window.webkitAudioContext;
const DEFAULT_VOLUME = 0.18;

export default class AudioManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.ambientGain = null;
        this.ambientTimer = null;
        this.muted = false;
    }

    init() {
        if (this.audioContext) {
            return;
        }

        this.audioContext = new AudioContext();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.muted ? 0 : 1;
        this.masterGain.connect(this.audioContext.destination);

        this.ambientGain = this.audioContext.createGain();
        this.ambientGain.gain.value = 0.08;
        this.ambientGain.connect(this.masterGain);
    }

    async resume() {
        this.init();

        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.muted ? 0 : 1, this.audioContext.currentTime);
        }
        return this.muted;
    }

    createOscillator(type, frequency, duration, volume, destination) {
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
        oscillator.connect(gain);
        gain.connect(destination);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration + 0.02);
    }

    createNoise(duration, volume) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i += 1) {
            data[i] = (Math.random() * 2 - 1) * volume;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(volume * 0.5, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
        source.connect(gain);
        gain.connect(this.masterGain);
        source.start();
    }

    async playJump() {
        if (this.muted) {
            return;
        }
        await this.resume();
        this.createOscillator('triangle', 780, 0.12, 0.16, this.masterGain);
        this.createNoise(0.08, 0.05);
    }

    async playCollision() {
        if (this.muted) {
            return;
        }
        await this.resume();
        this.createOscillator('square', 140, 0.24, 0.26, this.masterGain);
        this.createOscillator('sine', 240, 0.14, 0.18, this.masterGain);
        this.createNoise(0.14, 0.14);
    }

    async playGameOver() {
        if (this.muted) {
            return;
        }
        await this.resume();
        this.createOscillator('sine', 400, 0.16, 0.16, this.masterGain);
        this.createOscillator('sine', 300, 0.2, 0.12, this.masterGain);
        this.createOscillator('sine', 220, 0.28, 0.10, this.masterGain);
    }

    async startAmbient() {
        await this.resume();
        this.stopAmbient();
        this.ambientTimer = window.setInterval(async () => {
            if (this.muted) {
                return;
            }
            const frequency = 320 + Math.random() * 90;
            const duration = 0.11 + Math.random() * 0.08;
            this.createOscillator('triangle', frequency, duration, 0.06, this.ambientGain);
        }, 750 + Math.random() * 380);
    }

    stopAmbient() {
        if (this.ambientTimer) {
            window.clearInterval(this.ambientTimer);
            this.ambientTimer = null;
        }
    }
}
