export const AUTH_SERVICE_ENDPOINTS = {
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  googleLogin: "/api/v1/auth/google",
  refreshToken: "/api/v1/auth/refresh-token",
  updatePassword: "/api/auth/update-password",
  forgotPassword: "/api/auth/forgot-password",
  resetPassword: "/api/auth/reset-password",
  logout: "/api/auth/logout",
  validateToken: "/api/auth/validate-token",
  status: "/status",
} as const;

export type AuthServiceEndpointKey = keyof typeof AUTH_SERVICE_ENDPOINTS;
