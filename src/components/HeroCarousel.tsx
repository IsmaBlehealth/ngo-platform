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

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 to-transparent z-10" />

      {/* Text content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="micro-header text-accent mb-4 animate-fade-up">
              {slide.microLabel}
            </p>
            <h1
              key={`title-${current}`}
              className="text-tight text-5xl font-black leading-tight text-white sm:text-7xl lg:text-8xl animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {slide.title}
            </h1>
            <p
              key={`sub-${current}`}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {slide.subtitle}
            </p>
            <div
              className="mt-10 flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/donate" className="btn-primary">
                Donate Now
                <svg
                  className="btn-arrow h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link href="/about" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrow navigation — desktop only */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full glass p-3 text-white/80 transition-all hover:bg-white/20 hover:text-white md:block"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full glass p-3 text-white/80 transition-all hover:bg-white/20 hover:text-white md:block"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

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
