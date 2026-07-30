"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) {
          setProgress(0);
          return;
        }
        setProgress(Math.min(Math.round((window.scrollY / docHeight) * 100), 100));
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed bottom-20 right-6 z-40 flex h-10 w-10 items-center justify-center"
      style={{
        background: "rgba(250, 249, 246, 0.65)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderRadius: "50%",
        border: "0.5px solid rgba(0, 109, 54, 0.06)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.04)",
      }}
    >
      <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="rgba(110, 122, 110, 0.15)"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="#ff7f39"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-100"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-foreground">
        {progress}%
      </span>
    </div>
  );
}
