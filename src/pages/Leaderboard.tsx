import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { leaderboardGames } from "@/lib/leaderboardData";

const Leaderboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold">Leaderboards</h1>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                Explore rankings for top games and see which players are leading the scoreboard.
              </p>
            </div>
            <Button asChild variant="hero" size="lg" className="w-full md:w-auto">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {leaderboardGames.map((game) => (
              <Card key={game.id} className="p-6 border-border">
                <div className="flex items-center gap-4 mb-5">
                  <div className="rounded-full bg-primary/10 text-primary p-3">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{game.title}</h2>
                    <p className="text-sm text-muted-foreground">{game.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
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
                  <span>{game.topPlayers.length} leaderboard spots</span>
                  <span className="text-primary">Full ranking available soon</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Leaderboard;
