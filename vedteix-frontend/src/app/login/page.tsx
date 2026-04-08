"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const BACKEND_AUTH_BASE =
  (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001").replace(/\/$/, "");

function getAuthErrorMessage(errorCode: string | null) {
  switch (errorCode) {
    case "google_not_configured":
      return "Google sign-in is not configured yet.";
    case "google_failed":
      return "Google sign-in was cancelled or could not be completed.";
    case "google_callback_failed":
      return "Google sign-in returned an unexpected response.";
    case "google_session_failed":
      return "Google sign-in succeeded, but the session could not be created.";
    case "logout_failed":
      return "Logout could not be completed cleanly.";
    default:
      return null;
  }
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestedPath = searchParams.get("from") || "/dashboard";
  const activeError = error || getAuthErrorMessage(searchParams.get("error"));

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
      const data = await res.json().catch(() => ({ error: "Invalid credentials" }));
      if (res.ok) {
        router.push(data.returnTo || requestedPath || "/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials");
        toast({ title: "Login failed", description: data.error || "Invalid credentials", variant: "destructive" });
      }
    } catch (requestError) {
      setError("Unable to reach the authentication service.");
      toast({
        title: "Login failed",
        description: "Unable to reach the authentication service.",
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
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Use your account password or continue with Google to open your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          {activeError && <Alert variant="destructive">{activeError}</Alert>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading || googleLoading}>{loading ? "Signing in..." : "Continue with password"}</Button>
          </form>
          <div className="my-4 text-center text-sm text-muted-foreground">or</div>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading || googleLoading}>
            {googleLoading ? "Redirecting to Google..." : "Login with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 text-muted-foreground">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
