import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  const userId = session?.user?.id;

  const totalDonations = userId
    ? await prisma.donation.aggregate({
        where: { userId },
        _sum: { amount: true },
        _count: true,
      })
    : null;

  const activeSponsorships = userId
    ? await prisma.sponsorship.count({
        where: { userId, status: "ACTIVE" },
      })
    : 0;

  const donationCount = totalDonations?._count ?? 0;
  const donationSum = totalDonations?._sum.amount ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome, {session?.user?.name || "User"}
      </h1>
      <p className="mt-2 text-muted">
        This is your dashboard. From here you can manage your donations and account.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="text-sm font-semibold text-muted">Total Donations</h3>
          <p className="mt-2 text-2xl font-bold text-primary">
            {donationCount > 0 ? `$${Number(donationSum).toLocaleString("en-US", { minimumFractionDigits: 0 })}` : "$0"}
          </p>
          {donationCount > 0 && (
            <p className="text-xs text-muted mt-1">{donationCount} donation{donationCount !== 1 ? "s" : ""}</p>
          )}
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-sm font-semibold text-muted">Active Sponsorships</h3>
          <p className="mt-2 text-2xl font-bold text-primary">{activeSponsorships}</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-sm font-semibold text-muted">Account Status</h3>
          <p className="mt-2 text-2xl font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
}
