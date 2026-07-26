import Link from "next/link";

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; provider?: string }>;
}) {
  const params = await searchParams;
  const provider = params.provider || "payment";

  const providerNames: Record<string, string> = {
    stripe: "Stripe",
    paypal: "PayPal",
  };

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-lg text-center">
        <div className="text-6xl">Thank You!</div>
        <h1 className="mt-6 text-3xl font-bold">Donation Successful</h1>
        <p className="mt-4 text-muted">
          Your generous contribution will help us build wells, schools, and
          clinics in communities across West Africa.
        </p>
        {providerNames[provider] && (
          <p className="mt-2 text-sm text-muted">
            Processed via {providerNames[provider]}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Back to Home
          </Link>
          <Link
            href="/donate"
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Donate Again
          </Link>
        </div>
      </div>
    </section>
  );
}
