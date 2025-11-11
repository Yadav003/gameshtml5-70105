// Central configuration for all games
// Add new games here as you add them to your public/games folder

export interface GameInfo {
  id: string;
  title: string;
  path: string;
  image: string;
  category?: string;
  description?: string;
}

// Import game images
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import heroWatercraft from "@/assets/hero-watercraft.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";
import gameCricket from "@/assets/game-cricket.jpg";
import gameBaseball from "@/assets/game-baseball.jpg";
import heroFps from "@/assets/hero-fps.jpg";

export const GAMES: Record<string, GameInfo> = {
  // Puzzle Games
  "2048": {
    id: "2048",
    title: "2048",
    path: "/games/2048-master/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Slide numbered tiles to combine them and create a tile with 2048",
  },
  "hextris": {
    id: "hextris",
    title: "Hextris",
    path: "/games/hextris-gh-pages/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Fast paced HTML5 puzzle game inspired by Tetris",
  },
  "tetris": {
    id: "tetris",
    title: "Tetris",
    path: "/games/tetris-master/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Classic Tetris block-stacking puzzle game",
  },
  "canvas-tetris": {
    id: "canvas-tetris",
    title: "Canvas Tetris",
    path: "/games/canvas-tetris-master/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Another version of the classic Tetris game",
  },
  "breaklock": {
    id: "breaklock",
    title: "Breaklock",
    path: "/games/breaklock-master/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Puzzle game where you break locks",
  },
  "tic-tac-toe": {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    path: "/games/tic-tac-toe/dist/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Classic Tic Tac Toe game",
  },
  "candyjam": {
    id: "candyjam",
    title: "Candy Jam",
    path: "/games/candyjam-master/index.html",
    image: gameCubeNinja,
    category: "Puzzle",
    description: "Match colorful candies in this sweet puzzle game",
  },

  // Racing Games
  "hexgl": {
    id: "hexgl",
    title: "HexGL Racing",
    path: "/games/HexGL-master/index.html",
    image: heroRacing,
    category: "Racing",
    description: "Futuristic racing game with high-speed tracks",
  },
  "javascript-racer": {
    id: "javascript-racer",
    title: "JavaScript Racer",
    path: "/games/javascript-racer-master/index.html",
    image: heroRacing,
    category: "Racing",
    description: "Retro-style pseudo 3D racing game",
  },
  "bike": {
    id: "bike",
    title: "Bike Racing",
    path: "/games/bike/index.html",
    image: heroRacing,
    category: "Racing",
    description: "Fast-paced bike racing game",
  },

  // Arcade/Action Games
  "clumsy-bird": {
    id: "clumsy-bird",
    title: "Clumsy Bird",
    path: "/games/clumsy-bird-master/index.html",
    image: gameAirBattle,
    category: "Arcade",
    description: "Flappy Bird clone - navigate through pipes",
  },
  "duck-hunt": {
    id: "duck-hunt",
    title: "Duck Hunt",
    path: "/games/DuckHunt-JS-master/dist/index.html",
    image: gameAirBattle,
    category: "Arcade",
    description: "Classic duck hunting game with a light gun",
  },
  "alien-invasion": {
    id: "alien-invasion",
    title: "Alien Invasion",
    path: "/games/AlienInvasion-master/index.html",
    image: gameAirBattle,
    category: "Arcade",
    description: "Defend Earth from alien invaders",
  },
  "space-invaders": {
    id: "space-invaders",
    title: "Space Invaders",
    path: "/games/SpaceInvaders-master/index.html",
    image: gameAirBattle,
    category: "Arcade",
    description: "Classic Space Invaders arcade game",
  },
  "pacman": {
    id: "pacman",
    title: "Pac-Man",
    path: "/games/pacman-canvas-master/index.htm",
    image: gameCubeNinja,
    category: "Arcade",
    description: "Classic Pac-Man maze chase game",
  },
  "snake": {
    id: "snake",
    title: "Snake",
    path: "/games/snake/index.html",
    image: gameCubeNinja,
    category: "Arcade",
    description: "Classic snake game - eat and grow",
  },
  "knife-attacks": {
    id: "knife-attacks",
    title: "Knife Attacks",
    path: "/games/Knife Attacks/index.html",
    image: gameCubeNinja,
    category: "Arcade",
    description: "Knife throwing action game",
  },
  "radius-raid": {
    id: "radius-raid",
    title: "Radius Raid",
    path: "/games/radius-raid-js13k-master/index.html",
    image: gameAirBattle,
    category: "Arcade",
    description: "Space shooter in a circular arena",
  },
  "tower-game": {
    id: "tower-game",
    title: "Tower Game",
    path: "/games/tower_game-master/index.html",
    image: gameCubeNinja,
    category: "Arcade",
    description: "Stack blocks to build the tallest tower",
  },

  // Strategy Games
  "last-colony": {
    id: "last-colony",
    title: "Last Colony",
    path: "/games/last-colony-master/index.html",
    image: gameCubeNinja,
    category: "Strategy",
    description: "Real-time strategy game in space",
  },
  "ophog": {
    id: "ophog",
    title: "OpHog",
    path: "/games/OpHog-master/src/index.html",
    image: gameCubeNinja,
    category: "Strategy",
    description: "Strategic puzzle game",
  },

  // Sports Games
  "bowling": {
    id: "bowling",
    title: "Go Bowling",
    path: "/games/GoBowling2/index.html",
    image: gameBaseball,
    category: "Sports",
    description: "Realistic bowling game",
  },

  // Space/Shooter Games
  "hugeship": {
    id: "hugeship",
    title: "Huge Ship",
    path: "/games/hugeship/index.html",
    image: gameAirBattle,
    category: "Shooter",
    description: "Space shooter with huge spaceships",
  },

  // Number-based mini games
  "game-1": {
    id: "game-1",
    title: "Game 1",
    path: "/games/1/index.html",
    image: gameCubeNinja,
    category: "Casual",
    description: "Simple casual game",
  },
  "3m": {
    id: "3m",
    title: "3M Game",
    path: "/games/3m/index.html",
    image: gameCubeNinja,
    category: "Casual",
    description: "Quick casual game",
  },
  "game-4-2": {
    id: "game-4-2",
    title: "Game 4.2",
    path: "/games/4_2/index.html",
    image: gameCubeNinja,
    category: "Casual",
    description: "Fun casual game",
  },
};

// Helper function to get game by ID
export const getGameById = (gameId: string): GameInfo | null => {
  return GAMES[gameId] || null;
};

// Helper function to get all games
export const getAllGames = (): GameInfo[] => {
  return Object.values(GAMES);
};

// Helper function to get games by category
export const getGamesByCategory = (category: string): GameInfo[] => {
  return Object.values(GAMES).filter(
    (game) => game.category?.toLowerCase() === category.toLowerCase()
  );
};

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = new Set<string>();
  Object.values(GAMES).forEach((game) => {
    if (game.category) {
      categories.add(game.category);
    }
  });
  return Array.from(categories).sort();
};

// Placeholder games for trending section (can be customized)
export const getTrendingGames = (): GameInfo[] => {
  return [
    GAMES["hexgl"],
    GAMES["duck-hunt"],
    GAMES["2048"],
    GAMES["pacman"],
  ];
};
