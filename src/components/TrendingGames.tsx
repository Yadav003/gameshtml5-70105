import { GameCard } from "./GameCard";
import { getTrendingGames } from "@/lib/gameConfig";

export const TrendingGames = () => {
  const trendingGames = getTrendingGames();

  return (
    <section id="trending" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          TOP TRENDING GAMES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingGames.map((game) => (
            <GameCard 
              key={game.id} 
              title={game.title} 
              image={game.image}
              gameUrl={game.path ? `/play/${game.id}` : undefined}
              navigationState={{ from: 'home' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
