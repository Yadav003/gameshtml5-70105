import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gameBaseball from "@/assets/game-baseball.jpg";
import gameCricket from "@/assets/game-cricket.jpg";
import gameCubeNinja from "@/assets/game-cube-ninja.jpg";
import gameAirBattle from "@/assets/game-air-battle.jpg";
import heroRacing from "@/assets/hero-racing.jpg";
import heroWatercraft from "@/assets/hero-watercraft.jpg";

const categories = [
  {
    id: 1,
    title: "Baseball",
    image: gameBaseball,
    games: [
      { id: 1, name: "Super Baseball Pro", image: gameBaseball, rating: 4.8 },
      { id: 2, name: "Home Run Heroes", image: gameBaseball, rating: 4.6 },
      { id: 3, name: "Baseball Champions", image: gameBaseball, rating: 4.7 },
      { id: 4, name: "League Stars", image: gameBaseball, rating: 4.5 },
    ],
  },
  {
    id: 2,
    title: "Cricket",
    image: gameCricket,
    games: [
      { id: 5, name: "Cricket World Cup", image: gameCricket, rating: 4.9 },
      { id: 6, name: "Premier League Cricket", image: gameCricket, rating: 4.7 },
      { id: 7, name: "Cricket Master", image: gameCricket, rating: 4.6 },
      { id: 8, name: "Test Match Glory", image: gameCricket, rating: 4.8 },
    ],
  },
  {
    id: 3,
    title: "Racing",
    image: heroRacing,
    games: [
      { id: 9, name: "Speed Rivals", image: heroRacing, rating: 4.9 },
      { id: 10, name: "Turbo Racing", image: heroRacing, rating: 4.7 },
      { id: 11, name: "Highway Legends", image: heroRacing, rating: 4.8 },
      { id: 12, name: "Drift Masters", image: heroRacing, rating: 4.6 },
    ],
  },
  {
    id: 4,
    title: "Action",
    image: gameCubeNinja,
    games: [
      { id: 13, name: "Cube Ninja", image: gameCubeNinja, rating: 4.8 },
      { id: 14, name: "Air Battle Extreme", image: gameAirBattle, rating: 4.7 },
      { id: 15, name: "Watercraft Wars", image: heroWatercraft, rating: 4.6 },
      { id: 16, name: "Combat Zone", image: gameCubeNinja, rating: 4.9 },
    ],
  },
];

export const CategoriesSection = () => {
  return (
    <section id="categories" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          EXPLORE BY CATEGORY
        </h2>
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <Button variant="ghost" className="text-primary" asChild>
                  <Link to={`/games?category=${category.title}`}>
                    View All →
                  </Link>
                </Button>
              </div>
              
              {/* Games Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.games.map((game) => (
                  <Card
                    key={game.id}
                    className="group relative overflow-hidden border-0 cursor-pointer"
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="font-bold mb-1 text-sm md:text-base line-clamp-2">
                          {game.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span className="text-primary">★</span>
                          <span className="text-sm text-muted-foreground">
                            {game.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
