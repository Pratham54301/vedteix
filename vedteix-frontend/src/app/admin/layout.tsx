'use client';

import { Suspense } from "react";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background md:flex">
      <Suspense fallback={<div className="w-full border-b bg-card px-4 py-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-8" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
