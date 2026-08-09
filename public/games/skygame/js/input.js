// Input manager for Sky Escape.
// It tracks keyboard, mouse, and touch interactions in one place.
export default class InputManager {
    constructor() {
        this.jumpRequested = false;
        this.isPointerDown = false;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    attach(canvas) {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('visibilitychange', this.handleVisibilityChange);
        canvas.addEventListener('mousedown', this.handlePointerDown);
        canvas.addEventListener('touchstart', this.handlePointerDown, { passive: true });
        canvas.addEventListener('mouseup', this.handlePointerUp);
        canvas.addEventListener('touchend', this.handlePointerUp);
    }

    detach(canvas) {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('visibilitychange', this.handleVisibilityChange);
        canvas.removeEventListener('mousedown', this.handlePointerDown);
        canvas.removeEventListener('touchstart', this.handlePointerDown);
        canvas.removeEventListener('mouseup', this.handlePointerUp);
        canvas.removeEventListener('touchend', this.handlePointerUp);
    }

    handleKeyDown(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            this.jumpRequested = true;
        }
    }

    handlePointerDown(event) {
        event.preventDefault();
        this.isPointerDown = true;
        this.jumpRequested = true;
    }

    handlePointerUp() {
        this.isPointerDown = false;
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.jumpRequested = false;
            this.isPointerDown = false;
        }
    }

    consumeJump() {
        const requested = this.jumpRequested;
        this.jumpRequested = false;
        return requested;
    }
}
