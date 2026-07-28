"use client";

import { Pagination, usePagination } from "@/components/Pagination";

interface Donation {
  id: string;
  amount: string | number | { toString(): string };
  type: string;
  provider: string;
  status: string;
  createdAt: Date;
}

export default function DonationsList({ donations }: { donations: Donation[] }) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(donations);

  return (
    <>
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Date
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Amount
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Type
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Method
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedItems.map((donation, i) => (
                <tr key={donation.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {new Date(donation.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-primary">
                    ${Number(donation.amount).toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground/70">
                    {donation.type === "ONE_TIME" ? "One-Time" : "Monthly"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-foreground/70">
                    {donation.provider}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        donation.status === "COMPLETED"
                          ? "bg-green-50 text-green-700"
                          : donation.status === "PENDING"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          donation.status === "COMPLETED"
                            ? "bg-green-500"
                            : donation.status === "PENDING"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
