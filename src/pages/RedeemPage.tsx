import { Gift, RefreshCw, WalletCards } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { MobileFooterNav } from "@/components/MobileFooterNav";
import { Navigation } from "@/components/Navigation";
import RewardCard from "@/components/RewardCard";
import { REWARD_PARTNERS } from "@/data/rewards";
import { useToast } from "@/hooks/use-toast";
import { ApiError, rewardApi, type RedeemRewardPayload, type RewardDashboard, type RewardHistoryItem } from "@/lib/api";

const emptyDashboard: RewardDashboard = {
  availablePoints: 0,
  conversionRate: 2,
  eligibleCoupons: {
    amazon: [],
    flipkart: [],
  },
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
};

const RedeemPage = () => {
  const { toast } = useToast();
  const [dashboard, setDashboard] = useState<RewardDashboard>(emptyDashboard);
  const [history, setHistory] = useState<RewardHistoryItem[]>([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");
  const [historyError, setHistoryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingBlockedMessage, setPendingBlockedMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsDashboardLoading(true);
    setDashboardError("");

    try {
      const response = await rewardApi.getDashboard();
      setDashboard(response);
    } catch (error) {
      setDashboardError(error instanceof Error ? error.message : "Unable to load rewards dashboard.");
    } finally {
      setIsDashboardLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    setIsHistoryLoading(true);
    setHistoryError("");

    try {
      const response = await rewardApi.getHistory();
      setHistory(response);
      setPendingBlockedMessage(
        response.some((item) => item.status === "PENDING") ? "You already have a pending redemption request." : "",
      );
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : "Unable to load redemption history.");
    } finally {
      setIsHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
    void loadHistory();
  }, [loadDashboard, loadHistory]);

  const availablePoints = dashboard.availablePoints;
  const maximumReward = useMemo(() => {
    const allCoupons = Object.values(dashboard.eligibleCoupons).flat();
    return allCoupons.length ? Math.max(...allCoupons) : 0;
  }, [dashboard.eligibleCoupons]);
  const hasPendingRequest = Boolean(pendingBlockedMessage);

  const handleRedeem = async (payload: RedeemRewardPayload) => {
    if (isSubmitting || hasPendingRequest) return;
    setIsSubmitting(true);

    try {
      const response = await rewardApi.redeem({
        brand: payload.brand,
        amount: payload.amount,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      toast({
        title: "Redemption request created",
        description: response.message,
      });

      if (response.data) {
        setDashboard((current) => ({
          ...current,
          availablePoints: response.data?.remainingPoints ?? current.availablePoints,
        }));
      }

      await Promise.all([loadDashboard(), loadHistory()]);
    } catch (error) {
      const message =
        error instanceof ApiError || error instanceof Error ? error.message : "Unable to create redemption request.";
      if (message.toLowerCase().includes("pending")) {
        setPendingBlockedMessage(message);
      }
      toast({
        title: "Redemption failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-16 pb-20 md:pb-10">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <Gift className="h-4 w-4" />
                    PlayArena Rewards
                  </p>
                  <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                    Redeem Your Rewards
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                    Choose a voucher partner, pick an eligible coupon value, and convert your PlayArena points into
                    reward value.
                  </p>
                </div>

                <div className="rounded-lg border border-primary/40 bg-primary/10 p-5 shadow-lg shadow-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <WalletCards className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available Points</p>
                      <p className="text-3xl font-extrabold text-primary">
                        {isDashboardLoading ? "..." : availablePoints}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-8 rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Points</p>
                    <p className="mt-1 text-2xl font-extrabold text-primary">
                      {isDashboardLoading ? "Loading..." : availablePoints}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="mt-1 text-lg font-bold text-card-foreground">
                      {dashboard.conversionRate} Points = ₹1
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maximum Reward</p>
                    <p className="mt-1 text-lg font-bold text-card-foreground">
                      {maximumReward ? `₹${maximumReward}` : "-"}
                    </p>
                  </div>
                </div>
                <p className="mt-4 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                  You can redeem any coupon equal to or below your current points balance.
                </p>
                {dashboardError ? (
                  <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {dashboardError}
                  </div>
                ) : null}
                {pendingBlockedMessage ? (
                  <div className="mt-4 rounded-md border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm font-semibold text-yellow-600">
                    {pendingBlockedMessage}
                  </div>
                ) : null}
              </section>

              <section className="mt-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-extrabold text-foreground">Gift Vouchers</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {REWARD_PARTNERS.map((partner) => (
                    <RewardCard
                      key={partner.id}
                      partner={partner}
                      availablePoints={availablePoints}
                      couponAmounts={dashboard.eligibleCoupons[partner.brand] ?? []}
                      conversionRate={dashboard.conversionRate}
                      isDisabled={isDashboardLoading || hasPendingRequest}
                      isSubmitting={isSubmitting}
                      onRedeem={handleRedeem}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-10 rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-extrabold text-foreground">Redemption History</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Your recent reward requests and statuses.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void loadHistory()}
                    disabled={isHistoryLoading}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw className={`h-4 w-4 ${isHistoryLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>
                </div>

                {historyError ? (
                  <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {historyError}
                  </div>
                ) : null}

                <div className="mt-5 overflow-x-auto">
                  {isHistoryLoading ? (
                    <div className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
                      Loading redemption history...
                    </div>
                  ) : history.length === 0 ? (
                    <div className="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">
                      No redemption requests yet.
                    </div>
                  ) : (
                    <table className="w-full min-w-[680px] text-left text-sm">
                      <thead className="border-b border-border text-muted-foreground">
                        <tr>
                          <th className="py-3 pr-4 font-semibold">Brand</th>
                          <th className="py-3 pr-4 font-semibold">Coupon</th>
                          <th className="py-3 pr-4 font-semibold">Points Used</th>
                          <th className="py-3 pr-4 font-semibold">Status</th>
                          <th className="py-3 pr-4 font-semibold">Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((item) => (
                          <tr key={item.id} className="border-b border-border/70 last:border-0">
                            <td className="py-3 pr-4 font-semibold capitalize">{item.brand}</td>
                            <td className="py-3 pr-4">₹{item.couponAmount}</td>
                            <td className="py-3 pr-4">{item.pointsUsed}</td>
                            <td className="py-3 pr-4">
                              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 pr-4">{formatDate(item.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            </div>
          </div>

      </main>
      <Footer />
      <MobileFooterNav />
    </div>
  );
};

export default RedeemPage;
