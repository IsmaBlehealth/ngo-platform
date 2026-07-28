import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import DonationsList from "./DonationsList";

export const metadata = {
  title: "My Donations",
};

export default async function DonationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const donations = await prisma.donation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const totalDonated = donations
    .filter((d) => d.status === "COMPLETED")
    .reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Total Contributed</p>
            <p className="text-3xl font-bold text-primary">
              ${totalDonated.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-primary">My Donations</h1>

      {donations.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary">No donations yet</h3>
          <p className="mt-2 text-sm text-muted max-w-sm mx-auto">
            Your generosity can change lives. Every donation helps provide clean water, education, and healthcare.
          </p>
          <Link
            href="/donate"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
          >
            Make Your First Donation
          </Link>
        </div>
      ) : (
        <DonationsList donations={donations} />
      )}
    </div>
  );
}
