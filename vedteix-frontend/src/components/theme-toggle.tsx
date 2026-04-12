"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { THEME_KEY, applyDark, writeCookie } from "@/components/providers/theme-bootstrap";

function applyTheme(isDark: boolean) {
  applyDark(isDark);
}

export function ThemeToggle({
  initialTheme,
}: {
  initialTheme: "dark" | "light";
}) {
  const { t } = useTranslation();
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
    try {
      localStorage.setItem(THEME_KEY, nextIsDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
    writeCookie(nextIsDark);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.light") : t("theme.dark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
