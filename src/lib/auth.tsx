"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TZ } from "./tz";
import { initApp, getInitResult } from "./init";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  subscription?: { id: string; plan: string; status: string; expiresAt?: string } | null;
  attributes?: Record<string, any> | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refresh: async () => {},
});

function parseUser(profile: any): User | null {
  if (!profile?.id) return null;
  return {
    id: profile.id,
    name: profile.name || "",
    email: profile.email || "",
    phone: profile.phone,
    avatarUrl: profile.avatarUrl,
    subscription: profile.subscription || null,
    attributes: profile.attributes || null,
  };
}

const THEME_KEY = "sidekaam_theme";

function applyTheme(user: User | null) {
  if (typeof document === "undefined") return;
  const appearance = user?.attributes?.preferences?.appearance;
  const isDark = appearance === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  try { localStorage.setItem(THEME_KEY, isDark ? "dark" : "light"); } catch {}
}

// Apply cached theme immediately to prevent flash
if (typeof window !== "undefined") {
  try {
    const cached = localStorage.getItem(THEME_KEY);
    if (cached === "dark") document.documentElement.classList.add("dark");
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    // First check if init already fetched the user
    const cached = getInitResult();
    if (cached?.user) {
      const u = parseUser(cached.user);
      setUser(u);
      applyTheme(u);
      setLoading(false);
      return;
    }

    // Otherwise fetch fresh
    try {
      const result = await initApp();
      const u = parseUser(result.user);
      setUser(u);
      applyTheme(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    TZ.storefront.auth.logout();
    try { localStorage.removeItem("sidekaam_onboarding_v2"); } catch {}
    setUser(null);
    window.location.href = "/";
  };

  const refresh = async () => {
    try {
      const profile: any = await TZ.storefront.auth.me();
      const u = parseUser(profile);
      setUser(u);
      applyTheme(u);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) return null; // AppLoader handles the loading UI
  if (!user) return null;
  return <>{children}</>;
}
