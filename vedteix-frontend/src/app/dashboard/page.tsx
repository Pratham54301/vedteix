import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSessionUser } from "@/lib/server-session";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function DashboardPage() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login?from=/dashboard");
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Dashboard</p>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {user.role === "admin" && (
            <Button asChild>
              <Link href="/admin">Open Admin Panel</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/logout">Logout</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
            <CardDescription>Your session is active and backed by the server-side MongoDB session store.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Role:</span> {user.role}</p>
            <p><span className="font-medium text-foreground">Authentication:</span> Signed in</p>
            <p><span className="font-medium text-foreground">Profile sync:</span> Name, email, and profile image are loaded from the backend session.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Use the routes below to continue testing the authenticated user flow.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Page</Link>
            </Button>
            {user.role === "admin" && (
              <Button asChild variant="outline">
                <Link href="/admin?tab=overview">Admin Overview</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
