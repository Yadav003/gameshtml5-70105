// Central configuration for all games
// Add new games here as you add them to your public/games folder

export interface GameInfo {
  id: string;
  title: string;
  path: string;
  image: string;
  category?: string | string[]; // Support single or multiple categories
  description?: string;
}
// production url below

const BASE_PATH ="https://www.ovalplay.com/";



// Get the base path from Vite config
// const BASE_PATH = import.meta.env.BASE_URL || '/';

// Import game images
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";
import gameCricket from "@/assets/game-cricket.jpg";
import gameBaseball from "@/assets/game-cube-ninja.jpg";
import heroWatercraft from "@/assets/hero-racing.jpg";
import heroFps from "@/assets/hero-fps.jpg";
import gamerocket from "@/assets/rocketr.jpg"
import gamebike from "@/assets/biker.jpg"
import gameFruitNinja from "@/assets/fruitn.jpg"
import gameStackTower from "@/assets/tower.jpg"
import gameClumcy from "@/assets/flappy.jpg"
import gameDuckHunt from "@/assets/duck.jpg"
import gameSpaceWar from "@/assets/spacewar.jpg"
import gameSpace from "@/assets/spaceinvaders.jpg"
import gameBowling from "@/assets/bowl.jpg";
import gamePacman from "@/assets/pacman.jpg"
import gameSnake from "@/assets/snake.jpg"
import gameKnifeAttack from "@/assets/knife.jpg"
import gameCar from "@/assets/carracing.jpg"
import gameTic from "@/assets/tictac.jpg"
import gameBubbleShooter from "@/assets/bubble.jpg"
import gameJumpingPanda from "@/assets/jumpp.jpg"
import gameHextris from "@/assets/hextris.jpg"
import gameBlockFusion from "@/assets/block.jpg"
import gamebreak from "@/assets/lock.jpg"
import gameTetris from "@/assets/titrisl.jpg"
import gameLastColony from "@/assets/lastcolony.jpg"
import gameship from "@/assets/ship.jpg"
import gameTetris2 from "@/assets/tetris.jpg"
import gameRadiusRaid from "@/assets/radius_raid.jpg"
import placeholder1 from "@/assets/1.jpg"
import placeholder2 from "@/assets/2.jpg"
import game100meter from "@/assets/100meter.jpg"
import gameAlienMemory from "@/assets/alienm.jpg"
import gameAleorgold from "@/assets/gold.jpg"
import gameanimalcrush from "@/assets/animalc.jpg"
import gameanimalpuzzle from "@/assets/animalpuzzle.jpg"
import gameBarrier from "@/assets/barrier.jpg"
import gamebiliards from "@/assets/biiliards.jpg"
import gamefrog from "@/assets/frog.jpg"
import basketball from "@/assets/basketball.jpg"
import gamestickman from "@/assets/stickman.jpg"
import gamefoosball from "@/assets/foosball.jpg"
import gameBaseball1 from "@/assets/baseball.jpg"
import gameblocksupermatch from "@/assets/blocksuper.jpg"
import gamebirdify from "@/assets/birdify.jpg"


export const GAMES: Record<string, GameInfo> = {
  // Puzzle Games
  "2048": {
    id: "2048",
    title: "Block Fusion",
    path: `${BASE_PATH}games/2048-master/index.html`,
    image: gameBlockFusion,
    category: "Puzzle",
    description: "Slide numbered tiles to combine them and create a tile with 2048",
  },
  "hextris": {
    id: "hextris",
    title: "Hextris",
    path: `${BASE_PATH}games/hextris-gh-pages/index.html`,
    image: gameHextris,
    category: "Puzzle",
    description: "Fast paced puzzle game inspired by Tetris",
  },
  "tetris": {
    id: "tetris",
    title: "Tetris Lite",
    path: `${BASE_PATH}games/tetris-master/index.html`,
    image: gameTetris,
    category: "Puzzle",
    description: "Classic Tetris block-stacking puzzle game",
  },
  "canvas-tetris": {
    id: "canvas-tetris",
    title: "Tetris",
    path: `${BASE_PATH}games/canvas-tetris-master/index.html`,
    image: gameTetris2,
    category: "Puzzle",
    description: "Another version of the classic Tetris game",
  },
  "breaklock": {
    id: "breaklock",
    title: "Breaklock",
    path: `${BASE_PATH}games/breaklock-master/index.html`,
    image: gamebreak,
    category: "Puzzle",
    description: "Puzzle game where you break locks",
  },
  "tic-tac-toe": {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    path: `${BASE_PATH}games/tic-tac-toe/dist/index.html`,
    image: gameTic,
    category: ["Puzzle", "Strategy","Casual"],
    description: "Classic Tic Tac Toe game",
  },
  // Racing Games
  "hexgl": {
    id: "hexgl",
    title: "Rocket Racing",
    path: `${BASE_PATH}games/HexGL-master/index.html`,
    image: gamerocket,
    category: ["Racing", "Arcade"],
    description: "Futuristic racing game with high-speed tracks",
  },
  "bike": {
    id: "bike",
    title: "Bike Racing",
    path: `${BASE_PATH}games/bike/index.html`,
    image: gamebike,
    category: "Racing",
    description: "Fast-paced bike racing game",
  },

  // Arcade/Action Games
  "clumsy-bird": {
    id: "clumsy-bird",
    title: "Flappy Bird",
    path: `${BASE_PATH}games/clumsy-bird-master/index.html`,
    image: gameClumcy,
    category: "Casual",
    description: "Flappy Bird clone - navigate through pipes",
  },
  "duck-hunt": {
    id: "duck-hunt",
    title: "Duck Hunt",
    path: `${BASE_PATH}games/DuckHunt-JS-master/dist/index.html`,
    image: gameDuckHunt,
    category: "Arcade",
    description: "Classic duck hunting game with a light gun",
  },
  "alien-invasion": {
    id: "alien-invasion",
    title: "Space War",
    path: `${BASE_PATH}games/AlienInvasion-master/index.html`,
    image: gameSpaceWar,
    category: ["Arcade", "Shooter"],
    description: "Defend Earth from alien invaders",
  },
  "space-invaders": {
    id: "space-invaders",
    title: "Space Invaders",
    path: `${BASE_PATH}games/SpaceInvaders-master/index.html`,
    image: gameSpace,
    category: ["Arcade", "Shooter"],
    description: "Classic Space Invaders arcade game",
  },
  "pacman": {
    id: "pacman",
    title: "Pac-Man",
    path: `${BASE_PATH}games/pacman-canvas-master/index.htm`,
    image: gamePacman,
    category: "Arcade",
    description: "Classic Pac-Man maze chase game",
  },
  "snake": {
    id: "snake",
    title: "Snake",
    path: `${BASE_PATH}games/snake/index.html`,
    image: gameSnake,
    category: "Arcade",
    description: "Classic snake game - eat and grow",
  },
  "knife-attacks": {
    id: "knife-attacks",
    title: "Knife Attacks",
    path: `${BASE_PATH}games/Knife Attacks/index.html`,
    image: gameKnifeAttack,
    category: "Arcade",
    description: "Knife throwing action game",
  },
  "radius-raid": { 
    id: "radius-raid",
    title: "Radius Raid",
    path: `${BASE_PATH}games/radius-raid-js13k-master/index.html`,
    image: gameRadiusRaid,
    category: ["Arcade", "Shooter"],
    description: "Space shooter in a circular arena",
  },
  "tower-game": {
    id: "tower-game",
    title: "Build Tower",
    path: `${BASE_PATH}games/tower_game-master/index.html`,
    image: gameStackTower,
    category: ["Casual", "Arcade"],
    description: "Stack blocks to build the tallest tower",
  },


  // Sports Games
  "bowling": {
    id: "bowling",
    title: "Go Bowling",
    path: `${BASE_PATH}games/GoBowling2/index.html`,
    image: gameBowling,
    category: ["Sports", "Strategy"],
    description: "Realistic bowling game",
  },

  // Space/Shooter Games
  "hugeship": {
    id: "hugeship",
    title: "Destroyer Ship",
    path: `${BASE_PATH}games/hugeship/index.html`,
    image: gameship,
    category: "Shooter",
    description: "Space shooter with huge spaceships",
  },

  // Number-based mini games
  "game-1": {
    id: "game-1",
    title: "Fruit Ninja",
    path: `${BASE_PATH}games/1/index.html`,
    image: gameFruitNinja,
    category: "Casual",
    description: "Simple casual game",
  },
  "3m": {
    id: "3m",
    title: "Bubble Shooter",
    path: `${BASE_PATH}games/3m/index.html`,
    image: gameBubbleShooter,
    category: ["Casual", "Shooter"],
    description: "Quick casual game",
  },
  "game-4-2": {
    id: "game-4-2",
    title: "Jumping Panda",
    path: `${BASE_PATH}games/4_2/index.html`,
    image: gameJumpingPanda,
    category: "Casual",
    description: "Fun casual game",
  },
  "foosBall": {
    id: "foosBall",
    title: "Foos Ball",
    path: `${BASE_PATH}games/FoosBall/index.html`,
    image: gamefoosball,
    category: ["Sports", "Strategy"],
    description: "Table football game",
  },
  "frog-bubbles": {
    id: "frog-bubbles",
    title: "Frog Super Bubbles",
    path: `${BASE_PATH}games/Frog Super Bubbles/gamefiles/index.html`,
    image: gamefrog,
    category: "Casual",
    description: "Frog bubble shooting game",
  },
  "double-stickman": {
    id: "double-stickman",
    title: "Double Stickman",
    path: `${BASE_PATH}games/double-stickman/gamefiles/index.html`,
    image: gamestickman,
    category: "Casual",
    description: "Double stickman fighting game",
  },
  "super-match": {
    id: "super-match",
    title: "Super Match",
    path: `${BASE_PATH}games/block super match/gamefiles/index.html`,
    image: gameblocksupermatch,
    category: "Puzzle",
    description: "Block matching puzzle game",
  },
  "100m-race": {
    id: "100m-race",
    title: "100 Metres Race",
    path: `${BASE_PATH}games/100metresrace/gamefiles/game/index.html`,
    image: game100meter,
    category: "Sports",
    description: "Sprint racing game",
  },
  "aleor-gold": {
    id: "aleor-gold",
    title: "Aleor Gold",
    path: `${BASE_PATH}games/aleorgold/gamefiles/files/files/index.html`,
    image: gameAleorgold,
    category: "Casual",
    description: "Gold collection adventure",
  },
  "aliens-memory": {
    id: "aliens-memory",
    title: "Aliens Memory",
    path: `${BASE_PATH}games/AliensMemory/index.html`,
    image: gameAlienMemory,
    category: "Puzzle",
    description: "Memory card matching game with aliens",
  },
  "animal-crush": {
    id: "animal-crush",
    title: "Animal Crush",
    path: `${BASE_PATH}games/animalcrush/gamefiles/index.html`,
    image: gameanimalcrush,
    category: "Casual",
    description: "Match 3 animal puzzle game",
  },
  "animal-puzzle": {
    id: "animal-puzzle",
    title: "Animal Puzzle",
    path: `${BASE_PATH}games/animalpuzzle/gamefiles/files/files/index.html`,
    image: gameanimalpuzzle,
    category: "Puzzle",
    description: "Jigsaw puzzle with animal images",
  },
  
  "auto-offroad": {
    id: "auto-offroad",
    title: "Auto Offroad",
    path: `${BASE_PATH}games/Autoofroad/index.html`,
    image: gameCar,
    category: "Racing",
    description: "Offroad driving adventure",
  },
  "barrier": {
    id: "barrier",
    title: "Barrier",
    path: `${BASE_PATH}games/Barrier/index.html`,
    image: gameBarrier,
    category: ["Racing"],
    description: "Navigate through barriers",
  },
  "baseball-classic": {
    id: "baseball-classic",
    title: "Baseball Classic",
    path: `${BASE_PATH}games/BaseballClassic/index.html`,
    image: gameBaseball1,
    category: "Sports",
    description: "Classic baseball game",
  },
  "basketball-practice": {
    id: "basketball-practice",
    title: "Basketball Practice",
    path: `${BASE_PATH}games/BasketballPractice/index.html`,
    image: basketball,
    category: "Sports",
    description: "Basketball shooting practice",
  },
  "billards": {
    id: "billards",
    title: "Billards",
    path: `${BASE_PATH}games/billards/gamefiles/index.html`,
    image: gamebiliards, 
    category: ["Sports", "Strategy"],
    description: "Classic pool billiards game",
  },
  "birdify": {
    id: "birdify",
    title: "Birdify",
    path: `${BASE_PATH}games/Birdify/gamefiles/index.html`,
    image: gamebirdify,
    category: "Arcade",
    description: "Bird flying adventure",
  },

  // "blocker": {
  //   id: "blocker",
  //   title: "Blocker",
  //   path: `${BASE_PATH}games/blocker/index.html`,
  //   image: placeholder2,
  //   category: "Puzzle",
  //   description: "Block puzzle strategy game",
  // },
  // "boat-rush": {
  //   id: "boat-rush",
  //   title: "Boat Rush",
  //   path: `${BASE_PATH}games/BoatRush/index.html`,
  //   image: placeholder1,
  //   category: "Racing",
  //   description: "Fast-paced boat racing game",
  // },
  // "crazy-match3": {
  //   id: "crazy-match3",
  //   title: "Crazy Match 3",
  //   path: `${BASE_PATH}games/crazy-match3/gamefiles/index.html`,
  //   image: placeholder2,
  //   category: "Casual",
  //   description: "Match 3 puzzle game with crazy effects",
  // },
  // "birds-memory": {
  //   id: "birds-memory",
  //   title: "Birds Memory",
  //   path: `${BASE_PATH}games/BirdsMemory/index.html`,
  //   image: placeholder1,
  //   category: "Puzzle",
  //   description: "Memory card matching game with birds",
  // },
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
  return Object.values(GAMES).filter((game) => {
    if (!game.category) return false;
    
    // Handle both single category (string) and multiple categories (array)
    if (Array.isArray(game.category)) {
      return game.category.some(cat => cat.toLowerCase() === category.toLowerCase());
    }
    return game.category.toLowerCase() === category.toLowerCase();
  });
};

// Get all unique categories
export const getCategories = (): string[] => {
  const categories = new Set<string>();
  Object.values(GAMES).forEach((game) => {
    if (game.category) {
      // Handle both single category (string) and multiple categories (array)
      if (Array.isArray(game.category)) {
        game.category.forEach(cat => categories.add(cat));
      } else {
        categories.add(game.category);
      }
    }
  });
  return Array.from(categories).sort();
};

// Placeholder games for trending section (can be customized)
export const getTrendingGames = (): GameInfo[] => {
  return [
    GAMES["hexgl"],
    GAMES["bike"],
    GAMES["game-1"],
    GAMES["auto-offroad"],
  ];
};
