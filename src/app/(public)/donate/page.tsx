"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const amounts = [25, 50, 100, 250, 500];

const DONATE_URL = "https://ngo-platform-399q.vercel.app/donate";

const donateSchema = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  name: "Donate to Global Approach To Development",
  description:
    "Support clean water, education, and healthcare programs in West Africa. 100% of donations go directly to programs.",
  recipient: {
    "@type": "NGO",
    name: "Global Approach To Development",
    url: DONATE_URL,
  },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(cents: number): string {
  return currencyFormatter.format(cents / 100);
}

type Provider = "stripe" | "paypal";

export default function DonatePage() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState<"ONE_TIME" | "MONTHLY">("ONE_TIME");
  const [provider, setProvider] = useState<Provider>("stripe");
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    fetch("/api/csrf").then((r) => r.json()).then((d) => setCsrfToken(d.csrfToken));
  }, []);

  const finalAmount = customAmount ? parseInt(customAmount, 10) * 100 : amount * 100;

  async function handleDonate() {
    if (!finalAmount || finalAmount < 100 || honeypot) return;
    setLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          amount: finalAmount,
          type: donationType,
          provider,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session. Please try again.");
      }
    } catch {
      alert("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const providerLabel = provider === "stripe" ? "Credit/Debit Card" : "PayPal";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/intro-images/scrolling-9.jpg"
            alt="Make a difference"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Make a Donation</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-white/80">
            Every donation helps us build wells, schools, and clinics. 100% of your donation goes directly to our programs.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl liquid-glass-surface p-8 shadow-lg">
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}>
                  <label htmlFor="donate-website">Leave this empty</label>
                  <input id="donate-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                {/* Donation Type */}
                <div className="flex rounded-xl border overflow-hidden mb-6">
                  <button
                    onClick={() => setDonationType("ONE_TIME")}
                    className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                      donationType === "ONE_TIME"
                        ? "bg-primary text-white"
                        : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                    }`}
                  >
                    One-Time Donation
                  </button>
                  <button
                    onClick={() => setDonationType("MONTHLY")}
                    className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                      donationType === "MONTHLY"
                        ? "bg-primary text-white"
                        : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                    }`}
                  >
                    Monthly Giving
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => { setAmount(a); setCustomAmount(""); }}
                      className={`rounded-xl border-2 py-4 text-base font-bold transition-all ${
                        amount === a && !customAmount
                          ? "border-accent bg-accent text-white shadow-md scale-105"
                          : "border-primary/10 text-foreground/70 hover:border-accent hover:text-accent"
                      }`}
                    >
                      {formatCurrency(a * 100)}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    placeholder="Other"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="rounded-xl border-2 border-primary/10 px-3 py-4 text-base font-bold text-center focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground/80 mb-3">
                    Payment Method
                  </label>
                  <div className="flex rounded-xl border overflow-hidden">
                    <button
                      onClick={() => setProvider("stripe")}
                      className={`flex-1 py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        provider === "stripe"
                          ? "bg-primary text-white"
                          : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
                      </svg>
                      Card
                    </button>
                    <button
                      onClick={() => setProvider("paypal")}
                      className={`flex-1 py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        provider === "paypal"
                          ? "bg-[#0070ba] text-white"
                          : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
                      </svg>
                      PayPal
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleDonate}
                  disabled={loading || !finalAmount || finalAmount < 100}
                  className="w-full rounded-full bg-accent py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-accent-light hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading
                    ? `Redirecting to ${providerLabel}...`
                    : `Donate ${formatCurrency(finalAmount)} via ${providerLabel}`}
                </button>

                <p className="mt-4 text-center text-xs text-muted">
                  {provider === "stripe"
                    ? "Secure payment powered by Stripe. We never store your card details."
                    : "Secure payment powered by PayPal. You'll be redirected to complete payment."}
                </p>
              </div>
            </div>

            {/* Impact Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-primary p-6 text-white">
                <h3 className="text-lg font-bold">Your Impact</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💧</span>
                    <div>
                      <p className="font-semibold">$25</p>
                      <p className="text-sm text-white/70">Provides clean water for one person for a year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-semibold">$50</p>
                      <p className="text-sm text-white/70">Supplies school materials for one student</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏥</span>
                    <div>
                      <p className="font-semibold">$100</p>
                      <p className="text-sm text-white/70">Funds a medical checkup for a family</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏫</span>
                    <div>
                      <p className="font-semibold">$250</p>
                      <p className="text-sm text-white/70">{'Supports a child\'s full school year'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="font-semibold">$500</p>
                      <p className="text-sm text-white/70">Builds a water well for a village</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FAF9F6] p-6 border border-primary/10">
                <h3 className="text-lg font-bold text-primary">100% Goes to Programs</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Every dollar you donate goes directly to our programs. No administrative overhead.
                  Global Approach To Development is a 501(c)(3) organization. Your donation is tax-deductible.
                </p>
                <p className="mt-2 text-xs text-muted">
                  EIN: 47-2155496
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
