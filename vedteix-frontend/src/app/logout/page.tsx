"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/logout", { method: "POST", credentials: "include" }).then(() => {
      router.replace("/");
      router.refresh();
    });
  }, [router]);
  return <div className="container py-16 text-center text-muted-foreground">Signing you out...</div>;
} 
