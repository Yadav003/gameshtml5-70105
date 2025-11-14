import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllGames, getCategories, getGamesByCategory } from "@/lib/gameConfig";

const Games = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("ovalplay-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const allGames = getAllGames();
  const categories = ["All", ...getCategories()];

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const toggleFavorite = (gameId: string, gameName: string) => {
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter((id) => id !== gameId)
      : [...favorites, gameId];
    
    setFavorites(newFavorites);
    localStorage.setItem("ovalplay-favorites", JSON.stringify(newFavorites));
    
    toast({
      title: favorites.includes(gameId) ? "Removed from favourites" : "Added to favourites",
      description: gameName,
    });
  };

  const handlePlayGame = (gameId: string) => {
    navigate(`/play/${gameId}`, { 
      state: { 
        category: selectedCategory === "All" ? undefined : selectedCategory,
        from: 'games'
      } 
    });
  };

  // Group games by category
  const gamesByCategory = selectedCategory === "All"
    ? categories.slice(1).map((cat) => ({
        category: cat,
        games: getGamesByCategory(cat),
      }))
    : [
        {
          category: selectedCategory,
          games: getGamesByCategory(selectedCategory),
        },
      ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">All Games ({allGames.length})</h1>
          
          {/* Category Filter */}
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {gamesByCategory.map((categoryGroup) => (
            <section key={categoryGroup.category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {categoryGroup.category} ({categoryGroup.games.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryGroup.games.map((game) => (
                  <Card key={game.id} className="group overflow-hidden border-0 bg-card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game.id, game.title);
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(game.id)
                              ? "fill-primary text-primary"
                              : "text-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {game.category}
                        </span>
                        <Button size="sm" onClick={() => handlePlayGame(game.id)}>
                          Play Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Games;
