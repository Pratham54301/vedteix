"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OverviewTab } from "@/components/admin/tabs/overview-tab";
import {
  LeadsPanel,
  AppointmentsPanel,
  ChatsPanel,
  InvoicesPanel,
  InvoiceBrandingPanel,
} from "@/components/admin/tabs/saas-tabs";
import {
  ContactsPanel,
  NewslettersPanel,
  GeneralSiteSettingsPanel,
  JobsPanel,
} from "@/components/admin/tabs/cms-tabs";
import {
  PortfoliosPanel,
  ServicesPanel,
  BlogsPanel,
  TestimonialsPanel,
  TechnologiesPanel,
} from "@/components/admin/tabs/resource-tabs";

function AdminBody() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  switch (tab) {
    case "overview":
      return <OverviewTab />;
    case "leads":
      return <LeadsPanel />;
    case "appointments":
      return <AppointmentsPanel />;
    case "chats":
      return <ChatsPanel />;
    case "invoices":
      return <InvoicesPanel />;
    case "invoice-branding":
      return <InvoiceBrandingPanel />;
    case "contacts":
      return <ContactsPanel />;
    case "newsletters":
      return <NewslettersPanel />;
    case "settings":
      return <GeneralSiteSettingsPanel />;
    case "jobs":
      return <JobsPanel />;
    case "portfolios":
      return <PortfoliosPanel />;
    case "services":
      return <ServicesPanel />;
    case "blogs":
      return <BlogsPanel />;
    case "testimonials":
      return <TestimonialsPanel />;
    case "technologies":
      return <TechnologiesPanel />;
    case "logout":
      return null;
    default:
      return <OverviewTab />;
  }
}

export function AdminConsole() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading workspace…</p>}>
      <AdminBody />
    </Suspense>
  );
}
