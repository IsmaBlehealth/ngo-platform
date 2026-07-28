"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
