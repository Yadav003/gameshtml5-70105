// UI manager for Sky Escape handles screen overlays and game state screens.
export default class UIManager {
    constructor(container) {
        this.container = container;
    }

    showIntro(onStart) {
        // Simplified intro: only title and play button. Keep background visible.
        this.container.innerHTML = '';
        const panel = document.createElement('div');
        panel.className = 'panel intro-panel';

        const title = document.createElement('h1');
        title.textContent = 'Sky Escape';

        const button = document.createElement('button');
        button.className = 'action-button';
        button.textContent = 'Play';
        button.addEventListener('click', onStart);

        panel.appendChild(title);
        panel.appendChild(button);

        this.container.appendChild(panel);
        this.container.classList.remove('hidden');
    }

    hide() {
        this.container.classList.add('hidden');
    }

    showGameOver(score, bestScore, onRestart) {
        this.container.innerHTML = '';
        const overlay = document.createElement('div');
        overlay.className = 'game-over-overlay';

        const panel = document.createElement('div');
        panel.className = 'panel game-over-panel';

        const title = document.createElement('h1');
        title.textContent = 'Game Over';

        const scoreLabel = document.createElement('div');
        scoreLabel.className = 'result-row';
        scoreLabel.innerHTML = `<span>Score</span><strong>${String(score).padStart(6, '0')}</strong>`;

        const bestLabel = document.createElement('div');
        bestLabel.className = 'result-row';
        bestLabel.innerHTML = `<span>Best</span><strong>${String(bestScore).padStart(6, '0')}</strong>`;

        const button = document.createElement('button');
        button.className = 'action-button';
        button.textContent = 'Play Again';
        button.addEventListener('click', onRestart);

        panel.appendChild(title);
        panel.appendChild(scoreLabel);
        panel.appendChild(bestLabel);
        panel.appendChild(button);
        overlay.appendChild(panel);

        this.container.appendChild(overlay);
        this.container.classList.remove('hidden');
    }
}
