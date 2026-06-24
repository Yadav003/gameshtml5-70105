import { apiConfig } from "./config";
import { request } from "./httpClient";

export type RewardBrand = "amazon" | "flipkart";
export type RedemptionStatus = "PENDING" | "APPROVED" | "REJECTED" | "FULFILLED";

export type RewardDashboard = {
  availablePoints: number;
  conversionRate: number;
  eligibleCoupons: Record<RewardBrand, number[]>;
};

export type RewardHistoryItem = {
  id: string;
  brand: RewardBrand;
  couponAmount: number;
  pointsUsed: number;
  status: RedemptionStatus;
  createdAt: string;
};

export type RedeemRewardPayload = {
  brand: RewardBrand;
  amount: number;
};

export type RedeemRewardResult = {
  success: boolean;
  message: string;
  data?: {
    redemptionId: string;
    status: RedemptionStatus;
    pointsUsed: number;
    remainingPoints: number;
  };
};

export type AdminRewardRedemption = {
  id: string;
  userEmail: string;
  brand: RewardBrand;
  couponAmount: number;
  pointsUsed: number;
  status: RedemptionStatus;
  createdAt: string | null;
  processedAt: string | null;
  adminRemark: string | null;
};

export type AdminRewardFilters = {
  status?: string;
  brand?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
};

export type AdminRewardRedemptionList = {
  redemptions: AdminRewardRedemption[];
  total: number;
  page: number;
  limit: number;
};

const USER_REWARDS_ENDPOINTS = {
  dashboard: "/api/rewards/dashboard",
  redeem: "/api/rewards/redeem",
  history: "/api/rewards/history",
} as const;

const ADMIN_REWARDS_ENDPOINTS = {
  redemptions: "/api/admin/rewards/redemptions",
} as const;

const userRewardRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.authServiceBaseUrl);

const adminRewardRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.adminServiceBaseUrl);

const unwrapPayload = (payload: unknown): unknown => {
  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as Record<string, unknown>).data ?? payload;
  }

  return payload;
};

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const toBrand = (value: unknown): RewardBrand => (value === "flipkart" ? "flipkart" : "amazon");

const toStatus = (value: unknown): RedemptionStatus => {
  const status = typeof value === "string" ? value.toUpperCase() : "";
  if (status === "APPROVED" || status === "REJECTED" || status === "FULFILLED") return status;
  return "PENDING";
};

const normalizeDashboard = (payload: unknown): RewardDashboard => {
  const data = unwrapPayload(payload) as Record<string, unknown> | null;
  const eligibleCoupons =
    data && typeof data.eligibleCoupons === "object" ? (data.eligibleCoupons as Record<string, unknown>) : {};

  const normalizeAmounts = (value: unknown) =>
    Array.isArray(value)
      ? value.map((amount) => toNumber(amount)).filter((amount) => amount > 0)
      : [];

  return {
    availablePoints: toNumber(data?.availablePoints),
    conversionRate: toNumber(data?.conversionRate, 2),
    eligibleCoupons: {
      amazon: normalizeAmounts(eligibleCoupons.amazon),
      flipkart: normalizeAmounts(eligibleCoupons.flipkart),
    },
  };
};

const normalizeHistory = (payload: unknown): RewardHistoryItem[] => {
  const data = unwrapPayload(payload);
  const list = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as Record<string, unknown>).items)
      ? ((data as Record<string, unknown>).items as unknown[])
      : [];

  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const row = item as Record<string, unknown>;
      return {
        id: String(row.id ?? row._id ?? ""),
        brand: toBrand(row.brand),
        couponAmount: toNumber(row.couponAmount ?? row.amount),
        pointsUsed: toNumber(row.pointsUsed),
        status: toStatus(row.status),
        createdAt: String(row.createdAt ?? ""),
      };
    });
};

const normalizeRedeemResult = (payload: unknown): RedeemRewardResult => {
  const response = payload as Record<string, unknown> | null;
  const data = response && typeof response.data === "object" ? (response.data as Record<string, unknown>) : undefined;

  return {
    success: Boolean(response?.success ?? true),
    message: typeof response?.message === "string" ? response.message : "Redemption request created successfully",
    data: data
      ? {
          redemptionId: String(data.redemptionId ?? data.id ?? ""),
          status: toStatus(data.status),
          pointsUsed: toNumber(data.pointsUsed),
          remainingPoints: toNumber(data.remainingPoints),
        }
      : undefined,
  };
};

const normalizeAdminList = (payload: unknown): AdminRewardRedemptionList => {
  const data = unwrapPayload(payload) as Record<string, unknown> | unknown[] | null;
  const listCandidate = Array.isArray(data)
    ? data
    : data && typeof data === "object"
      ? ((Array.isArray((data as Record<string, unknown>).redemptions)
          ? (data as Record<string, unknown>).redemptions
          : Array.isArray((data as Record<string, unknown>).items)
            ? (data as Record<string, unknown>).items
            : Array.isArray((data as Record<string, unknown>).data)
              ? (data as Record<string, unknown>).data
              : []) as unknown[])
      : [];

  const redemptions = listCandidate
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const row = item as Record<string, unknown>;
      const user = row.user && typeof row.user === "object" ? (row.user as Record<string, unknown>) : {};

      return {
        id: String(row.id ?? row._id ?? ""),
        userEmail: String(row.userEmail ?? row.email ?? user.email ?? ""),
        brand: toBrand(row.brand),
        couponAmount: toNumber(row.couponAmount ?? row.amount),
        pointsUsed: toNumber(row.pointsUsed),
        status: toStatus(row.status),
        createdAt: typeof row.createdAt === "string" ? row.createdAt : null,
        processedAt: typeof row.processedAt === "string" ? row.processedAt : null,
        adminRemark:
          (typeof row.adminRemark === "string" && row.adminRemark) ||
          (typeof row.remark === "string" && row.remark) ||
          null,
      };
    });

  const meta = data && typeof data === "object" && !Array.isArray(data) ? (data as Record<string, unknown>) : {};
  const pagination = typeof meta.pagination === "object" ? (meta.pagination as Record<string, unknown>) : {};

  return {
    redemptions,
    total: toNumber(meta.total ?? pagination.total ?? redemptions.length, redemptions.length),
    page: Math.max(1, toNumber(meta.page ?? pagination.page ?? 1, 1)),
    limit: Math.max(1, toNumber(meta.limit ?? pagination.limit ?? (redemptions.length || 20), 20)),
  };
};

export const rewardApi = {
  getDashboard: async () => {
    const response = await userRewardRequest<unknown>(USER_REWARDS_ENDPOINTS.dashboard);
    return normalizeDashboard(response);
  },

  redeem: async (payload: RedeemRewardPayload) => {
    const response = await userRewardRequest<unknown>(USER_REWARDS_ENDPOINTS.redeem, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return normalizeRedeemResult(response);
  },

  getHistory: async () => {
    const response = await userRewardRequest<unknown>(USER_REWARDS_ENDPOINTS.history);
    return normalizeHistory(response);
  },

  getAdminRedemptions: async (filters: AdminRewardFilters = {}) => {
    const query = new URLSearchParams();
    if (filters.status && filters.status !== "all") query.set("status", filters.status);
    if (filters.brand && filters.brand !== "all") query.set("brand", filters.brand);
    if (filters.from) query.set("from", filters.from);
    if (filters.to) query.set("to", filters.to);
    if (filters.page) query.set("page", String(filters.page));
    if (filters.limit) query.set("limit", String(filters.limit));

    const path = query.toString()
      ? `${ADMIN_REWARDS_ENDPOINTS.redemptions}?${query.toString()}`
      : ADMIN_REWARDS_ENDPOINTS.redemptions;
    const response = await adminRewardRequest<unknown>(path);
    return normalizeAdminList(response);
  },

  updateAdminRedemption: async (id: string, payload: { status: Exclude<RedemptionStatus, "PENDING">; remark: string }) => {
    return adminRewardRequest<unknown>(`${ADMIN_REWARDS_ENDPOINTS.redemptions}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
};
