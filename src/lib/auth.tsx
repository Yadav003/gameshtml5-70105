/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";
import { apiConfig } from "./api/config";
import { AUTH_SERVICE_ENDPOINTS } from "./api/endpoints";
import { clearAuthToken, getAuthToken, getRefreshToken, setAuthTokens } from "./api/session";

export type User = {
  id?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  loginProvider?: string;
};

type AuthContextType = {
  user: User | null;
  isInitialized: boolean;
  login: (email: string, password: string, redirectTo?: string) => Promise<void>;
  startGoogleOAuth: () => Promise<void>;
  completeOAuthLogin: (payload: { user: User; accessToken?: string | null; refreshToken?: string | null }) => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ message?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "playarena_user";

const getSafeRedirect = (redirectTo?: string) => {
  if (!redirectTo || typeof redirectTo !== "string") return null;
  return redirectTo.startsWith("/") ? redirectTo : null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const accessToken = getAuthToken();
      const refreshToken = getRefreshToken();

      if (!(accessToken || refreshToken)) {
          // No tokens at all — definitely not logged in
          sessionStorage.removeItem(STORAGE_KEY);
          setUser(null);
          return;
        }

        // Optimistic render: show cached user immediately to avoid flicker,
        // but we MUST verify with the server before granting any permissions.
        if (raw) {
          try {
            setUser(JSON.parse(raw));
          } catch {
            // ignore malformed cache
          }
        }

        // Always verify the token server-side and use server-returned role.
        // This prevents sessionStorage tampering (e.g. changing role to "admin").
        try {
          const validation = await authApi.validateToken();
          const payload = (validation as { data?: { user?: import("./api/authApi").AuthUser }; user?: import("./api/authApi").AuthUser });
          const serverUser = payload.data?.user ?? payload.user ?? null;

          if (serverUser) {
            // Persist the server-authoritative user — overwrites any tampered cache
            persist(serverUser);
          } else {
            // Server returned no user despite a valid token response — clear session
            sessionStorage.removeItem(STORAGE_KEY);
            clearAuthToken();
            setUser(null);
          }
        } catch {
          // validate-token failed (expired, revoked, network down, etc.) — force logout
        sessionStorage.removeItem(STORAGE_KEY);
        clearAuthToken();
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to initialize auth", e);
      setUser(null);
      clearAuthToken();
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
    };

    void initAuth();
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else sessionStorage.removeItem(STORAGE_KEY);
  };

  const persistAuthUser = (
    incomingUser: User | undefined,
    fallbackEmail: string,
    accessToken?: string | null,
    refreshToken?: string | null
  ) => {
    const normalizedUser =
      incomingUser ??
      ({
        name: fallbackEmail.split("@")[0] || "Player",
        email: fallbackEmail,
      } as User);

    setAuthTokens(accessToken, refreshToken);
    persist(normalizedUser);
  };

  const login = async (email: string, password: string, redirectTo?: string) => {
    const response = await authApi.login({ email, password });
    persistAuthUser(response.user, email, response.token, response.refreshToken);
    const role = response.user?.role?.toLowerCase();
    const safeRedirect = getSafeRedirect(redirectTo);
    if (safeRedirect) {
      navigate(safeRedirect, { replace: true });
      return;
    }
    navigate(role === "admin" ? "/admin/dashboard" : "/", { replace: true });
  };

  const startGoogleOAuth = async () => {
    window.location.assign(`${apiConfig.authServiceBaseUrl}${AUTH_SERVICE_ENDPOINTS.googleLogin}`);
  };

  const completeOAuthLogin = ({ user: incomingUser, accessToken, refreshToken }: { user: User; accessToken?: string | null; refreshToken?: string | null }) => {
    setAuthTokens(accessToken, refreshToken);
    persist(incomingUser);
  };

  const register = async (name: string, email: string, password: string) => {
    await authApi.register({ name, email, password });
    persist(null);
    clearAuthToken();
    navigate("/login");
  };

  const logout = () => {
    void authApi.logout().catch(() => {
      clearAuthToken();
    });
    persist(null);
    navigate("/");
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await authApi.updatePassword({ currentPassword, newPassword });
  };

  const forgotPassword = async (email: string) => {
    return authApi.forgotPassword(email);
  };

  const resetPassword = async (token: string, password: string) => {
    return authApi.resetPassword({ token, password });
  };

  return (
    <AuthContext.Provider
      value={{ user, isInitialized, login, startGoogleOAuth, completeOAuthLogin, register, logout, updatePassword, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
