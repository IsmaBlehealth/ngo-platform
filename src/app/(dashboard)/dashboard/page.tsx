import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dashboard",
};

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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl hero-gradient p-8 text-white">
        <h1 className="text-3xl font-bold">
          Welcome back, {session?.user?.name || "User"}
        </h1>
        <p className="mt-2 text-white/70">
          Thank you for supporting our mission. Here&apos;s your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-lg card-hover">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted">Total Donations</p>
              <p className="text-2xl font-bold text-primary">
                {donationCount > 0
                  ? `$${Number(donationSum).toLocaleString("en-US", { minimumFractionDigits: 0 })}`
                  : "$0"}
              </p>
              {donationCount > 0 && (
                <p className="text-xs text-muted">
                  {donationCount} donation{donationCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg card-hover">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted">Active Sponsorships</p>
              <p className="text-2xl font-bold text-primary">{activeSponsorships}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-lg card-hover">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted">Account Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-primary">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            href="/donate"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Make a Donation
          </Link>
          <Link
            href="/dashboard/donations"
            className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Donation History
          </Link>
          <Link
            href="/programs"
            className="flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Our Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
