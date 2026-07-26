import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardMobileNav from "@/components/DashboardMobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-shrink-0 border-r bg-gray-50 md:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            GAD Dashboard
          </Link>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          <Link
            href="/dashboard"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/donations"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
          >
            My Donations
          </Link>
          {isAdmin && (
            <>
              <div className="my-3 border-t" />
              <p className="px-3 py-1 text-xs font-semibold uppercase text-muted">
                Admin
              </p>
              <Link
                href="/dashboard/admin/messages"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
              >
                Messages
              </Link>
              <Link
                href="/dashboard/admin/users"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
              >
                Users
              </Link>
            </>
          )}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav userName={session.user.name ?? ""} isAdmin={isAdmin} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
