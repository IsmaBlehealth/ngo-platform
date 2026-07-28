"use client";

import { Pagination, usePagination } from "@/components/Pagination";

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-50 text-purple-700",
  VOLUNTEER: "bg-blue-50 text-blue-700",
  DONOR: "bg-green-50 text-green-700",
  USER: "bg-gray-50 text-gray-700",
};

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export default function UsersList({ users }: { users: User[] }) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(users);

  return (
    <>
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
              {paginatedItems.map((user, i) => {
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
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
