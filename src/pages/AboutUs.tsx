import { Navigation } from "@/components/Navigation";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Zap, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">About PlayVerse</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Instant games, real community, zero friction
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  PlayVerse started with a simple promise: great games should open fast and run anywhere. We built a browser-first platform so players can jump in without installs, heavy updates, or expensive hardware.
                </p>
                <p className="text-muted-foreground">
                  Today, our library blends quick-play favorites with deeper challenges, carefully tested for smooth performance. We keep shipping new titles and features so every visit feels fresh.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  Make great gaming available in seconds, on any device, with no barriers between you and play. We focus on speed, stability, and discovery so you can find the right game and start immediately.
                </p>
                <p className="text-muted-foreground">
                  We refine the platform relentlessly, from smarter recommendations to faster loading and reliable sessions.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Play anywhere, any time, on the device you already have. No downloads, no waiting, just play.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A place to share favorites, compare scores, and celebrate the wins together.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Shipping faster loads, smoother play, and new features that make games feel better.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-3" />
                <CardTitle>Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Clear policies, respectful ads, and reliable sessions you can count on.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Join Us</h2>
              <p className="text-muted-foreground mb-4">
                Whether you play for five minutes or five hours, PlayVerse makes it easy to start. Build your lineup, save your favorites, and come back to new releases each week.
              </p>
              <div className="grid grid-cols-3 gap-8 text-center mt-8">
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">100+</p>
                  <p className="text-sm text-muted-foreground">Instant-Play Games</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">Global</p>
                  <p className="text-sm text-muted-foreground">Player Community</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                  <p className="text-sm text-muted-foreground">Help When You Need It</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default AboutUs;
