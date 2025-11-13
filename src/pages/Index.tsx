import { Navigation } from "@/components/Navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TrendingGames } from "@/components/TrendingGames";
import { CategoriesSection } from "@/components/CategoriesSection";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to section if hash is present in URL
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-0">
        <HeroCarousel />
        <div id="trending">
          <TrendingGames />
        </div>
        <div id="categories">
          <CategoriesSection />
        </div>
        <div id="subscription">
          <SubscriptionPlans />
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Index;
