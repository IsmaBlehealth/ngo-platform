"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollable(false);
        setProgress(0);
        return;
      }
      setScrollable(true);
      const scrolled = window.scrollY / docHeight;
      setProgress(Math.min(scrolled * 100, 100));
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!scrollable) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <div
        className="h-full transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #006d36 0%, #ff7f39 100%)",
        }}
      />
    </div>
  );
}
