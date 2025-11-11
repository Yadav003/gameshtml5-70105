# How to Add New Games

This project uses a single dynamic `GamePlayer` component to handle all games. Here's how to add new games:

## Step 1: Add Game Files
Place your game folder in `/public/games/`. For example:
```
/public/games/
  ├── HexGL-master/
  ├── your-new-game/
  │   └── index.html
  └── another-game/
      └── index.html
```

## Step 2: Add Game Thumbnail (Optional)
Add a thumbnail image to `/src/assets/` if you have one:
```
/src/assets/
  └── game-your-game.jpg
```

## Step 3: Update Game Configuration
Open `/src/lib/gameConfig.ts` and add your game to the `GAMES` object:

```typescript
import gameYourImage from "@/assets/game-your-game.jpg";

export const GAMES: Record<string, GameInfo> = {
  hexgl: {
    id: "hexgl",
    title: "HexGL Racing",
    path: "/games/HexGL-master/index.html",
    image: heroRacing,
    category: "Racing",
    description: "Futuristic racing game",
  },
  
  // Add your new game here:
  "your-game-id": {
    id: "your-game-id",
    title: "Your Game Title",
    path: "/games/your-new-game/index.html",
    image: gameYourImage,
    category: "Action", // or Racing, Puzzle, etc.
    description: "Short description of your game",
  },
  
  // Add more games...
};
```

## Step 4: Add to Trending Section (Optional)
To feature your game in the trending section, update the `getTrendingGames()` function in `/src/lib/gameConfig.ts`:

```typescript
export const getTrendingGames = (): GameInfo[] => {
  return [
    GAMES.hexgl,
    GAMES["your-game-id"],
    // Add more trending games...
  ];
};
```

## That's It!
Your game will now be:
- Accessible via URL: `/play/your-game-id`
- Clickable from any GameCard component
- Automatically included in game listings

## URL Pattern
All games are played at: `/play/{game-id}`

Examples:
- `/play/hexgl` - HexGL Racing
- `/play/cube-ninja` - Cube Ninja
- `/play/traffic-racer` - Traffic Racer

## Benefits of This Approach
✅ **Single Page**: Only one `GamePlayer` component handles all 25+ games
✅ **Easy Maintenance**: Add games by just updating the config file
✅ **Consistent UI**: Same controls and layout for all games
✅ **SEO Friendly**: Clean URLs for each game
✅ **Scalable**: Can easily add 100+ games without creating new pages
