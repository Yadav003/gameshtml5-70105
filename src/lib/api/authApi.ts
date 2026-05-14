import { AUTH_SERVICE_ENDPOINTS } from "./endpoints";
import { apiClient } from "./httpClient";
import { clearAuthToken, getRefreshToken } from "./session";

export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  role?: string;
};

export type AuthResponse = {
  user?: AuthUser;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  data?: {
    user?: AuthUser;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    message?: string;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

const unwrapAuthResponse = (response: AuthResponse) => {
  const payload = response.data ?? response;
  const user = payload.user;
  const token = payload.token ?? payload.accessToken ?? response.token ?? response.accessToken ?? null;
  const refreshToken = payload.refreshToken ?? response.refreshToken ?? null;

  return {
    user,
    token,
    refreshToken,
    message: payload.message ?? response.message ?? null,
  };
};

export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post<AuthResponse>(AUTH_SERVICE_ENDPOINTS.login, payload);
    return unwrapAuthResponse(response);
  },

  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post<AuthResponse>(AUTH_SERVICE_ENDPOINTS.register, payload);
    return unwrapAuthResponse(response);
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post<AuthResponse>(AUTH_SERVICE_ENDPOINTS.refreshToken, { refreshToken });
    return unwrapAuthResponse(response);
  },

  updatePassword: async (payload: UpdatePasswordPayload) => {
    const response = await apiClient.post<AuthResponse>(AUTH_SERVICE_ENDPOINTS.updatePassword, payload);
    return unwrapAuthResponse(response);
  },

  forgotPassword: async (email: string) => {
    return apiClient.post<{ message?: string }>(AUTH_SERVICE_ENDPOINTS.forgotPassword, { email });
  },

  resetPassword: async (payload: { token: string; password: string }) => {
    return apiClient.post<{ message?: string }>(AUTH_SERVICE_ENDPOINTS.resetPassword, payload);
  },

  logout: async () => {
    try {
      const refreshToken = getRefreshToken();
      await apiClient.post<{ message?: string }>(AUTH_SERVICE_ENDPOINTS.logout, { refreshToken });
    } finally {
      clearAuthToken();
    }
  },

  validateToken: async () => {
    return apiClient.get<{ valid?: boolean; user?: AuthUser }>(AUTH_SERVICE_ENDPOINTS.validateToken);
  },

  status: async () => {
    return apiClient.get<{ status?: string; availableEndpoints?: Record<string, string> }>(AUTH_SERVICE_ENDPOINTS.status);
  },

  me: async () => {
    return authApi.validateToken();
  },
};
