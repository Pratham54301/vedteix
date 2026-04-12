"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function SiteChrome({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: "dark" | "light";
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header initialTheme={initialTheme} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
