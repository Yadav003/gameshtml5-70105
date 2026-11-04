import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getGamesByCategory } from "@/lib/gameConfig";
import { getCategoryDisplay } from "@/lib/utils";

const categoryDescriptions: Record<string, string> = {
  "2 Player Game": "Play head-to-head games built around taking turns or competing together.",
  Arcade: "Jump into quick challenges that reward timing, focus, and fast reactions.",
  Casual: "Enjoy approachable games with simple rules and easy-to-learn gameplay.",
  Puzzle: "Solve number, pattern, and logic challenges one move at a time.",
  Racing: "Take on bike, car, and arcade racing challenges where every turn counts.",
  Shooter: "Test your aim and reactions in action-focused shooting games.",
  Sports: "Try browser games inspired by familiar sports and skill challenges.",
  Strategy: "Plan your moves carefully and outthink each new challenge.",
};

export const CategoriesSection = () => {
  const navigate = useNavigate();
  const categories = getCategories();

  const handleGameClick = (gameId: string, category: string) => {
    navigate(`/play/${gameId}`, { state: { category, from: 'home' } });
  };

  return (
    <section id="categories" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          EXPLORE BY CATEGORY
        </h2>
        <div className="space-y-12">
          {categories.map((category) => {
            const games = getGamesByCategory(category).slice(0, 4);
            
            return (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                  <h3 className="text-2xl font-bold">{category}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                      {categoryDescriptions[category] ?? `Browse ${category.toLowerCase()} games in the PlayArena library.`}
                    </p>
                  </div>
                  <Button variant="ghost" className="text-primary" asChild>
                    <Link to={`/games?category=${category}`}>
                      View All →
                    </Link>
                  </Button>
                </div>
                
                {/* Games Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {games.map((game) => (
                    <Card
                      key={game.id}
                      className="group relative overflow-hidden border-0 cursor-pointer"
                      onClick={() => handleGameClick(game.id, category)}
                    >
                      <div className="aspect-[3/4] relative">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent dark:from-background/95 dark:via-background/20" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold mb-1 text-sm md:text-base line-clamp-2 text-white">
                            {game.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-primary">★</span>
                            <span className="text-sm text-muted-foreground">
                              {getCategoryDisplay(game.category)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
