"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

const CONTACT_URL = "https://ngo-platform-399q.vercel.app/contact";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Global Approach To Development",
  description:
    "Get in touch with Global Approach To Development. Reach us by phone, email, or visit our office in Ontario, CA.",
  url: CONTACT_URL,
  mainEntity: {
    "@type": "Organization",
    name: "Global Approach To Development",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-909-728-8111",
      email: "info@gapdev.org",
      contactType: "customer service",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3200 E Guasti Rd., Suite 100",
        addressLocality: "Ontario",
        addressRegion: "CA",
        postalCode: "91761",
        addressCountry: "US",
      },
    },
  },
};

const infoCards = [
  {
    icon: "location_on",
    title: "Our Office",
    lines: ["3200 E Guasti Rd., Suite 100", "Ontario, CA 91761"],
  },
  {
    icon: "call",
    title: "Call Us",
    lines: ["909-728-8111"],
  },
  {
    icon: "mail",
    title: "Email Us",
    lines: ["info@gapdev.org"],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("/api/csrf")
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken));
  }, []);

  function handleChange(field: string, value: string | boolean) {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: [] });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
          consent: false,
        });
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors || {});
        setStatus("error");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Hero — liquid glass cinematic */}
      <header className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/old-site/intro-images/scrolling-1.jpg"
            alt="Contact us"
            fill
            className="object-cover ken-burns"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        <div
          className="absolute left-0 top-0 h-full w-full md:w-[60%] z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,30,15,0.42) 0%, rgba(0,50,25,0.18) 55%, transparent 100%)",
            backdropFilter: "blur(2px)",
          }}
        />
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-[680px]">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.16)",
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
              }}
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(255,127,57,0.6)]" />
              Get In Touch
            </span>
            <h1
              className="text-5xl md:text-7xl font-black text-white"
              style={{
                textShadow:
                  "0 4px 24px rgba(0,0,0,0.65), 0 1px 8px rgba(0,0,0,0.45)",
              }}
            >
              Contact Us
            </h1>
            <p
              className="mt-4 text-lg text-white/90"
              style={{
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)",
              }}
            >
              We would love to hear from you…why not get in touch?
            </p>
          </div>
        </div>
      </header>

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

      {/* Main Content — overlapping the hero */}
      <main className="relative z-20 -mt-12 md:-mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 pb-24">
        {/* Info Cards — liquid glass premium */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, idx) => (
            <div
              key={card.title}
              className="relative overflow-hidden rounded-2xl p-6 md:p-8 flex flex-col items-center text-center card-depth-hover group"
              style={{
                animationDelay: `${idx * 0.1}s`,
                background:
                  "linear-gradient(135deg, rgba(250,249,246,0.92) 0%, rgba(255,255,255,0.88) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.40)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.04] to-transparent" />
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 flex items-center justify-center border border-accent/10 group-hover:border-accent/25 group-hover:scale-110 transition-all duration-500">
                  {card.icon === "location_on" && (
                    <svg
                      className="w-5 h-5 text-accent drop-shadow-sm"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  {card.icon === "call" && (
                    <svg
                      className="w-5 h-5 text-accent drop-shadow-sm"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  {card.icon === "mail" && (
                    <svg
                      className="w-5 h-5 text-accent drop-shadow-sm"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="micro-header text-accent mb-2 group-hover:tracking-[0.22em] transition-all duration-300">
                {card.title}
              </span>
              <div className="text-foreground font-semibold leading-relaxed text-base">
                {card.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < card.lines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Contact Form — bento-card with dot pattern */}
        <section>
          <div className="bento-card bg-[#FAF9F6] relative overflow-hidden rounded-[2rem] p-8 md:p-12 lg:p-16">
            {/* Decorative dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #0D5C63 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-primary font-[family-name:var(--font-montserrat)] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted">
                  Complete the form below, and we&apos;ll be in touch promptly. We
                  promise to respond within 24 hours.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
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
                  <label htmlFor="website">Leave this empty</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                  />
                </div>

                {/* Left: Form fields */}
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      aria-describedby={
                        errors.name?.length ? "name-error" : undefined
                      }
                      aria-invalid={errors.name?.length ? "true" : undefined}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                      placeholder="John Doe"
                    />
                    {errors.name?.length > 0 && (
                      <p id="name-error" className="mt-1 text-xs text-red-600">
                        {errors.name[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      aria-describedby={
                        errors.email?.length ? "email-error" : undefined
                      }
                      aria-invalid={errors.email?.length ? "true" : undefined}
                      className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.email?.length > 0 && (
                      <p id="email-error" className="mt-1 text-xs text-red-600">
                        {errors.email[0]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-2"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          handleChange("phone", e.target.value)
                        }
                        className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-2"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={(e) =>
                          handleChange("subject", e.target.value)
                        }
                        className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none appearance-none"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      id="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) =>
                        handleChange("consent", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="consent" className="text-xs text-muted">
                      I consent to the collection and processing of my personal
                      information. This is for the purpose of evaluating or
                      fulfilling my request, in accordance with the Privacy
                      Policy.
                    </label>
                  </div>
                </div>

                {/* Right: Message textarea + submit */}
                <div className="flex flex-col h-full">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) =>
                      handleChange("message", e.target.value)
                    }
                    aria-describedby={
                      errors.message?.length ? "message-error" : undefined
                    }
                    aria-invalid={
                      errors.message?.length ? "true" : undefined
                    }
                    className="w-full h-full min-h-[200px] bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-foreground focus:border-accent focus:ring-1 focus:ring-accent transition-colors outline-none resize-none mb-6"
                    placeholder="How can we help you?"
                  />
                  {errors.message?.length > 0 && (
                    <p id="message-error" className="mb-2 text-xs text-red-600">
                      {errors.message[0]}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="gold-button w-full bg-accent text-white font-bold text-base py-4 rounded-full flex items-center justify-center gap-2 group hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="mt-3 text-sm text-green-600 font-medium">
                      Message sent successfully! We&apos;ll respond within 24
                      hours.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="mt-3 text-sm text-red-600 font-medium">
                      {Object.keys(errors).length > 0
                        ? "Please fix the errors above and try again."
                        : "Failed to send message. Please try again."}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative rounded-2xl overflow-hidden h-[420px] md:h-[500px] border border-white/20 shadow-lg">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-117.62%2C34.04%2C-117.54%2C34.08&amp;layer=mapnik&amp;marker=34.06%2C-117.58"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "saturate(0.85) contrast(1.02)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office location"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm px-4">
            <div
              className="rounded-xl p-5 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(250,249,246,0.88) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.30)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              <p className="text-foreground mb-3 font-semibold text-sm">
                3200 E Guasti Rd., Suite 100
                <br />
                Ontario, CA 91761
              </p>
              <a
                href="https://maps.google.com/?q=3200+E+Guasti+Rd+Ontario+CA+91761"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:opacity-80 transition-opacity"
              >
                Get Directions
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
