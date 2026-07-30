"use client";

import { useState, useEffect } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  useEffect(() => {
    fetch("/api/csrf").then((r) => r.json()).then((d) => setCsrfToken(d.csrfToken));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
        body: JSON.stringify({ email, website: honeypot }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data.message === "Already subscribed" ? "already" : "success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}>
        <label htmlFor="newsletter-website">Leave this empty</label>
        <input id="newsletter-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "success" && <p className="text-green-400 text-sm">Thank you for subscribing!</p>}
      {status === "already" && <p className="text-yellow-400 text-sm">You&apos;re already subscribed!</p>}
      {status === "error" && <p className="text-red-400 text-sm">Failed to subscribe. Please try again.</p>}
    </form>
  );
}
