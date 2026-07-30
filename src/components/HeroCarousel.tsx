"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/data/hero-images";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { locale } = useLocale();

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slideKeys = [
    { title: "hero.slide1.title" as const, subtitle: "hero.slide1.subtitle" as const, label: "hero.slide1.label" as const },
    { title: "hero.slide2.title" as const, subtitle: "hero.slide2.subtitle" as const, label: "hero.slide2.label" as const },
    { title: "hero.slide3.title" as const, subtitle: "hero.slide3.subtitle" as const, label: "hero.slide3.label" as const },
    { title: "hero.slide4.title" as const, subtitle: "hero.slide4.subtitle" as const, label: "hero.slide4.label" as const },
    { title: "hero.slide5.title" as const, subtitle: "hero.slide5.subtitle" as const, label: "hero.slide5.label" as const },
    { title: "hero.slide6.title" as const, subtitle: "hero.slide6.subtitle" as const, label: "hero.slide6.label" as const },
    { title: "hero.slide7.title" as const, subtitle: "hero.slide7.subtitle" as const, label: "hero.slide7.label" as const },
  ];
  const slideTitleKey = slideKeys[current].title;
  const slideSubtitleKey = slideKeys[current].subtitle;
  const slideLabelKey = slideKeys[current].label;

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
            style={{
              animation: i === current ? "kenBurns 8s ease-out forwards" : "none",
              transformOrigin: "center center",
            }}
          />
        </div>
      ))}

      {/* Ultra-transparent gradient overlays for text legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      {/* Navigation arrows — liquid glass */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter: "blur(60px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
        }}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter: "blur(60px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
        }}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="max-w-[680px]">
          <div key={`label-${current}`} className="animate-fade-up mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {t(locale, slideLabelKey)}
            </span>
          </div>

          <h1
            key={`title-${current}`}
            className="animate-fade-up text-4xl md:text-7xl lg:text-[72px] font-black text-white leading-[1.1] tracking-tight mb-6"
            style={{
              animationDelay: "0.1s",
              textShadow: "0 4px 24px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {t(locale, slideTitleKey)}
          </h1>

          <p
            key={`sub-${current}`}
            className="animate-fade-up text-lg text-white/95 mb-10 max-w-xl leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            {t(locale, slideSubtitleKey)}
          </p>

          <div className="animate-fade-up flex flex-wrap items-center gap-4" style={{ animationDelay: "0.3s" }}>
            <Link href="/donate" className="btn-primary px-8 py-4">
              {t(locale, "hero.cta")}
              <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
              }}
            >
              {t(locale, "hero.learn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom controls — maximally transparent */}
      <div className="absolute bottom-12 left-0 w-full z-20 px-6 md:px-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <div className="hidden md:block w-32" />

          <div
            className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(60px)",
              WebkitBackdropFilter: "blur(60px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
            }}
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-accent"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div
            className="hidden md:flex pointer-events-auto items-center justify-center px-4 py-2 rounded-full w-32"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(60px)",
              WebkitBackdropFilter: "blur(60px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-sm text-white/90 font-medium tracking-wider tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full z-30 overflow-hidden leading-none pointer-events-none">
        <svg className="w-full h-12 md:h-24 fill-[#faf9f6]" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.5,91.8,235.6,77.92,279.7,64.18,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
