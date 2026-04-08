"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin?tab=overview", label: "Overview", value: "overview" },
  { href: "/admin?tab=jobs", label: "Jobs", value: "jobs" },
  { href: "/admin?tab=portfolios", label: "Portfolios", value: "portfolios" },
  { href: "/admin?tab=services", label: "Services", value: "services" },
  { href: "/admin?tab=blogs", label: "Blogs", value: "blogs" },
  { href: "/admin?tab=testimonials", label: "Testimonials", value: "testimonials" },
  { href: "/admin?tab=technologies", label: "Technologies", value: "technologies" },
  { href: "/admin?tab=contacts", label: "Contacts", value: "contacts" },
  { href: "/admin?tab=newsletters", label: "Newsletters", value: "newsletters" },
  { href: "/admin?tab=settings", label: "Settings", value: "settings" },
  { href: "/logout", label: "Logout", value: "logout" },
];

export function Sidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  return (
    <nav className="w-full border-b bg-card px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-8">
      <div className="mb-5 text-2xl font-bold text-primary">Admin Panel</div>
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
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
