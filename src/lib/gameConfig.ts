// Central configuration for all games
// Add new games here as you add them to your public/games folder

export interface GameInfo {
  id: string;
  title: string;
  path: string;
  image: string;
  category?: string | string[]; // Support single or multiple categories
  description?: string;
  Toplay?: string;
}
// production url below

// const BASE_PATH ="https://playarena.co.in/";


// Get the base path from Vite config
const BASE_PATH = import.meta.env.BASE_URL || '/';

// Import game images

import gamerocket from "@/assets/rocketr.webp"
import gamebike from "@/assets/biker.webp"
import gameFruitNinja from "@/assets/fruitn.webp"
import gameClumcy from "@/assets/flappy.webp"
import gameSpaceWar from "@/assets/spacewar.webp"
import gameSpace from "@/assets/spaceinvaders.webp"
import gameBowling from "@/assets/bowl.webp";
import gamePacman from "@/assets/pacman.webp"
import gameSnake from "@/assets/snake.webp"
import gameKnifeAttack from "@/assets/knife.webp"
import gameCar from "@/assets/carracing.webp"
import gameBubbleShooter from "@/assets/bubble.webp"
import gameJumpingPanda from "@/assets/jumpp.webp"
import gameHextris from "@/assets/hextris.webp"
import gameBlockFusion from "@/assets/block.webp"
import gamebreak from "@/assets/lock.webp"
import gameTetris from "@/assets/titrisl.webp"
import gameTetris2 from "@/assets/tetris.webp"
import gameRadiusRaid from "@/assets/radius_raid.webp"
import game100meter from "@/assets/100meter.webp"
import gameAlienMemory from "@/assets/alienm.webp"
import gameAleorgold from "@/assets/gold.webp"
import gameanimalcrush from "@/assets/animalc.webp"
import gameanimalpuzzle from "@/assets/animalpuzzle.webp"
import gameBarrier from "@/assets/barrier.webp"
import gamebiliards from "@/assets/biiliards.webp"
import gamefrog from "@/assets/frog.webp"
import basketball from "@/assets/basketball.webp"
import gamestickman from "@/assets/stickman.webp"
import gamefoosball from "@/assets/foosball.webp"
import gameBaseball1 from "@/assets/baseball.webp"
import gameblocksupermatch from "@/assets/blocksuper.webp"
import gamebirdify from "@/assets/birdify.webp"
import gamewallbreaker from "@/assets/wallbreaker.webp"
import gameboatrush from "@/assets/boat.webp"
import ticTacToe from "@/assets/tic_tac.webp"
import gameSkyEscape from "@/assets/skyescape.webp"


export const GAMES: Record<string, GameInfo> = {
  // Puzzle Games
  "2048": {
    id: "2048",
    title: "Block Fusion",
    path: `${BASE_PATH}games/2048-master/index.html`,
    image: gameBlockFusion,
    category: "Puzzle",
    Toplay:"Login-Required",
    description: "Block Fusion is a relaxing yet challenging puzzle experience where players slide colorful tiles across the grid to merge matching numbers and reach the highest score possible. This free online puzzle game rewards careful planning, quick thinking, and smart positioning. Its simple controls make it easy to pick up, while the increasing difficulty keeps every round exciting for both casual players and strategy fans looking for a satisfying brain workout.",
  },
  "hextris": {
    id: "hextris",
    title: "Hextris",
    path: `${BASE_PATH}games/hextris-gh-pages/index.html`,
    image: gameHextris,
    category: "Puzzle",
    description: "Hextris transforms the classic block-stacking idea into a fast, colorful arcade challenge played on a hexagonal board. Rotate the pieces, stack them carefully, and avoid letting the stack reach the center as the pace steadily increases. With smooth controls, vibrant visuals, and endless replay value, Hextris is a great pick for players who enjoy quick reflexes, pattern recognition, and exciting puzzle action.",
  },
  "tetris": {
    id: "tetris",
    title: "Tetris Lite",
    path: `${BASE_PATH}games/tetris-master/index.html`,
    image: gameTetris,
    category: "Puzzle",
    description: "Tetris Lite brings the timeless block-stacking challenge to your browser with clean graphics, responsive controls, and satisfying gameplay. Players must rotate and place falling pieces strategically to clear lines, earn points, and survive longer with each round. This classic puzzle game is perfect for anyone who loves skill-based play, fast decision making, and rewarding progress as the speed ramps up.",
  },
  "canvas-tetris": {
    id: "canvas-tetris",
    title: "Tetris",
    path: `${BASE_PATH}games/canvas-tetris-master/index.html`,
    image: gameTetris2,
    category: "Puzzle",
    Toplay:"Login-Required",
    description: "This version of Tetris offers a polished arcade-style experience with smooth animation, familiar controls, and endless replay potential. Players build rows, clear lines, and manage falling blocks under pressure as the game gradually becomes faster and more demanding. It is a great choice for fans of classic puzzle gaming who want a modern, accessible, and highly addictive challenge online.",
  },
  "breaklock": {
    id: "breaklock",
    title: "Breaklock",
    path: `${BASE_PATH}games/breaklock-master/index.html`,
    image: gamebreak,
    category: "Puzzle",
    Toplay:"Login-Required",
    description: "Breaklock is a clever logic puzzle that invites players to discover the correct combination by testing patterns, observing clues, and solving the lock step by step. Every round is a fresh challenge that rewards patience, memory, and sharp reasoning. With simple mechanics and a satisfying sense of discovery, Breaklock is ideal for players who enjoy brain games with a touch of mystery and strategy.",
  },
  // "tic-tac-toe": {
  //   id: "tic-tac-toe",
  //   title: "Tic Tac Toe",
  //   path: `${BASE_PATH}games/tic-tac-toe/dist/index.html`,
  //   image: gameTic,
  //   category: ["Casual"],
  //   description: "Classic Tic Tac Toe game",
  // },
  // Racing Games
  "hexgl": {
    id: "hexgl",
    title: "Rocket Racing",
    path: `${BASE_PATH}games/HexGL-master/index.html`,
    image: gamerocket,
    category: ["Racing", "Arcade"],
    description: "Rocket Racing delivers a futuristic speed experience with high octane tracks, sharp turns, and fast-paced competition. Players can test their reflexes and driving skills while racing through visually striking environments filled with danger and momentum. This exciting online racing game is perfect for players who enjoy arcade action, adrenaline, and the thrill of pushing a vehicle to its limits.",
  },
  "bike": {
    id: "bike",
    title: "Bike Racing",
    path: `${BASE_PATH}games/bike/index.html`,
    image: gamebike,
    category: "Racing",
    description: "Bike Racing is an energetic arcade racing game that puts players on fast tracks where timing, balance, and control matter. Whether you are weaving through obstacles or chasing a high score, each race feels exciting and rewarding. The game offers a simple but addictive experience that is easy to start and hard to put down, making it a fun choice for racing fans of all ages.",
  },

  // Arcade/Action Games
  "clumsy-bird": {
    id: "clumsy-bird",
    title: "Flappy Bird",
    path: `${BASE_PATH}games/clumsy-bird-master/index.html`,
    image: gameClumcy,
    category: "Casual",
    Toplay:"Login-Required",
    description: "Flappy Bird is a classic arcade challenge where players guide a tiny bird through a never-ending series of pipes with precise taps and perfect timing. One mistimed move can end the run, which makes every attempt exciting and skill-based. This addictive online game remains popular because of its simple controls, fast pace, and the satisfying feeling of improving with each round.",
  },
  // "duck-hunt": {
  //   id: "duck-hunt",
  //   title: "Duck Hunt",
  //   path: `${BASE_PATH}games/DuckHunt-JS-master/dist/index.html`,
  //   image: gameDuckHunt,
  //   category: "Arcade",
  //   description: "Classic duck hunting game with a light gun",
  // },
  "alien-invasion": {
    id: "alien-invasion",
    title: "Space War",
    path: `${BASE_PATH}games/AlienInvasion-master/index.html`,
    image: gameSpaceWar,
    category: ["Arcade", "Shooter"],
    Toplay:"Login-Required",
    description: "Space War throws players into a thrilling battle against waves of alien invaders that descend across the screen. With quick reactions, accurate shooting, and smart movement, you must protect Earth while surviving increasingly difficult attacks. This action-packed shooter combines classic arcade energy with modern browser accessibility, delivering a fun and exciting experience for fans of space combat and high-score challenges.",
  },
  "space-invaders": {
    id: "space-invaders",
    title: "Space Invaders",
    path: `${BASE_PATH}games/SpaceInvaders-master/index.html`,
    image: gameSpace,
    category: ["Arcade", "Shooter"],
    description: "Space Invaders is one of the most iconic arcade shooters ever created, and this browser version keeps the excitement alive with fast enemy waves, defensive tactics, and satisfying laser blasts. Players must carefully manage their movement while tracking advancing alien formations and surviving each level. It is a timeless game that offers classic shoot-em-up fun, strong replay value, and a nostalgic experience for players of all ages.",
  },
  "pacman": {
    id: "pacman",
    title: "Pac-Man",
    path: `${BASE_PATH}games/pacman-canvas-master/index.htm`,
    image: gamePacman,
    category: "Arcade",
    Toplay:"Login-Required",
    description: "Pac-Man is a legendary arcade maze game where players guide the famous yellow character through tricky labyrinths, collect dots, and avoid ghosts at every turn. Success depends on timing, awareness, and smart route planning as the difficulty rises. This classic online game remains a favorite because it blends simple controls with exciting chase mechanics, making it ideal for players who enjoy timeless arcade action and strategy.",
  },
  "snake": {
    id: "snake",
    title: "Snake",
    path: `${BASE_PATH}games/snake/index.html`,
    image: gameSnake,
    category: "Arcade",
    description: "Snake is a timeless arcade favorite where players grow a longer trail by collecting food while avoiding collisions with walls and their own body. The game is easy to understand but demanding to master, which makes every round both relaxing and challenging. Its simple design, fast pacing, and endless replayability make it a great pick for quick gaming sessions and competitive high-score runs.",
  },
  "knife-attacks": {
    id: "knife-attacks",
    title: "Knife Attacks",
    path: `${BASE_PATH}games/Knife Attacks/index.html`,
    image: gameKnifeAttack,
    category: "Arcade",
    Toplay:"Login-Required",
    description: "Knife Attacks offers a thrilling action experience where timing, precision, and focus are essential. Players launch knives at targets with careful aim, trying to hit moving marks and build momentum as the challenge grows. The game combines straightforward controls with satisfying impact, giving it a fun mix of reflex-based action and competitive play that keeps players coming back for another round.",
  },
  "radius-raid": { 
    id: "radius-raid",
    title: "Radius Raid",
    path: `${BASE_PATH}games/radius-raid-js13k-master/index.html`,
    image: gameRadiusRaid,
    category: ["Arcade", "Shooter"],
    description: "Radius Raid is a fast-moving space shooter set inside a circular arena where survival depends on constant movement and sharp aiming. Players dodge incoming attacks, destroy enemies, and push their score higher as the action intensifies. With its compact design, energetic gameplay, and arcade-style challenge, this game is perfect for players who enjoy quick reflex battles and exciting sci-fi combat.",
  },
  // "tower-game": {
  //   id: "tower-game",
  //   title: "Build Tower",
  //   path: `${BASE_PATH}games/tower_game-master/index.html`,
  //   image: gameStackTower,
  //   category: ["Casual", "Arcade"],
  //   description: "Stack blocks to build the tallest tower",
  // },


  // Sports Games
  "bowling": {
    id: "bowling",
    title: "The King Pin",
    path: `${BASE_PATH}games/GoBowling2/index.html`,
    image: gameBowling,
    category: ["Sports", "Strategy"],
    description: "The King Pin delivers a realistic sports experience where players line up their shot, control the throw, and aim for perfect strikes. The game combines simple mechanics with satisfying physics, making each frame feel both intuitive and competitive. It is an excellent choice for sports fans who want a fun, accessible bowling experience online without needing a full arcade or a real lane.",
  },

  // // Space/Shooter Games
  // "hugeship": {
  //   id: "hugeship",
  //   title: "Destroyer Ship",
  //   path: `${BASE_PATH}games/hugeship/index.html`,
  //   image: gameship,
  //   category: "Shooter",
  //   description: "Space shooter with huge spaceships",
  // },

  // Number-based mini games
  "game-1": {
    id: "game-1",
    title: "Fruit Ninja",
    path: `${BASE_PATH}games/1/index.html`,
    image: gameFruitNinja,
    category: "Casual",
    description: "Fruit Ninja is a satisfying action game where players slice through flying fruit with quick swipes while avoiding bombs and other hazards. The gameplay is simple enough for anyone to enjoy, but it becomes more challenging as the action speeds up and the screen fills with targets. Its fast pace, clean design, and addictive combo system make it a perfect casual game for short and exciting play sessions.",
  },
  "3m": {
    id: "3m",
    title: "Bubble Shooter",
    path: `${BASE_PATH}games/3m/index.html`,
    image: gameBubbleShooter,
    Toplay:"Login-Required",
    category: ["Casual", "Shooter"],
    description: "Bubble Shooter is a colorful arcade puzzle game where players aim and fire bubbles to create matches and clear the screen. The challenge grows as the board fills and the pace increases, encouraging careful planning and sharp aim. With bright visuals, relaxing music, and a satisfying chain reaction system, this game is a great mix of strategy, precision, and lighthearted fun.",
  },
  "game-4-2": {
    id: "game-4-2",
    title: "Jumping Panda",
    path: `${BASE_PATH}games/4_2/index.html`,
    image: gameJumpingPanda,
    category: "Casual",
    Toplay:"Login-Required",
    description: "Jumping Panda is a cheerful platform-style game where players control a nimble panda through a series of jumps, obstacles, and moving platforms. Timing is everything, and each leap needs careful precision to avoid falling or missing the next step. The colorful design, lighthearted style, and steady increase in difficulty make it an enjoyable game for players who like quick reflex challenges and lively action.",
  },
  "foosBall": {
    id: "foosBall",
    title: "Table Football",
    path: `${BASE_PATH}games/FoosBall/index.html`,
    image: gamefoosball,
    category: ["Sports", "Strategy"],
    description: "Table Football brings the excitement of a real football match into a compact arcade format where timing, positioning, and strategy all matter. Players control the rods, defend the goal, and try to outsmart their opponents with quick passes and sharp shots. This entertaining sports game is perfect for fans of football who want a simple, competitive, and highly replayable experience online.",
  },
  "frog-bubbles": {
    id: "frog-bubbles",
    title: "Frog Super Bubbles",
    path: `${BASE_PATH}games/Frog Super Bubbles/gamefiles/index.html`,
    image: gamefrog,
    category: "Casual",
    description: "Frog Super Bubbles is a bright and playful arcade game that combines bubble shooting with fast-moving targets and cheerful visuals. Players must aim carefully, clear the field, and make smart shots to progress through challenging levels. Its easy-to-learn controls, colorful style, and rewarding gameplay make it an entertaining option for casual players who enjoy light strategy and quick rounds.",
  },
  "double-stickman": {
    id: "double-stickman",
    title: "Double Stickman",
    path: `${BASE_PATH}games/double-stickman/gamefiles/index.html`,
    image: gamestickman,
    category: ["Casual","Arcade"],
    description: "Double Stickman delivers fast action and combat energy in a simple two-character fighting style that is easy to pick up and hard to master. Players battle through intense encounters by timing attacks, dodging incoming hits, and using strategy to survive. The game stands out for its bold visuals, responsive controls, and exciting challenge, making it a fun choice for action fans and competitive arcade players.",
  },
  "super-match": {
    id: "super-match",
    title: "Super Match",
    path: `${BASE_PATH}games/block super match/gamefiles/index.html`,
    image: gameblocksupermatch,
    category: "Puzzle",
    Toplay:"Login-Required",
    description: "Super Match is a colorful match-three puzzle game that invites players to connect identical blocks, clear the board, and build higher scores through careful planning. Each level offers a fresh arrangement of pieces, encouraging players to think ahead while enjoying satisfying combinations and chain reactions. With its bright visual style and accessible rules, this game is perfect for anyone who enjoys relaxing puzzle play with a touch of strategy.",
  },
  "100m-race": {
    id: "100m-race",
    title: "100 Metres Race",
    path: `${BASE_PATH}games/100metresrace/gamefiles/game/index.html`,
    image: game100meter,
    category: "Sports",
    description: "100 Metres Race brings the excitement of a real sprint to your browser with quick reactions, sharp timing, and a strong focus on speed. Players race against the clock and compete for the best time while learning how to accelerate and maintain momentum. This energetic sports game is ideal for anyone who loves short, intense challenges and wants a fast, fun way to experience the thrill of track running.",
  },
  "aleor-gold": {
    id: "aleor-gold",
    title: "Ale or Gold",
    path: `${BASE_PATH}games/aleorgold/gamefiles/files/files/index.html`,
    image: gameAleorgold,
    category: "Casual",
    description: "Ale or Gold is a lighthearted adventure game that blends exploration, collection, and simple challenge mechanics into an enjoyable experience. Players travel through colorful environments, gather valuable items, and overcome obstacles while working toward a satisfying goal. Its playful style and straightforward design make it a fun choice for casual players who want something accessible, charming, and easy to enjoy in short sessions.",
  },
  "aliens-memory": {
    id: "aliens-memory",
    title: "Aliens Memory",
    path: `${BASE_PATH}games/AliensMemory/index.html`,
    image: gameAlienMemory,
    category: "Puzzle",
    description: "Aliens Memory is a fun and colorful matching game that challenges players to remember hidden card positions and find pairs before the timer runs out. The playful alien theme adds personality to the classic memory mechanic, while the increasing difficulty keeps the experience engaging. It is a great option for players who enjoy brain training, observation skills, and light puzzle games with simple rules and plenty of replay value.",
  },
  "animal-crush": {
    id: "animal-crush",
    title: "Animal Crush",
    path: `${BASE_PATH}games/animalcrush/gamefiles/index.html`,
    image: gameanimalcrush,
    category: "Casual",
    Toplay:"Login-Required",
    description: "Animal Crush is a cheerful match-three game filled with adorable creatures, colorful tiles, and satisfying combinations. Players swap and merge matching animals to clear the board and complete each level with strategy and speed. The cute theme, easy controls, and rewarding progression make it an appealing choice for casual gamers who want a bright, relaxing puzzle experience that still feels exciting.",
  },
  "animal-puzzle": {
    id: "animal-puzzle",
    title: "Animal Puzzle",
    path: `${BASE_PATH}games/animalpuzzle/gamefiles/files/files/index.html`,
    image: gameanimalpuzzle,
    category: "Puzzle",
    description: "Animal Puzzle is a relaxing jigsaw-style game where players piece together charming animal images one section at a time. The experience is easy to start, but it rewards attention to detail and patience as the picture becomes clearer. With a friendly theme, satisfying progression, and plenty of visual appeal, this game is a wonderful option for players who enjoy calm, creative puzzle challenges online.",
  },
  
  "auto-offroad": {
    id: "auto-offroad",
    title: "Auto Offroad",
    path: `${BASE_PATH}games/Autoofroad/index.html`,
    image: gameCar,
    category: "Racing",
    description: "Auto Offroad delivers a rugged driving adventure where players navigate rough terrain, dodge obstacles, and push their vehicle through challenging paths. The game combines simple controls with exciting motion, giving each run a sense of speed and progression. It is a great pick for racing fans who enjoy adventurous environments, skill-based driving, and the thrill of mastering tough offroad courses.",
  },
  "barrier": {
    id: "barrier",
    title: "Dotch Barrier",
    path: `${BASE_PATH}games/Barrier/index.html`,
    image: gameBarrier,
    category: ["Racing"],
    Toplay:"Login-Required",
    description: "Dotch Barrier is an obstacle-focused challenge where players steer carefully through a field of barriers and hazards while keeping momentum and balance. Every move requires concentration because one mistake can quickly end the run. The game offers a compact but exciting experience that is easy to learn, visually clear, and fun for players looking for a fast, reflex-based challenge without complicated controls.",
  },
  "baseball-classic": {
    id: "baseball-classic",
    title: "Baseball Classic",
    path: `${BASE_PATH}games/BaseballClassic/index.html`,
    image: gameBaseball1,
    category: "Sports",
    description: "Baseball Classic brings the spirit of America’s favorite sport to your browser with batting, timing, and simple controls that are easy to understand. Players can enjoy the excitement of stepping up to the plate and trying to hit the perfect shot while building their score. It is a fun and accessible sports game for fans of baseball who want a quick, engaging experience with plenty of replay value.",
  },
  "basketball-practice": {
    id: "basketball-practice",
    title: "Basketball Practice",
    path: `${BASE_PATH}games/BasketballPractice/index.html`,
    image: basketball,
    category: "Sports",
    description: "Basketball Practice is a fun sports game that focuses on shooting accuracy, rhythm, and steady control. Players work on their aim and timing while trying to score from different positions and improve with each attempt. With its straightforward mechanics and rewarding progression, it is a great pick for basketball lovers and casual players who enjoy short, skill-based challenges.",
  },
  "billards": {
    id: "billards",
    title: "8 Ball Pool",
    path: `${BASE_PATH}games/billards/gamefiles/index.html`,
    image: gamebiliards, 
    Toplay:"Login-Required",
    category: ["Sports", "Strategy"],
    description: "8 Ball Pool is a classic billiards game that combines aiming, power control, and smart shot selection into one enjoyable experience. Players can line up each shot, judge angles, and outplay opponents with careful strategy. The game captures the feel of real pool while staying simple enough for browser play, making it an excellent choice for sports fans who enjoy precision, concentration, and friendly competition.",
  },
  "birdify": {
    id: "birdify",
    title: "Birdify",
    path: `${BASE_PATH}games/Birdify/gamefiles/index.html`,
    image: gamebirdify,
    category: "Arcade",
    description: "Birdify is a lively arcade adventure where players guide a bird through a colorful world full of movement, challenge, and excitement. The gameplay focuses on quick reactions, smooth flying, and staying in control as the pace increases. With its playful theme and accessible controls, Birdify offers a charming and entertaining experience for players who enjoy light action and cheerful game design.",
  },
 
  "blocker": {
    id: "blocker",
    title: "Wall Breaker",
    path: `${BASE_PATH}games/blocker/index.html`,
    image: gamewallbreaker,
    category: "Casual",
    description: "Wall Breaker is a satisfying block-busting puzzle game where players break through layers of obstacles with smart shots and careful planning. Each level introduces a new layout that encourages creative thinking and fast reactions. The game is easy to understand, visually engaging, and packed with just enough challenge to keep players coming back for another round of strategy and fun.",
  },

  "skygame": {
    id: "skygame",
    title: "Sky Escape",
    path: `${BASE_PATH}games/skygame/index.html`,
    image: gameSkyEscape,
    category: "Casual",
    description: "Sky Escape is an exhilarating arcade game where players navigate through breathtaking skies, avoiding obstacles and collecting power-ups. With its stunning visuals and smooth controls, it offers a thrilling experience for those who love aerial adventures and fast-paced gameplay.",
  },
  "boat-rush": {
    id: "boat-rush",
    title: "Boat Rush",
    path: `${BASE_PATH}games/BoatRush/index.html`,
    image: gameboatrush,
    category: "Racing",
    description: "Boat Rush is an exciting water racing game where players speed through challenging courses, dodging obstacles and competing for the best time. The game combines fast-paced action with skillful navigation, making it a fun choice for fans of racing and adventure on the high seas.",
  },
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
  //   title: "Remember Birds ",
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
