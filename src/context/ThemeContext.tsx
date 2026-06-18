"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  }
  return "dark";
}

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--background", "#f5f5f0");
      root.style.setProperty("--foreground", "#18181b");
      root.style.setProperty("--card-bg", "#ffffff");
      root.style.setProperty("--card-text", "#71717a");
      root.style.setProperty("--border-color", "#e4e4e7");
    } else {
      root.style.setProperty("--background", "#09090b");
      root.style.setProperty("--foreground", "#fafafa");
      root.style.setProperty("--card-bg", "#18181b");
      root.style.setProperty("--card-text", "#a1a1aa");
      root.style.setProperty("--border-color", "#27272a");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
