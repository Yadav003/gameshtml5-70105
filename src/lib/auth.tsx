import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";
import { clearAuthToken, setAuthTokens } from "./api/session";

type User = {
  id?: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
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
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load user from storage", e);
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
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
    navigate("/");
  };

  const googleLogin = async (credential: string) => {
    const response = await authApi.googleLogin({ credential });
    const fallbackEmail = response.user?.email ?? "google-user@playverse.com";
    persistAuthUser(response.user, fallbackEmail, response.token, response.refreshToken);
    navigate("/");
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
    <AuthContext.Provider value={{ user, login, googleLogin, register, logout, updatePassword, forgotPassword, resetPassword }}>
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
