export type RewardBrand = "amazon" | "flipkart";

export interface RedemptionTier {
  id: string;
  amount: number;
  requiredPoints: number;
}

export interface RewardPartner {
  id: RewardBrand;
  brand: RewardBrand;
  brandName: string;
  title: string;
  description: string;
  logo: string;
  coupons: RedemptionTier[];
}

export interface RewardVoucher extends RedemptionTier {
  brand: RewardBrand;
  brandName: string;
  description?: string;
}

export interface RewardCategory {
  id: RewardBrand;
  title: string;
  vouchers: RewardVoucher[];
}

export interface RedeemRouteState {
  fromPlayAndEarn?: boolean;
}

export const REDEEM_ACCESS_SESSION_KEY = "playarena-redeem-access";
