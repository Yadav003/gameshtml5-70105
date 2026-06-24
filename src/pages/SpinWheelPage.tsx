import { useCallback, useEffect, useMemo, useState } from "react";
import { Gift, Loader2, Star, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import LoginRequiredModal from "@/components/LoginRequiredModal";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Navigation } from "@/components/Navigation";
import RedeemSection from "@/components/RedeemSection";
import SpinWheel, { REWARD_TO_SLICE_INDEX, SPIN_REWARDS } from "@/components/SpinWheel";
import { useToast } from "@/hooks/use-toast";
import { ApiError } from "@/lib/api/httpClient";
import { useAuth } from "@/lib/auth";
import { spinService } from "@/services/spinService";
import type { SpinResponse, SpinRewardLabel } from "@/types/spin";

const formatNextSpin = (nextSpinTime: string | null) => {
  if (!nextSpinTime) return null;

  const date = new Date(nextSpinTime);
  if (Number.isNaN(date.getTime())) return nextSpinTime;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const SpinWheelPage = () => {
  const { user, isInitialized } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [rewardResult, setRewardResult] = useState<SpinResponse | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<string | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showRewardPopup, setShowRewardPopup] = useState(false);

  const nextSpinLabel = useMemo(() => formatNextSpin(nextSpinTime), [nextSpinTime]);

  const openLoginModal = useCallback(() => {
    setLoginModalOpen(true);
    setLoading(false);
    setSpinning(false);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      openLoginModal();
      return;
    }

    let isActive = true;

    const loadStatus = async () => {
      setLoading(true);
      try {
        const response = await spinService.getSpinStatus();
        if (!isActive) return;

        if (!response.success) {
          throw new Error(response.message || "Unable to load spin status.");
        }

        setCanSpin(response.canSpin);
        setTotalPoints(response.totalPoints ?? 0);
        setNextSpinTime(response.nextSpinTime ?? null);
        setLoginModalOpen(false);
      } catch (error) {
        if (!isActive) return;

        if (error instanceof ApiError && error.status === 401) {
          openLoginModal();
          return;
        }

        toast({
          title: "Unable to load spin status",
          description: error instanceof Error ? error.message : "Please check your connection and try again.",
          variant: "destructive",
        });
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadStatus();

    return () => {
      isActive = false;
    };
  }, [isInitialized, openLoginModal, toast, user]);

  const handleLogin = () => {
    navigate("/login", {
      state: {
        redirectTo: "/spin-wheel",
      },
    });
  };

  const handleSpin = async () => {
    if (!canSpin || spinning) return;

    setSpinning(true);
    setRewardResult(null);
    setShowRewardPopup(false);

    try {
      const response = await spinService.spinWheel();

      if (!response.success) {
        throw new Error(response.message || "Spin failed. Please try again.");
      }

      if (!(response.reward in REWARD_TO_SLICE_INDEX)) {
        throw new Error(`Unsupported reward returned: ${response.reward}`);
      }

      setRewardResult(response);
      setTotalPoints(response.totalPoints);
      setCanSpin(false);
    } catch (error) {
      setSpinning(false);

      if (error instanceof ApiError && error.status === 401) {
        openLoginModal();
        return;
      }

      toast({
        title: "Spin failed",
        description: error instanceof Error ? error.message : "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  const handleAnimationComplete = useCallback(() => {
    setSpinning(false);
    setShowRewardPopup(true);
  }, []);

  const statusMessage = !canSpin
    ? nextSpinLabel
      ? `You have already used today's spin. Next spin available at ${nextSpinLabel}.`
      : "You have already used today's spin."
    : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-10">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <Gift className="h-4 w-4" />
                    Daily Spin & Win
                  </p>
                  <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Spin once a day. Stack points. Redeem rewards.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                    You can spin the wheel once every 24 hours to earn points. Each spin guarantees a reward, from bonus
                    points to exclusive coupons. Collect points in your Reward Wallet and redeem them for exciting offers.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Star className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reward Wallet</p>
                      <p className="text-2xl font-extrabold text-primary">Total Points: {totalPoints}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
                <div className="rounded-lg border border-border bg-card p-5 shadow-sm md:p-8">
                  {loading ? (
                    <div className="flex min-h-[460px] items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <SpinWheel
                      canSpin={canSpin}
                      spinning={spinning}
                      selectedReward={(rewardResult?.reward as SpinRewardLabel | null) ?? null}
                      statusMessage={statusMessage}
                      onSpin={handleSpin}
                      onAnimationComplete={handleAnimationComplete}
                    />
                  )}
                </div>

                <aside className="space-y-5">
                  <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                      <Trophy className="h-5 w-5 text-primary" />
                      Reward Rules
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                      <li>One spin per day.</li>
                      <li>Points are added to your wallet immediately after a successful spin.</li>
                      <li>Collect points and redeem them for eligible coupons.</li>
                      <li>Points have no cash value and cannot be transferred.</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                    <h2 className="text-xl font-bold text-card-foreground">Wheel Prizes</h2>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {SPIN_REWARDS.map((reward) => (
                        <div key={reward.label} className="rounded-lg border border-border bg-secondary/60 px-3 py-3">
                          <p className="text-sm font-semibold text-foreground">{reward.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {reward.points > 0 ? `${reward.points} wallet points` : "Better luck next time"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        <RedeemSection availablePoints={totalPoints} />
      </main>

      {showRewardPopup && rewardResult && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 px-4">
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-2xl">
            <Gift className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-extrabold text-card-foreground">You Won {rewardResult.reward}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {rewardResult.pointsWon > 0
                ? `${rewardResult.pointsWon} points were added to your wallet.`
                : "No points this time. Come back tomorrow for another spin."}
            </p>
            <p className="mt-3 text-sm font-semibold text-primary">Total Points: {rewardResult.totalPoints}</p>
            <button
              type="button"
              onClick={() => setShowRewardPopup(false)}
              className="mt-6 w-full rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <LoginRequiredModal open={loginModalOpen} onLogin={handleLogin} />
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default SpinWheelPage;
