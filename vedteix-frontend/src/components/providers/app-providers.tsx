"use client";

import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "@/i18n/locales/en.json";
import hi from "@/i18n/locales/hi.json";
import gu from "@/i18n/locales/gu.json";
import { ThemeBootstrap } from "@/components/providers/theme-bootstrap";
import { CustomCursor } from "@/components/custom-cursor";
import { NavigationProgress } from "@/components/navigation-progress";
import { ChatWidget } from "@/components/chat-widget";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  gu: { translation: gu },
};

if (!i18next.isInitialized) {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "hi", "gu"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "vedteix-lng",
      },
    });
}

export function AppProviders({
  children,
  initialThemeDark,
}: {
  children: React.ReactNode;
  initialThemeDark: boolean;
}) {
  useEffect(() => {
    const lang = i18next.language || "en";
    document.documentElement.lang = lang;
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
    };
    i18next.on("languageChanged", onChange);
    return () => {
      i18next.off("languageChanged", onChange);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeBootstrap initialThemeDark={initialThemeDark} />
      <NavigationProgress />
      <CustomCursor />
      {children}
      <ChatWidget />
    </I18nextProvider>
  );
}
