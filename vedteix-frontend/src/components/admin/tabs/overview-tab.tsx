"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/types";

export function OverviewTab() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/dashboard", { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load stats");
        if (!cancelled) setStats(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  if (!stats) {
    return <p className="text-muted-foreground">Loading overview…</p>;
  }

  const cards = [
    { label: "Users", value: stats.totalUsers },
    { label: "Jobs", value: stats.totalJobs },
    { label: "Portfolios", value: stats.totalPortfolios },
    { label: "Services", value: stats.totalServices },
    { label: "Contacts", value: stats.totalContacts },
    { label: "Newsletters", value: stats.totalSubscriptions },
    { label: "Leads", value: stats.totalLeads ?? 0 },
    { label: "Appointments", value: stats.totalAppointments ?? 0 },
    { label: "Chats", value: stats.totalChats ?? 0 },
    { label: "Invoices", value: stats.totalInvoices ?? 0 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{c.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
