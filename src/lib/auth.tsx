/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";
import { apiConfig } from "./api/config";
import { AUTH_SERVICE_ENDPOINTS } from "./api/endpoints";
import { clearAuthToken, getAuthToken, getRefreshToken, setAuthTokens } from "./api/session";

type User = {
  id?: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  startGoogleOAuth: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<{ message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ message?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "playverse_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      const accessToken = getAuthToken();
      const refreshToken = getRefreshToken();

      if (raw && (accessToken || refreshToken)) {
        setUser(JSON.parse(raw));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
        clearAuthToken();
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to load user from storage", e);
      setUser(null);
      clearAuthToken();
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
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

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    persistAuthUser(response.user, email, response.token, response.refreshToken);
    const role = response.user?.role?.toLowerCase();
    navigate(role === "admin" ? "/admin/dashboard" : "/");
  };

  const startGoogleOAuth = async () => {
    try {
      const response = await authApi.googleOAuthStart();
      const authorizationUrl = response.authorizationUrl ?? response.url;

      if (authorizationUrl) {
        window.location.assign(authorizationUrl);
        return;
      }
    } catch (error) {
      const status = typeof error === "object" && error && "status" in error ? Number((error as { status?: unknown }).status) : null;
      if (status !== 404) {
        throw error;
      }
    }

    window.location.assign(`${apiConfig.authServiceBaseUrl}${AUTH_SERVICE_ENDPOINTS.googleLogin}`);
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
      value={{ user, isInitialized, login, startGoogleOAuth, register, logout, updatePassword, forgotPassword, resetPassword }}
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
