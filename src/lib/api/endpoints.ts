export const AUTH_SERVICE_ENDPOINTS = {
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  googleLogin: "/api/v1/auth/google",
  googleCallback: "/api/v1/auth/google/callback",
  refreshToken: "/api/v1/auth/refresh-token",
  updatePassword: "/api/v1/auth/update-password",
  forgotPassword: "/api/v1/auth/forgot-password",
  resetPassword: "/api/v1/auth/reset-password",
  logout: "/api/v1/auth/logout",
  validateToken: "/api/v1/auth/validate-token",
  status: "/status",
} as const;

export const ADMIN_SERVICE_ENDPOINTS = {
  dashboard: "/api/v1/admin/dashboard",
  users: "/api/v1/admin/users",
  logout: "/api/v1/admin/logout",
  advertisement: "/api/v1/admin/advertisement",
  advertisements: "/api/v1/admin/advertisements",
} as const;

export const PUBLIC_SERVICE_ENDPOINTS = {
  advertisement: "/api/v1/advertisement",
} as const;

export type AuthServiceEndpointKey = keyof typeof AUTH_SERVICE_ENDPOINTS;
export type AdminServiceEndpointKey = keyof typeof ADMIN_SERVICE_ENDPOINTS;
export type PublicServiceEndpointKey = keyof typeof PUBLIC_SERVICE_ENDPOINTS;
