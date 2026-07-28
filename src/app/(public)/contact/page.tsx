"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Global Approach To Development",
  description:
    "Get in touch with Global Approach To Development. Reach us by phone, email, or visit our office in Ontario, CA.",
  url: typeof window !== "undefined" ? window.location.origin + "/contact" : "",
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
    fetch("/api/csrf").then((r) => r.json()).then((d) => setCsrfToken(d.csrfToken));
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
        setForm({ name: "", email: "", phone: "", subject: "", message: "", website: "", consent: false });
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
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
            alt="Contact us"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We would love to hear from you. Let&apos;s start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-primary">Call Us</h3>
              <p className="mt-1 text-sm text-muted">(909) 728-8111</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-primary">Email Us</h3>
              <p className="mt-1 text-sm text-muted">info@gapdev.org</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-primary">Find Us</h3>
              <p className="mt-1 text-sm text-muted">3200 E. Guasti Rd, Suite 100<br />Ontario, CA 91761</p>
            </div>
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
                <p className="mt-2 text-sm text-muted">
                  Complete the form below and we&apos;ll respond within 24 hours.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80">Name *</label>
                      <input
                        id="name"
                        required
                        aria-describedby={errors.name?.length ? "name-error" : undefined}
                        aria-invalid={errors.name?.length ? "true" : undefined}
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.name && errors.name.length > 0 && (
                        <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name[0]}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/80">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        aria-describedby={errors.email?.length ? "email-error" : undefined}
                        aria-invalid={errors.email?.length ? "true" : undefined}
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      {errors.email && errors.email.length > 0 && (
                        <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email[0]}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground/80">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground/80">Subject</label>
                      <input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80">Message *</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      aria-describedby={errors.message?.length ? "message-error" : undefined}
                      aria-invalid={errors.message?.length ? "true" : undefined}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.message && errors.message.length > 0 && (
                      <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message[0]}</p>
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      id="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="consent" className="text-xs text-muted">
                      I consent to the collection and processing of my personal information. This is for the purpose of evaluating or fulfilling my request, in accordance with the Privacy Policy.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-light hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                  {status === "success" && (
                    <p className="text-sm text-green-600 font-medium">Message sent successfully! We&apos;ll respond within 24 hours.</p>
                  )}
                  {status === "error" && Object.keys(errors).length === 0 && (
                    <p className="text-sm text-red-600 font-medium">Failed to send message. Please try again.</p>
                  )}
                </form>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.5!2d-117.6!3d34.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzQyLjAiTiAxMTfCsDM2JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
