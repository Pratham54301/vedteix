"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const BACKEND_AUTH_BASE =
  (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001").replace(/\/$/, "");

function getAuthErrorMessage(
  t: (key: string) => string,
  errorCode: string | null
) {
  switch (errorCode) {
    case "google_not_configured":
      return t("login.errors.google_not_configured");
    case "google_failed":
      return t("login.errors.google_failed");
    case "google_callback_failed":
      return t("login.errors.google_callback_failed");
    case "google_session_failed":
      return t("login.errors.google_session_failed");
    case "logout_failed":
      return t("login.errors.logout_failed");
    default:
      return null;
  }
}

function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestedPath = searchParams.get("from") || "/dashboard";
  const activeError = error || getAuthErrorMessage(t, searchParams.get("error"));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, returnTo: requestedPath }),
      });
      const data = await res.json().catch(() => ({ error: t("login.invalidCredentials") }));
      if (res.ok) {
        router.push(data.returnTo || requestedPath || "/dashboard");
        router.refresh();
      } else {
        const msg = data.error || t("login.invalidCredentials");
        setError(msg);
        toast({ title: t("login.failedTitle"), description: msg, variant: "destructive" });
      }
    } catch {
      setError(t("login.networkError"));
      toast({
        title: t("login.failedTitle"),
        description: t("login.networkError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    setGoogleLoading(true);
    const target = `${BACKEND_AUTH_BASE}/auth/google?from=${encodeURIComponent(requestedPath)}`;
    window.location.assign(target);
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
          <CardDescription>{t("login.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {activeError && <Alert variant="destructive">{activeError}</Alert>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("login.email")}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t("login.password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading || googleLoading}>
              {loading ? t("login.submitting") : t("login.submit")}
            </Button>
          </form>
          <div className="my-4 text-center text-sm text-muted-foreground">{t("login.or")}</div>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading || googleLoading}>
            {googleLoading ? t("login.googleRedirect") : t("login.google")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 text-muted-foreground">
          {t("login.loadingPage")}
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
