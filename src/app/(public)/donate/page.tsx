"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import DonationCalculator from "@/components/DonationCalculator";

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
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState<"ONE_TIME" | "MONTHLY">("ONE_TIME");
  const [provider, setProvider] = useState<Provider>("stripe");
  const [availableProviders, setAvailableProviders] = useState<Provider[]>(["stripe"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken));

    fetch("/api/payments/providers")
      .then((r) => r.json())
      .then((d) => {
        const providers = (d.available as Provider[]) || ["stripe"];
        setAvailableProviders(providers);
        if (!providers.includes(provider)) {
          setProvider(providers[0] || "stripe");
        }
      })
      .catch(() => {
        setAvailableProviders(["stripe"]);
      });
  }, [provider]);

  const finalAmount = isCustom ? Number(customAmount) * 100 : amount * 100;

  const handleCalculatorChange = useCallback(
    (newAmount: number, newIsCustom: boolean, newCustomAmount: string) => {
      setIsCustom(newIsCustom);
      if (newIsCustom) {
        setCustomAmount(newCustomAmount);
      } else {
        setAmount(newAmount);
        setCustomAmount("");
      }
    },
    []
  );

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!finalAmount || finalAmount < 100 || honeypot) {
      setError("Please enter a valid donation amount of at least $1.");
      return;
    }

    if (!availableProviders.includes(provider)) {
      setError("Selected payment provider is not available.");
      return;
    }

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
        setError(data.error || "Failed to create checkout session. Please try again.");
      }
    } catch {
      setError("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const providerLabel = provider === "stripe" ? "Credit/Debit Card" : "PayPal";
  const canSubmit = finalAmount >= 100 && !honeypot;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }}
      />
      {/* Hero — liquid glass */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/intro-images/scrolling-9.jpg"
            alt="Make a difference"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div
          className="absolute left-0 top-0 h-full w-full md:w-[55%] z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,30,15,0.75) 0%, rgba(0,50,25,0.55) 50%, rgba(0,30,15,0.1) 85%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-20">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: "rgba(0,42,21,0.4)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.12)",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Support Our Mission
          </span>
          <h1
            className="text-4xl font-bold text-white sm:text-5xl"
            style={{
              textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7)",
            }}
          >
            Make a Donation
          </h1>
          <p
            className="mt-4 mx-auto max-w-2xl text-lg text-white/90"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
          >
            Every donation helps us build wells, schools, and clinics. 100% of
            your donation goes directly to our programs.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Donate" }]} />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <DonationCalculator
            externalAmount={amount}
            externalIsCustom={isCustom}
            externalCustomAmount={customAmount}
            onAmountChange={handleCalculatorChange}
          />
        </div>
      </section>

      {/* Donation Form */}
      <section id="donation-form" className="section-padding scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form
                onSubmit={handleDonate}
                className="rounded-2xl liquid-glass-surface p-8 shadow-lg"
              >
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    opacity: 0,
                    height: 0,
                    width: 0,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="donate-website">Leave this empty</label>
                  <input
                    id="donate-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Donation Type */}
                <fieldset className="mb-6">
                  <legend className="sr-only">Donation frequency</legend>
                  <div className="flex rounded-xl border overflow-hidden">
                    <label
                      className={`flex-1 cursor-pointer py-3.5 text-sm font-semibold text-center transition-colors ${
                        donationType === "ONE_TIME"
                          ? "bg-primary text-white"
                          : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="donationType"
                        value="ONE_TIME"
                        checked={donationType === "ONE_TIME"}
                        onChange={() => setDonationType("ONE_TIME")}
                        className="sr-only"
                      />
                      One-Time Donation
                    </label>
                    <label
                      className={`flex-1 cursor-pointer py-3.5 text-sm font-semibold text-center transition-colors ${
                        donationType === "MONTHLY"
                          ? "bg-primary text-white"
                          : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="donationType"
                        value="MONTHLY"
                        checked={donationType === "MONTHLY"}
                        onChange={() => setDonationType("MONTHLY")}
                        className="sr-only"
                      />
                      Monthly Giving
                    </label>
                  </div>
                </fieldset>

                {/* Preset Amounts */}
                <fieldset className="mb-4">
                  <legend className="text-sm font-semibold text-foreground/80 mb-3">
                    Donation Amount
                  </legend>
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((a) => (
                      <label
                        key={a}
                        className={`cursor-pointer rounded-xl border-2 py-4 text-base font-bold text-center transition-all ${
                          amount === a && !isCustom
                            ? "border-accent bg-accent text-white shadow-md scale-105"
                            : "border-primary/10 text-foreground/70 hover:border-accent hover:text-accent"
                        }`}
                      >
                        <input
                          type="radio"
                          name="amount"
                          value={a}
                          checked={amount === a && !isCustom}
                          onChange={() => {
                            setAmount(a);
                            setIsCustom(false);
                            setCustomAmount("");
                          }}
                          className="sr-only"
                        />
                        {formatCurrency(a * 100)}
                      </label>
                    ))}
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-bold text-muted">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Other"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setIsCustom(true);
                        }}
                        onFocus={() => setIsCustom(true)}
                        className={`w-full rounded-xl border-2 border-primary/10 pl-7 pr-3 py-4 text-base font-bold text-center focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all ${
                          isCustom
                            ? "border-accent bg-accent/5 text-foreground"
                            : "text-foreground"
                        }`}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Payment Method */}
                <fieldset className="mb-6">
                  <legend className="block text-sm font-semibold text-foreground/80 mb-3">
                    Payment Method
                  </legend>
                  <div className="flex rounded-xl border overflow-hidden">
                    <label
                      className={`flex-1 cursor-pointer py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        provider === "stripe"
                          ? "bg-primary text-white"
                          : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="provider"
                        value="stripe"
                        checked={provider === "stripe"}
                        onChange={() => setProvider("stripe")}
                        className="sr-only"
                        disabled={!availableProviders.includes("stripe")}
                      />
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                      </svg>
                      Card
                    </label>
                    {availableProviders.includes("paypal") && (
                      <label
                        className={`flex-1 cursor-pointer py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                          provider === "paypal"
                            ? "bg-[#0070ba] text-white"
                            : "bg-[#FAF9F6] text-muted hover:bg-[#f1f4f9]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="provider"
                          value="paypal"
                          checked={provider === "paypal"}
                          onChange={() => setProvider("paypal")}
                          className="sr-only"
                        />
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                        </svg>
                        PayPal
                      </label>
                    )}
                  </div>
                  {!availableProviders.includes("paypal") && (
                    <p className="mt-2 text-xs text-muted">
                      PayPal donations are currently unavailable. Card payments are securely processed by Stripe.
                    </p>
                  )}
                </fieldset>

                {error && (
                  <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !canSubmit}
                  className="w-full rounded-full bg-accent py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-accent-light hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Redirecting to {providerLabel}...
                    </span>
                  ) : (
                    `Donate ${formatCurrency(finalAmount)} via ${providerLabel}`
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-muted">
                  {provider === "stripe"
                    ? "Secure payment powered by Stripe. We never store your card details."
                    : "Secure payment powered by PayPal. You'll be redirected to complete payment."}
                </p>
              </form>
            </div>

            {/* Impact Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-primary p-6 text-white">
                <h3 className="text-lg font-bold">Your Impact</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-light">water_drop</span>
                    <div>
                      <p className="font-semibold">$25</p>
                      <p className="text-sm text-white/70">Provides clean water for one person for a year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-light">menu_book</span>
                    <div>
                      <p className="font-semibold">$50</p>
                      <p className="text-sm text-white/70">Supplies school materials for one student</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-light">favorite</span>
                    <div>
                      <p className="font-semibold">$100</p>
                      <p className="text-sm text-white/70">Funds a medical checkup for a family</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-light">school</span>
                    <div>
                      <p className="font-semibold">$250</p>
                      <p className="text-sm text-white/70">Supports a child&apos;s full school year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-light">public</span>
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
                  Every dollar you donate goes directly to our programs. No
                  administrative overhead. Global Approach To Development is a
                  501(c)(3) organization. Your donation is tax-deductible.
                </p>
                <p className="mt-2 text-xs text-muted">EIN: 47-2155496</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
