import { Navigation } from "@/components/Navigation";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TrendingGames } from "@/components/TrendingGames";
import ShowAds from "@/components/ShowAds";
import { CategoriesSection } from "@/components/CategoriesSection";
import { LeaderboardSection } from "@/components/LeaderboardSection";
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
        <div className="container mx-auto px-2 py-4">
          <ShowAds />
        </div>
        <div id="trending">
          <TrendingGames />
        </div>
        <LeaderboardSection />
        <div id="categories">
          <CategoriesSection />
        </div>
        {/* <div id="subscription">
          <SubscriptionPlans />
        </div> */}
      </main>
       <div className="container mx-auto px-2 py-4">
          <ShowAds />
        </div>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default Index;
