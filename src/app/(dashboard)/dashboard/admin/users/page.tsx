import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Users",
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-50 text-purple-700",
  VOLUNTEER: "bg-blue-50 text-blue-700",
  DONOR: "bg-green-50 text-green-700",
  USER: "bg-gray-50 text-gray-700",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const roleCounts = users.reduce(
    (acc, u) => {
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

      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  User
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Role
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, i) => {
                const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown";
                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <tr key={user.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          roleColors[user.role] || "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
