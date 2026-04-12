import { redirect } from "next/navigation";
import { AdminConsole } from "@/components/admin/control-panel";
import { getServerSessionUser } from "@/lib/server-session";

export default async function AdminDashboardPage() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login?from=/admin");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return <AdminConsole />;
}
