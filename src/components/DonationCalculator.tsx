"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const presets = [
  { amount: 10, impact: "Provides school supplies for 2 students for a full semester" },
  { amount: 25, impact: "Funds clean water access for a family for 6 months" },
  { amount: 50, impact: "Covers healthcare visits for 5 community members" },
  { amount: 100, impact: "Sponsors a student's full year of education including materials" },
  { amount: 250, impact: "Funds construction materials for a classroom desk and bench set" },
];

const baseRate = 10;
const baseImpact = "Provides school supplies for 2 students for a full semester";

function getCustomImpact(amount: number): string {
  if (amount <= 0) return "Enter an amount to see your impact";
  if (amount < 15) return baseImpact;
  if (amount < 35) return "Funds clean water access for a family for 6 months";
  if (amount < 75) return "Covers healthcare visits for 5 community members";
  if (amount < 175) return "Sponsors a student's full year of education including materials";
  if (amount < 400) return "Funds construction materials for a classroom desk and bench set";
  const students = Math.round((amount / baseRate) * 2);
  return `Provides school supplies for ${students} students for a full semester`;
}

export default function DonationCalculator() {
  const [selected, setSelected] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [animating, setAnimating] = useState(false);

  const activeAmount = isCustom ? Number(customAmount) || 0 : selected;

  const impact = useMemo(() => {
    if (isCustom) return getCustomImpact(activeAmount);
    const preset = presets.find((p) => p.amount === selected);
    return preset?.impact ?? "";
  }, [isCustom, activeAmount, selected]);

  const handlePresetClick = (amount: number) => {
    setIsCustom(false);
    setCustomAmount("");
    setAnimating(true);
    setSelected(amount);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleCustomChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    setCustomAmount(cleaned);
    if (!isCustom) {
      setIsCustom(true);
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="liquid-glass-surface rounded-3xl p-8 md:p-10">
        <p className="micro-header text-accent mb-2 text-center">Donation Impact</p>
        <h3 className="text-2xl md:text-3xl font-black text-foreground text-center mb-8">
          See What Your Gift Can Do
        </h3>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {presets.map((p) => (
            <button
              key={p.amount}
              onClick={() => handlePresetClick(p.amount)}
              className={`rounded-xl py-3 px-4 text-sm font-bold transition-all duration-200 cursor-pointer ${
                !isCustom && selected === p.amount
                  ? "bg-accent text-white shadow-[0_4px_16px_rgba(255,127,57,0.3)] scale-105"
                  : "bg-white/40 text-foreground hover:bg-white/60 border border-primary/10"
              }`}
            >
              ${p.amount}
            </button>
          ))}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted">$</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Other"
              value={customAmount}
              onChange={(e) => handleCustomChange(e.target.value)}
              onFocus={() => setIsCustom(true)}
              className={`w-full rounded-xl py-3 pl-7 pr-3 text-sm font-bold transition-all duration-200 outline-none ${
                isCustom
                  ? "bg-accent/10 border-2 border-accent text-foreground"
                  : "bg-white/40 border border-primary/10 text-foreground hover:bg-white/60"
              }`}
            />
          </div>
        </div>

        <div
          className="rounded-2xl p-6 mb-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: "rgba(0,109,54,0.04)",
            border: "1px solid rgba(0,109,54,0.08)",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
          }}
        >
          <p className="text-center text-sm font-semibold text-muted mb-2">
            Your <span className="stat-number text-2xl font-black">${activeAmount}</span> donation
          </p>
          <p className="text-center text-base font-medium text-foreground leading-relaxed">
            {impact}
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/donate" className="btn-primary">
            Donate Now
            <svg
              className="btn-arrow h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
