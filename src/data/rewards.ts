import type { RedemptionTier, RewardCategory, RewardPartner, RewardVoucher } from "@/types/reward.types";
import amazonLogo from "@/assets/amazon.webp";
import flipkartLogo from "@/assets/flipkart.png";

export const MOCK_AVAILABLE_POINTS = 400;

export const REDEMPTION_TIERS: RedemptionTier[] = [
  { id: "coupon-50", amount: 50, requiredPoints: 100 },
  { id: "coupon-100", amount: 100, requiredPoints: 200 },
  { id: "coupon-200", amount: 200, requiredPoints: 400 },
  { id: "coupon-250", amount: 250, requiredPoints: 500 },
  { id: "coupon-500", amount: 500, requiredPoints: 1000 },

];

const createVouchers = (brand: RewardVoucher["brand"], brandName: string): RewardVoucher[] =>
  REDEMPTION_TIERS.map((tier) => ({
    ...tier,
    id: `${brand}-${tier.amount}`,
    brand,
    brandName,
    description: `Redeem ${tier.requiredPoints} PlayArena points for a ₹${tier.amount} ${brandName} gift voucher.`,
  }));

export const REWARD_CATEGORIES: RewardCategory[] = [
  {
    id: "amazon",
    title: "Amazon Gift Vouchers",
    vouchers: createVouchers("amazon", "Amazon"),
  },
  {
    id: "flipkart",
    title: "Flipkart Gift Vouchers",
    vouchers: createVouchers("flipkart", "Flipkart"),
  },
];

export const REWARD_PARTNERS: RewardPartner[] = [
  {
    id: "amazon",
    brand: "amazon",
    brandName: "Amazon",
    title: "Amazon Gift Voucher",
    description: "Redeem PlayArena points for Amazon voucher value for your next purchase.",
    logo: amazonLogo,
    coupons: REDEMPTION_TIERS,
  },
  {
    id: "flipkart",
    brand: "flipkart",
    brandName: "Flipkart",
    title: "Flipkart Gift Voucher",
    description: "Turn your PlayArena points into Flipkart voucher value for your next purchase.",
    logo: flipkartLogo,
    coupons: REDEMPTION_TIERS,
  },
];

export const COMING_SOON_REWARDS = [
  "International currency support",
  "Multi-currency redemption",
  "Paytm gift vouchers",
  "Google Play gift cards",
  "Steam Wallet rewards",
  "Additional reward partners",
  "Country-specific reward catalogs",
];
