import { ArrowRight, Gift, Info, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { REDEMPTION_TIERS } from "@/data/rewards";
import { REDEEM_ACCESS_SESSION_KEY } from "@/types/reward.types";

interface RedeemSectionProps {
  availablePoints: number;
}

const RedeemSection = ({ availablePoints }: RedeemSectionProps) => {
  const navigate = useNavigate();

  const handleRedeemClick = () => {
    sessionStorage.setItem(REDEEM_ACCESS_SESSION_KEY, "true");
    navigate("/redeem", { state: { fromPlayAndEarn: true } });
  };

  return (
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl rounded-lg border border-primary/30 bg-card p-5 shadow-lg shadow-primary/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                <Gift className="h-4 w-4" />
                 Redeem Rewards
              </p>
              <h2 className="mt-4 text-2xl font-extrabold text-card-foreground md:text-4xl">
                Turn your daily spin points into gift vouchers.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                Collect points by spinning the wheel daily and unlock exciting rewards. Redeem your earned points for
                Amazon and Flipkart gift vouchers. More reward partners and currencies will be added in future updates.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-primary/40 bg-primary/10 p-4">
                  <p className="flex items-start gap-2 text-sm font-semibold text-primary">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    Minimum 100 points are required to unlock reward redemption.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/60 p-4">
                  <p className="flex items-start gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    Current Conversion Rate: 2 Points = ₹1 Reward Value
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  size="xl"
                  className="w-full font-extrabold sm:w-auto"
                  onClick={handleRedeemClick}
                >
                  Redeem Points
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground">Available Points: {availablePoints}</p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/80 p-4">
              <h3 className="text-lg font-bold text-card-foreground">Available Redemption Tiers</h3>
              <div className="mt-4 space-y-3">
                {REDEMPTION_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3"
                  >
                    <span className="font-bold text-foreground">₹{tier.amount} Coupon</span>
                    <span className="text-sm font-semibold text-primary">{tier.requiredPoints} Points</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RedeemSection;
