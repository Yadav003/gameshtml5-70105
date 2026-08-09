// Utility helpers for the Sky Escape game.
// Keep small reusable functions separate from game logic.
export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function rectanglesIntersect(rectA, rectB) {
    return (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
    );
}

export function formatTitleCase(text) {
    return text
        .toLowerCase()
        .replace(/(^|\s)\w/g, (match) => match.toUpperCase());
}

export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
