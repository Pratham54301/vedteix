"use client";

import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LANGS = [
  { code: "en", labelKey: "lang.en" },
  { code: "hi", labelKey: "lang.hi" },
  { code: "gu", labelKey: "lang.gu" },
] as const;

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label={t("header.language")}>
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              void i18n.changeLanguage(lang.code);
              try {
                localStorage.setItem("vedteix-lng", lang.code);
              } catch {
                /* ignore */
              }
            }}
            className={i18n.language?.startsWith(lang.code) ? "bg-muted" : ""}
          >
            {t(lang.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
