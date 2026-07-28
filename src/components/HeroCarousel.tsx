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
      className="relative h-[100vh] min-h-[600px] overflow-hidden bg-primary-dark"
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

      {/* Gradient — dark on left for text, transparent right to show photo */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* Text content — left aligned, clean hierarchy */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl">
            {/* Micro label — pill badge */}
            <div
              key={`label-${current}`}
              className="mb-5 animate-fade-up"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {slide.microLabel}
              </span>
            </div>

            {/* Main title — huge, tight, white with strong shadow */}
            <h1
              key={`title-${current}`}
              className="animate-fade-up text-5xl font-black leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              style={{
                animationDelay: '0.1s',
                textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 4px 30px rgba(0,0,0,0.4), 0 0 60px rgba(0,0,0,0.2)',
              }}
            >
              {slide.title}
            </h1>

            {/* Subtitle — clear, readable */}
            <p
              key={`sub-${current}`}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/95 sm:text-lg animate-fade-up"
              style={{
                animationDelay: '0.2s',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}
            >
              {slide.subtitle}
            </p>

            {/* CTA buttons */}
            <div
              className="mt-10 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="/donate"
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-accent-light hover:shadow-2xl hover:-translate-y-0.5"
              >
                Donate Now
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/60"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots indicator — centered bottom */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2.5 rounded-full bg-black/40 backdrop-blur-md px-4 py-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow navigation — desktop only */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-3 text-white/90 transition-all hover:bg-black/60 hover:text-white md:block"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-md p-3 text-white/90 transition-all hover:bg-black/60 hover:text-white md:block"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:block">
        <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white/80 tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
