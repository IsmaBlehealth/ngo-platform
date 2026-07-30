import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UsersList from "./UsersList";

export const metadata = {
  title: "Users",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, firstName: true, lastName: true, email: true, role: true, createdAt: true },
  });

  const roleCounts = users.reduce(
    (acc: Record<string, number>, u: { role: string }) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Users</h1>
          <p className="mt-1 text-sm text-muted">All registered users.</p>
        </div>
        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
          {users.length} total
        </span>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(roleCounts).map(([role, count]) => (
          <div key={role} className="rounded-2xl bg-white p-4 shadow-lg text-center">
            <p className="text-2xl font-bold text-primary">{count}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mt-1">{role}</p>
          </div>
        ))}
      </div>

      <UsersList users={users} />
    </div>
  );
}
