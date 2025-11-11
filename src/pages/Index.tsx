import { Navigation } from "@/components/Navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TrendingGames } from "@/components/TrendingGames";
import { CategoriesSection } from "@/components/CategoriesSection";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-0">
        <HeroCarousel />
        <TrendingGames />
        <CategoriesSection />
        <SubscriptionPlans />
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Index;
