"use client";

import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: "2010",
    title: "Mali Education Program",
    description:
      "Education sessions began in Sikasso, Mali, eventually reaching over 50 children across multiple villages.",
  },
  {
    year: "2011",
    title: "First School in Côte d'Ivoire",
    description:
      "Community members established the original school using clay and wood, serving 58 students.",
  },
  {
    year: "2014",
    title: "GAD Founded",
    description:
      "Dr. Keuleya Ruth Ble MD MPH founded Global Approach To Development as a 501(c)(3) nonprofit in Ontario, California.",
  },
  {
    year: "2015",
    title: "New Primary School Completed",
    description:
      "GAD completed a new primary school facility serving 332 students (166 girls, 166 boys) with a 99% passing rate.",
  },
  {
    year: "2016",
    title: "Secondary School Construction Begins",
    description:
      "GAD initiated construction of a middle and high school after discovering students had to travel 54 miles for secondary education.",
  },
  {
    year: "2019",
    title: "Secondary School Completed",
    description:
      "The new secondary school was completed, sparking enthusiasm among community members.",
  },
  {
    year: "Today",
    title: "Continuing Impact",
    description:
      "GAD continues to expand programs in clean water, education, and healthcare across West Africa.",
  },
];

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-accent/20 hidden md:block" />
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-accent/20 md:hidden" />

      <div className="space-y-12 md:space-y-16">
        {timelineData.map((item, index) => {
          const isVisible = visibleItems.has(index);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              data-index={index}
              className="relative flex items-center md:items-start"
            >
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div
                  className="w-4 h-4 rounded-full border-2 border-accent bg-surface transition-all duration-500"
                  style={{
                    transform: isVisible ? "scale(1)" : "scale(0)",
                    boxShadow: isVisible
                      ? "0 0 0 4px rgba(255,127,57,0.15), 0 0 20px rgba(255,127,57,0.1)"
                      : "none",
                  }}
                />
              </div>

              <div className="hidden md:grid md:grid-cols-2 md:gap-12 w-full">
                <div className={`${isLeft ? "pr-12" : "order-2 pl-12"}`}>
                  <div
                    className="liquid-glass-surface rounded-2xl p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0) translateX(0)"
                        : `translateY(30px) translateX(${isLeft ? "-20px" : "20px"})`,
                    }}
                  >
                    <span className="stat-number text-2xl font-black">{item.year}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </div>
                <div className={`${isLeft ? "order-2" : ""}`} />
              </div>

              <div className="md:hidden pl-14 w-full">
                <div
                  className="liquid-glass-surface rounded-2xl p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  }}
                >
                  <span className="stat-number text-xl font-black">{item.year}</span>
                  <h3 className="text-base font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
