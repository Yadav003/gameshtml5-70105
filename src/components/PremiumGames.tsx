import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import PremiumGames from "@/components/PremiumGames";

const PremiumGamesPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <h1>Premium Games Coming soon....</h1>
        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default PremiumGamesPage;
