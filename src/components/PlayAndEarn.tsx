import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import SpinWheel from "@/components/SpinWheel";
const PlayAndEarn = () => {
  return (
   <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Daily Spin & Win
          </h1>

          <p className="mt-4 text-gray-200 text-sm md:text-lg">
            Spin the wheel once every day and earn reward points.
            Collect points and redeem exciting coupons.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <SpinWheel />
        </div>

        <div className="mt-12 rounded-2xl bg-white/10 backdrop-blur-lg p-6 text-white">
          <h2 className="text-xl font-bold">
            Reward Rules
          </h2>

          <ul className="mt-4 space-y-2 text-sm md:text-base">
            <li>One spin per day</li>
            <li>Points are added to your wallet</li>
            <li>Redeem points for coupons</li>
            <li>Login daily to continue earning rewards</li>
          </ul>
        </div>
      </div>
    


        </div>
      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};
export default PlayAndEarn;