import { GameCard } from "./GameCard";
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import heroWatercraft from "@/assets/hero-watercraft.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";

const trendingGames = [
  { id: 1, title: "Cube Ninja", image: gameCubeNinja },
  { id: 2, title: "Traffic Racer", image: heroRacing },
  { id: 3, title: "Watercraft Rush", image: heroWatercraft },
  { id: 4, title: "WWII Air Battle", image: gameAirBattle },
];

export const TrendingGames = () => {
  return (
    <section id="trending" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          TOP TRENDING GAMES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game) => (
            <GameCard key={game.id} title={game.title} image={game.image} />
          ))}
        </div>
      </div>
    </section>
  );
};
