import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardMobileNav from "@/components/DashboardMobileNav";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar
        userName={session.user.name ?? "User"}
        userEmail={session.user.email ?? ""}
        isAdmin={isAdmin}
      />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav userName={session.user.name ?? ""} isAdmin={isAdmin} />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
