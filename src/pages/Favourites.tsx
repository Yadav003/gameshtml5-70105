import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import gameCricket from "@/assets/game-cricket.jpg";
import gameBaseball from "@/assets/game-baseball.jpg";
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import heroWatercraft from "@/assets/hero-watercraft.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";

const allGames = [
  { id: 1, name: "Super Baseball Pro", image: gameBaseball, rating: 4.8 },
  { id: 2, name: "Home Run Heroes", image: gameBaseball, rating: 4.6 },
  { id: 3, name: "Baseball Champions", image: gameBaseball, rating: 4.7 },
  { id: 4, name: "League Stars", image: gameBaseball, rating: 4.5 },
  { id: 5, name: "Cricket World Cup", image: gameCricket, rating: 4.9 },
  { id: 6, name: "Premier League Cricket", image: gameCricket, rating: 4.7 },
  { id: 7, name: "Cricket Master", image: gameCricket, rating: 4.6 },
  { id: 8, name: "Test Match Glory", image: gameCricket, rating: 4.8 },
  { id: 9, name: "Speed Rivals", image: heroRacing, rating: 4.9 },
  { id: 10, name: "Turbo Racing", image: heroRacing, rating: 4.7 },
  { id: 11, name: "Highway Legends", image: heroRacing, rating: 4.8 },
  { id: 12, name: "Drift Masters", image: heroRacing, rating: 4.6 },
  { id: 13, name: "Cube Ninja", image: gameCubeNinja, rating: 4.8 },
  { id: 14, name: "Air Battle Extreme", image: gameAirBattle, rating: 4.7 },
  { id: 15, name: "Watercraft Wars", image: heroWatercraft, rating: 4.6 },
  { id: 16, name: "Combat Zone", image: gameCubeNinja, rating: 4.9 },
];

const Favourites = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ovalplay-favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavorite = (gameId: number, gameName: string) => {
    const newFavorites = favorites.filter((id) => id !== gameId);
    setFavorites(newFavorites);
    localStorage.setItem("ovalplay-favorites", JSON.stringify(newFavorites));
    
    toast({
      title: "Removed from favourites",
      description: gameName,
    });
  };

  const favoriteGames = allGames.filter((game) => favorites.includes(game.id));

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Favourites</h1>
          
          {favoriteGames.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-4">
                No favourite games yet
              </p>
              <p className="text-muted-foreground mb-6">
                Add games to your favourites to see them here
              </p>
              <Button asChild>
                <a href="/games">Browse Games</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteGames.map((game) => (
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
                      onClick={() => removeFavorite(game.id, game.name)}
                    >
                      <Heart className="w-5 h-5 fill-primary text-primary" />
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
          )}
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Favourites;
