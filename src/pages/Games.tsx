import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gameCricket from "@/assets/game-cricket.jpg";
import gameBaseball from "@/assets/game-baseball.jpg";
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import heroWatercraft from "@/assets/hero-watercraft.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";

const gamesData = [
  {
    category: "Baseball",
    games: [
      { id: 1, name: "Super Baseball Pro", image: gameBaseball, rating: 4.8 },
      { id: 2, name: "Home Run Heroes", image: gameBaseball, rating: 4.6 },
      { id: 3, name: "Baseball Champions", image: gameBaseball, rating: 4.7 },
      { id: 4, name: "League Stars", image: gameBaseball, rating: 4.5 },
    ],
  },
  {
    category: "Cricket",
    games: [
      { id: 5, name: "Cricket World Cup", image: gameCricket, rating: 4.9 },
      { id: 6, name: "Premier League Cricket", image: gameCricket, rating: 4.7 },
      { id: 7, name: "Cricket Master", image: gameCricket, rating: 4.6 },
      { id: 8, name: "Test Match Glory", image: gameCricket, rating: 4.8 },
    ],
  },
  {
    category: "Racing",
    games: [
      { id: 9, name: "Speed Rivals", image: heroRacing, rating: 4.9 },
      { id: 10, name: "Turbo Racing", image: heroRacing, rating: 4.7 },
      { id: 11, name: "Highway Legends", image: heroRacing, rating: 4.8 },
      { id: 12, name: "Drift Masters", image: heroRacing, rating: 4.6 },
    ],
  },
  {
    category: "Action",
    games: [
      { id: 13, name: "Cube Ninja", image: gameCubeNinja, rating: 4.8 },
      { id: 14, name: "Air Battle Extreme", image: gameAirBattle, rating: 4.7 },
      { id: 15, name: "Watercraft Wars", image: heroWatercraft, rating: 4.6 },
      { id: 16, name: "Combat Zone", image: gameCubeNinja, rating: 4.9 },
    ],
  },
];

const Games = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("ovalplay-favorites");
    return saved ? JSON.parse(saved) : [];
  });

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

  const toggleFavorite = (gameId: number, gameName: string) => {
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

  const filteredGames = selectedCategory === "All" 
    ? gamesData 
    : gamesData.filter((cat) => cat.category === selectedCategory);

  const categories = ["All", ...gamesData.map((cat) => cat.category)];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">All Games</h1>
          
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
          
          {filteredGames.map((category) => (
            <section key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.games.map((game) => (
                  <Card key={game.id} className="group overflow-hidden border-0 bg-card">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                        onClick={() => toggleFavorite(game.id, game.name)}
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
                      <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          ⭐ {game.rating}
                        </span>
                        <Button size="sm">Play Now</Button>
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
