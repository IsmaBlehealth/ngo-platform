"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "Thanks to GAD's scholarship program, my daughter was the first in our family to complete primary school. She now dreams of becoming a teacher.",
    author: "Parent, Côte d'Ivoire",
  },
  {
    quote:
      "Before the well was built, I walked 3 hours every day for water. Now my children can go to school instead.",
    author: "Community member, Mali",
  },
  {
    quote:
      "The mobile health clinic saved my son's life. We had no hospital nearby, but GAD brought doctors to our village.",
    author: "Mother, Sikasso region",
  },
  {
    quote:
      "GAD didn't just build a school — they built hope for our entire community.",
    author: "Village elder, Côte d'Ivoire",
  },
  {
    quote:
      "Volunteering with GAD showed me the power of education to transform lives. Every child deserves this chance.",
    author: "Volunteer, USA",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isFading) return;
      setIsFading(true);
      setTimeout(() => {
        setCurrent(index);
        setIsFading(false);
      }, prefersReducedMotion ? 0 : 400);
    },
    [isFading, prefersReducedMotion]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, next]);

  const togglePause = () => setIsPaused((p) => !p);

  return (
    <div
      className="w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="liquid-glass-surface rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[280px] flex flex-col justify-between">
        <div className="absolute top-6 left-8 text-accent/15">
          <svg className="h-16 w-16 md:h-20 md:w-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        <div
          className="relative z-10 flex-1 flex flex-col justify-center transition-opacity duration-400"
          style={{ opacity: isFading ? 0 : 1 }}
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${current + 1} of ${testimonials.length}`}
        >
          <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-foreground mb-6 mt-8">
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {testimonials[current].author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {testimonials[current].author}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                index === current
                  ? "w-8 bg-accent"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
            />
          ))}
          <button
            onClick={togglePause}
            aria-label={isPaused ? "Play testimonials" : "Pause testimonials"}
            className="ml-2 flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-foreground hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {isPaused ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
