import { apiConfig } from "./config";
import { ADMIN_SERVICE_ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";
import { clearAuthToken, getRefreshToken } from "./session";

export type AdminDashboardStats = {
  totalUsers: number;
  activeToday: number;
  verifiedProfiles: number;
  growthThisWeek: number;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string | null;
  status?: string | null;
  loginProvider?: string | null;
  joined?: string | null;
  lockUntil?: string | null;
};

export type AdminUserListResult = {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
};

type AdminUserListParams = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  loginProvider?: string;
  status?: string;
};

type AdminUserCreatePayload = {
  name: string;
  email: string;
  password: string;
  role: string;
  status?: string;
};

type AdminUserUpdatePayload = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
  lockUntil?: string | null;
};

const adminRequest = <T>(path: string, init?: RequestInit) =>
  request<T>(path, init, apiConfig.requestTimeoutMs, apiConfig.adminServiceBaseUrl);

const unwrapPayload = <T>(response: T): T => {
  if (response && typeof response === "object" && "data" in (response as Record<string, unknown>)) {
    const data = (response as Record<string, unknown>).data as T | undefined;
    return (data ?? response) as T;
  }

  return response;
};

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const normalizeUser = (user: Record<string, unknown>): AdminUser => {
  const id =
    (typeof user.id === "string" && user.id) ||
    (typeof user._id === "string" && user._id) ||
    (typeof user.userId === "string" && user.userId) ||
    "";

  return {
    id,
    name:
      (typeof user.name === "string" && user.name) ||
      (typeof user.fullName === "string" && user.fullName) ||
      "Unknown",
    email: (typeof user.email === "string" && user.email) || "",
    phone: typeof user.phone === "string" ? user.phone : null,
    role: typeof user.role === "string" ? user.role : null,
    status: typeof user.status === "string" ? user.status : null,
    loginProvider:
      (typeof user.loginProvider === "string" && user.loginProvider) ||
      (typeof user.provider === "string" && user.provider) ||
      (typeof user.authProvider === "string" && user.authProvider) ||
      null,
    joined:
      (typeof user.joined === "string" && user.joined) ||
      (typeof user.createdAt === "string" && user.createdAt) ||
      null,
    lockUntil:
      (typeof user.lockUntil === "string" && user.lockUntil) ||
      (typeof user.lockedUntil === "string" && user.lockedUntil) ||
      null,
  };
};

const normalizeUserList = (payload: unknown): AdminUserListResult => {
  const data = unwrapPayload(payload as Record<string, unknown> | null) as Record<string, unknown> | null;
  const listCandidate =
    (data && Array.isArray(data.users) ? data.users : null) ||
    (data && Array.isArray(data.data) ? data.data : null) ||
    (Array.isArray(payload) ? payload : null) ||
    [];

  const users = listCandidate
    .filter((item) => item && typeof item === "object")
    .map((user) => normalizeUser(user as Record<string, unknown>));

  return {
    users,
    total: toNumber(data?.total ?? data?.count ?? users.length, users.length),
    page: Math.max(1, toNumber(data?.page ?? 1, 1)),
    limit: Math.max(1, toNumber(data?.limit ?? users.length ?? 1, users.length || 1)),
  };
};

const normalizeDashboard = (payload: unknown): AdminDashboardStats => {
  const data = unwrapPayload(payload as Record<string, unknown> | null) as Record<string, unknown> | null;
  const stats = (data && typeof data.stats === "object" ? (data.stats as Record<string, unknown>) : data) ?? {};

  return {
    totalUsers: toNumber(stats.totalUsers ?? stats.users ?? stats.total ?? 0, 0),
    activeToday: toNumber(stats.activeToday ?? stats.activeUsers ?? stats.active ?? 0, 0),
    verifiedProfiles: toNumber(stats.verifiedProfiles ?? stats.verifiedUsers ?? stats.verified ?? 0, 0),
    growthThisWeek: toNumber(stats.growthThisWeek ?? stats.weeklyGrowth ?? stats.growth ?? 0, 0),
  };
};

export const adminApi = {
  getDashboard: async () => {
    const response = await adminRequest<unknown>(ADMIN_SERVICE_ENDPOINTS.dashboard);
    return normalizeDashboard(response);
  },

  getUsers: async (params: AdminUserListParams = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.role) query.set("role", params.role);
    if (params.loginProvider) query.set("loginProvider", params.loginProvider);
    if (params.status) query.set("status", params.status);

    const path = query.toString()
      ? `${ADMIN_SERVICE_ENDPOINTS.users}?${query.toString()}`
      : ADMIN_SERVICE_ENDPOINTS.users;

    const response = await adminRequest<unknown>(path);
    return normalizeUserList(response);
  },

  getUser: async (userId: string) => {
    const response = await adminRequest<unknown>(`${ADMIN_SERVICE_ENDPOINTS.users}/${userId}`);
    const payload = unwrapPayload(response as Record<string, unknown> | null) as Record<string, unknown> | null;
    const userData =
      (payload && typeof payload.user === "object" ? (payload.user as Record<string, unknown>) : null) ||
      (payload && typeof payload.data === "object" ? (payload.data as Record<string, unknown>) : null) ||
      (payload && typeof payload === "object" ? payload : null);

    return userData ? normalizeUser(userData) : null;
  },

  createUser: async (payload: AdminUserCreatePayload) => {
    const response = await adminRequest<unknown>(ADMIN_SERVICE_ENDPOINTS.users, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = unwrapPayload(response as Record<string, unknown> | null) as Record<string, unknown> | null;
    const userData =
      (data && typeof data.user === "object" ? (data.user as Record<string, unknown>) : null) ||
      (data && typeof data.data === "object" ? (data.data as Record<string, unknown>) : null) ||
      data;

    return userData ? normalizeUser(userData as Record<string, unknown>) : null;
  },

  updateUser: async (userId: string, payload: AdminUserUpdatePayload) => {
    const response = await adminRequest<unknown>(`${ADMIN_SERVICE_ENDPOINTS.users}/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    const data = unwrapPayload(response as Record<string, unknown> | null) as Record<string, unknown> | null;
    const userData =
      (data && typeof data.user === "object" ? (data.user as Record<string, unknown>) : null) ||
      (data && typeof data.data === "object" ? (data.data as Record<string, unknown>) : null) ||
      data;

    return userData ? normalizeUser(userData as Record<string, unknown>) : null;
  },

  deleteUser: async (userId: string) => {
    await adminRequest(`${ADMIN_SERVICE_ENDPOINTS.users}/${userId}`, {
      method: "DELETE",
    });
  },

  logout: async () => {
    const refreshToken = getRefreshToken();
    try {
      await adminRequest(ADMIN_SERVICE_ENDPOINTS.logout, {
        method: "POST",
        body: JSON.stringify(refreshToken ? { refreshToken } : {}),
      });
    } finally {
      clearAuthToken();
    }
  },
};
