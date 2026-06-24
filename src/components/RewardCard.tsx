import { Gift, Ticket, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { RewardPartner } from "@/types/reward.types";
import type { RewardBrand } from "@/lib/api";

interface RewardCardProps {
  partner: RewardPartner;
  availablePoints: number;
  couponAmounts: number[];
  conversionRate: number;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onRedeem?: (payload: { brand: RewardBrand; amount: number }) => void;
}

const RewardCard = ({
  partner,
  availablePoints,
  couponAmounts,
  conversionRate,
  isDisabled = false,
  isSubmitting = false,
  onRedeem,
}: RewardCardProps) => {
  const [selectedAmount, setSelectedAmount] = useState("");

  const selectedCoupon = useMemo(
    () => couponAmounts.find((amount) => String(amount) === selectedAmount),
    [couponAmounts, selectedAmount],
  );
  const canRedeem = Boolean(selectedCoupon && !isDisabled && !isSubmitting);

  const handleRedeem = () => {
    if (!selectedCoupon || !canRedeem) return;

    onRedeem?.({ brand: partner.brand, amount: selectedCoupon });
  };

  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-white p-2 shadow-sm">
          <img
            src={partner.logo}
            alt={`${partner.brandName} logo`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <WalletCards className="h-3.5 w-3.5" />
          {availablePoints} Points
        </div>
      </div>

      <div className="mt-5 flex-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Ticket className="h-4 w-4 text-primary" />
          {partner.brandName} Voucher
        </p>
        <h3 className="mt-2 text-2xl font-extrabold text-card-foreground">{partner.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{partner.description}</p>

        <div className="mt-6">
          <label htmlFor={`${partner.id}-coupon`} className="text-sm font-semibold text-card-foreground">
            Select Coupon
          </label>
          <select
            id={`${partner.id}-coupon`}
            value={selectedAmount}
            onChange={(event) => setSelectedAmount(event.target.value)}
            disabled={isDisabled || couponAmounts.length === 0}
            className="mt-2 h-12 w-full rounded-md border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          >
            <option value="">{couponAmounts.length ? "Choose coupon value" : "No eligible coupons"}</option>
            {couponAmounts.map((amount) => (
              <option key={`${partner.id}-${amount}`} value={amount}>
                ₹{amount} Coupon ({amount * conversionRate} Points)
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="button"
        className="mt-6 w-full font-bold"
        disabled={!canRedeem}
        onClick={handleRedeem}
      >
        <Gift className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Redeem Now"}
      </Button>
    </article>
  );
};

export default RewardCard;
