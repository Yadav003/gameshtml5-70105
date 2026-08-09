import Game from './game.js';
import { loadImages, loadImageList } from './assetLoader.js';

const canvas = document.getElementById('game-canvas');
const uiOverlay = document.getElementById('ui-overlay');

// Define asset paths relative to project root
const ASSET_PATHS = {
	background: ['assets/background/sky.webp', 'assets/images/sample-day.webp'],
	player_idle: ['assets/player/player_idle.svg', 'assets/images/PLAYER_IDLE.png'],
	player_jump: ['assets/player/player_jump.svg', 'assets/images/PLAYER.JUMP.png'],
	player_fall: ['assets/player/player_fall.svg', 'assets/images/PLAYER.FALL.png'],
	player_hit: ['assets/player/player_hit.svg', 'assets/images/PLAYER.HIT.png'],
	player_shadow: ['assets/player/shadow.svg'],
	bird_sprite: ['assets/birds/bird_sprite.png', 'assets/images/birds.32x32.png'],
};

// Bird animation frames (brown and white), each with 5 frames.
const BIRD_FRAMES = {
	brown: [
		'assets/images/brown_bird1.png',
		'assets/images/brown_bird2.png',
		'assets/images/brown_bird3.png',
		'assets/images/brown_bird4.png',
		'assets/images/brown_bird5.png',
	],
	white: [
		'assets/images/white_bird1.png',
		'assets/images/white_bird2.png',
		'assets/images/white_bird3.png',
		'assets/images/white_bird4.png',
		'assets/images/white_bird5.png',
	],
};

(async () => {
	let assets = {};
	let birdFrames = { brown: null, white: null };
	try {
		assets = await loadImages(ASSET_PATHS);
		birdFrames = {
			brown: await loadImageList(BIRD_FRAMES.brown),
			white: await loadImageList(BIRD_FRAMES.white),
		};
	} catch (err) {
		console.error('Asset loading failed', err);
		// Still create game but without assets to avoid breaking runtime
	}

	const game = new Game(canvas, uiOverlay, null, assets, birdFrames);
	game.start();
})();
