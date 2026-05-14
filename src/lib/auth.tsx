import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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

  const login = async (email: string, password: string) => {
    // Fake login — replace with real API call as needed
    await new Promise((r) => setTimeout(r, 400));
    const u = { name: email.split("@")[0] || "Player", email } as User;
    persist(u);
    navigate("/");
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const u = { name: name || email.split("@")[0], email } as User;
    persist(u);
    navigate("/");
  };

  const logout = () => {
    persist(null);
    navigate("/");
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await new Promise((r) => setTimeout(r, 400));
    // In a real app we'd call an API here. We just resolve successfully.
    return;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updatePassword }}>
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
