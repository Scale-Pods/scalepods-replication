"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

export function useAdminTheme() {
  return useContext(ThemeContext);
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Read persisted preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("scalepods-admin-theme") as Theme | null;
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {}
  }, []);

  // Apply data-theme to the html element so CSS vars take effect
  useEffect(() => {
    const el = document.documentElement;
    if (theme === "light") {
      el.setAttribute("data-theme", "light");
    } else {
      el.removeAttribute("data-theme");
    }
    try { localStorage.setItem("scalepods-admin-theme", theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
