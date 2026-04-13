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
            Your ultimate destination for online gaming entertainment
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2024, PlayVerse was born from a simple idea: make premium gaming accessible to everyone, everywhere. We believe that great games shouldn't be locked behind expensive hardware or complicated downloads.
                </p>
                <p className="text-muted-foreground">
                  Today, we serve thousands of gamers worldwide, offering instant access to hundreds of games across all genres. Our platform continues to grow, adding new games and features every month.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  To democratize gaming by providing instant access to a vast library of high-quality games through any web browser. We're committed to delivering seamless, enjoyable gaming experiences without the hassle of downloads, installations, or expensive gaming hardware.
                </p>
                <p className="text-muted-foreground">
                  We continuously innovate to bring you the best possible gaming experience, from cutting-edge technology to carefully curated game selections.
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
                  Making gaming accessible to everyone, regardless of device or location. No barriers, just play.
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
                  Building a vibrant community of gamers who share their passion and experiences.
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
                  Constantly pushing boundaries with new technology and features to enhance your gaming.
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
                  Prioritizing your privacy and security while delivering reliable, quality service.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Join Us</h2>
              <p className="text-muted-foreground mb-4">
                Whether you're a casual player or a hardcore gamer, PlayVerse has something for you. Join thousands of players who have already discovered the future of browser-based gaming.
              </p>
              <div className="grid grid-cols-3 gap-8 text-center mt-8">
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">500+</p>
                  <p className="text-sm text-muted-foreground">Games Available</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Players</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary mb-2">24/7</p>
                  <p className="text-sm text-muted-foreground">Support Available</p>
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
