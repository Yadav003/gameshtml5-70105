import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { leaderboardGames } from "@/lib/leaderboardData";

export const LeaderboardSection = () => {
  const featuredGames = leaderboardGames.slice(0, 2);

  return (
    <section id="leaderboard" className="py-16 px-4 bg-card/50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">GAME LEADERBOARD</h2>
            <p className="text-muted-foreground max-w-2xl mt-3">
              See the best players for our top games. Start with two featured leaderboards and explore more rankings on the full leaderboard page.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
            <Link to="/leaderboard">
              See all leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredGames.map((game) => (
            <Card key={game.id} className="p-6 border-border">
              <div className="flex items-center gap-4 mb-5">
                <div className="rounded-full bg-primary/10 text-primary p-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{game.title}</h3>
                  <p className="text-sm text-muted-foreground">{game.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {game.topPlayers.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between rounded-xl border border-border/70 bg-background/80 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground">#{player.rank}</p>
                      <p className="font-medium">{player.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{player.score}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{game.topPlayers.length} players ranked</span>
                <Link to="/leaderboard" className="text-primary hover:underline">
                  View more
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
