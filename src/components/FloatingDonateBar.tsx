'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FloatingDonateBar() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector('header');
      if (!headerEl) return;

      const headerBottom = headerEl.getBoundingClientRect().bottom;
      const shouldShow = headerBottom < 0;

      if (shouldShow !== visible) {
        setVisible(shouldShow);
      }

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalScroll) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="glass-dark border-t border-white/10 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">
              Goal Progress
            </span>
            <div className="relative h-2 w-48 overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all duration-300"
                style={{ width: `${Math.max(scrollProgress, 12)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-accent">
              {Math.round(scrollProgress)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="btn-primary text-sm !px-6 !py-2.5"
            >
              Donate Now
              <svg className="btn-arrow h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
