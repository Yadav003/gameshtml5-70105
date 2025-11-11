import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getAllGames, getGameById } from "@/lib/gameConfig";

const Favourites = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const allGames = getAllGames();

  useEffect(() => {
    const saved = localStorage.getItem("ovalplay-favorites");
    setFavorites(saved ? JSON.parse(saved) : []);
  }, []);

  const removeFavorite = (gameId: string, gameName: string) => {
    const newFavorites = favorites.filter((id) => id !== gameId);
    setFavorites(newFavorites);
    localStorage.setItem("ovalplay-favorites", JSON.stringify(newFavorites));
    
    toast({
      title: "Removed from favourites",
      description: gameName,
    });
  };

  const handlePlayGame = (gameId: string) => {
    navigate(`/play/${gameId}`);
  };

  const favoriteGames = favorites
    .map((id) => getGameById(id))
    .filter((game) => game !== null);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">
            My Favourites ({favoriteGames.length})
          </h1>
          
          {favoriteGames.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-4">
                No favourite games yet
              </p>
              <p className="text-muted-foreground mb-6">
                Add games to your favourites to see them here
              </p>
              <Button onClick={() => navigate("/games")}>
                Browse Games
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteGames.map((game) => (
                <Card key={game!.id} className="group overflow-hidden border-0 bg-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={game!.image}
                      alt={game!.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(game!.id, game!.title);
                      }}
                    >
                      <Heart className="w-5 h-5 fill-primary text-primary" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{game!.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {game!.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {game!.category}
                      </span>
                      <Button size="sm" onClick={() => handlePlayGame(game!.id)}>
                        Play Now
                      </Button>
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
