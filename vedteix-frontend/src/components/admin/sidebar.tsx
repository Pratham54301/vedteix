"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin?tab=overview", labelKey: "admin.overview", value: "overview" },
  { href: "/admin?tab=leads", labelKey: "admin.leads", value: "leads" },
  { href: "/admin?tab=appointments", labelKey: "admin.appointments", value: "appointments" },
  { href: "/admin?tab=chats", labelKey: "admin.chats", value: "chats" },
  { href: "/admin?tab=invoices", labelKey: "admin.invoices", value: "invoices" },
  { href: "/admin?tab=invoice-branding", labelKey: "admin.invoiceBranding", value: "invoice-branding" },
  { href: "/admin?tab=jobs", labelKey: "admin.jobs", value: "jobs" },
  { href: "/admin?tab=portfolios", labelKey: "admin.portfolios", value: "portfolios" },
  { href: "/admin?tab=services", labelKey: "admin.services", value: "services" },
  { href: "/admin?tab=blogs", labelKey: "admin.blogs", value: "blogs" },
  { href: "/admin?tab=testimonials", labelKey: "admin.testimonials", value: "testimonials" },
  { href: "/admin?tab=technologies", labelKey: "admin.technologies", value: "technologies" },
  { href: "/admin?tab=contacts", labelKey: "admin.contacts", value: "contacts" },
  { href: "/admin?tab=newsletters", labelKey: "admin.newsletters", value: "newsletters" },
  { href: "/admin?tab=settings", labelKey: "admin.settings", value: "settings" },
  { href: "/logout", labelKey: "admin.logout", value: "logout" },
] as const;

export function Sidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const { t } = useTranslation();

  return (
    <nav className="w-full border-b bg-card px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-8">
      <div className="mb-5 text-2xl font-bold text-primary">{t("admin.panel")}</div>
      <ul className="flex flex-wrap gap-2 md:flex-col">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block rounded-md px-4 py-2 font-medium transition-colors",
                item.value === activeTab
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {t(item.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
