import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getGamesByCategory } from "@/lib/gameConfig";

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
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{category}</h3>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="font-bold mb-1 text-sm md:text-base line-clamp-2">
                            {game.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-primary">★</span>
                            <span className="text-sm text-muted-foreground">
                              {game.category}
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
