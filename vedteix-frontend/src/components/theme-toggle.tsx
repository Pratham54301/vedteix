"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEME_COOKIE_NAME = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

export function ThemeToggle({
  initialTheme,
}: {
  initialTheme: "dark" | "light";
}) {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  useEffect(() => {
    const activeTheme = document.documentElement.classList.contains("dark");
    setIsDark(activeTheme);
    applyTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    applyTheme(nextIsDark);
    document.cookie = `${THEME_COOKIE_NAME}=${nextIsDark ? "dark" : "light"}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
