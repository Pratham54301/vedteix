"use client";

import { useLayoutEffect } from "react";

const THEME_KEY = "vedteix-theme";
const THEME_COOKIE = "theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function applyDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function writeCookie(dark: boolean) {
  document.cookie = `${THEME_COOKIE}=${dark ? "dark" : "light"}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function ThemeBootstrap({ initialThemeDark }: { initialThemeDark: boolean }) {
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      const dark =
        stored === "dark" || stored === "light"
          ? stored === "dark"
          : initialThemeDark;
      applyDark(dark);
      writeCookie(dark);
    } catch {
      applyDark(initialThemeDark);
    }
  }, [initialThemeDark]);

  return null;
}

export { THEME_KEY, THEME_COOKIE, COOKIE_MAX_AGE, applyDark, writeCookie };
