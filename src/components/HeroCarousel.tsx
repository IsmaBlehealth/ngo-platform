'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroSlides } from '@/data/hero-images';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* All slides rendered, visibility controlled by opacity */}
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
              animation: i === current ? 'kenBurns 8s ease-out forwards' : 'none',
              transformOrigin: 'center center',
            }}
          />
        </div>
      ))}

      {/* Overlays — Stitch style */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* Arrow navigation — Stitch style */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-lg"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-lg"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Text content — Stitch style */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 mt-16">
        <div className="max-w-[680px]">
          {/* Micro label — pill badge */}
          <div key={`label-${current}`} className="animate-fade-up mb-6">
            <span className="inline-flex items-center gap-2 bg-accent text-white px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">{slide.microLabel}</span>
            </span>
          </div>

          {/* Main title — huge, Montserrat-style heavy */}
          <h1
            key={`title-${current}`}
            className="animate-fade-up text-4xl md:text-7xl lg:text-[72px] font-black text-white leading-[1.1] tracking-tight mb-6"
            style={{
              animationDelay: '0.1s',
              textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${current}`}
            className="animate-fade-up text-lg text-white/95 mb-10 max-w-xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            {slide.subtitle}
          </p>

          {/* CTA buttons — Stitch style with glow */}
          <div className="animate-fade-up flex flex-wrap items-center gap-4" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/donate"
              className="group flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(232,168,56,0.3)] hover:shadow-[0_0_30px_rgba(232,168,56,0.5)] hover:-translate-y-1 transition-all"
            >
              Donate Now
              <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center px-8 py-4 rounded-full font-medium text-white border border-white/30 bg-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-white/50 transition-all shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom controls — Stitch style */}
      <div className="absolute bottom-12 left-0 w-full z-20 px-6 md:px-10 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <div className="hidden md:block w-32" />

          {/* Dot indicators — Stitch style */}
          <div className="pointer-events-auto flex items-center gap-2 bg-white/5 backdrop-blur-3xl px-4 py-2 rounded-full border border-white/10 shadow-lg">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Slide counter — Stitch style */}
          <div className="hidden md:flex pointer-events-auto items-center justify-center bg-white/5 backdrop-blur-3xl px-4 py-2 rounded-full border border-white/10 w-32 shadow-lg">
            <span className="text-sm text-white/90 font-medium tracking-wider tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Wave divider — Stitch organic SVG */}
      <div className="absolute bottom-0 left-0 w-full z-30 overflow-hidden leading-none pointer-events-none">
        <svg className="w-full h-12 md:h-24 fill-white" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,111.47,192.5,91.8,235.6,77.92,279.7,64.18,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
