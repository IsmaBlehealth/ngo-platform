"use client";

import { useState } from "react";

const defaultItems = [
  {
    question: "What is Global Approach To Development?",
    answer:
      "GAD is a 501(c)(3) non-profit organization founded in 2014 to improve the lives of underserved, low-income, and minority populations through education, clean water, and healthcare programs.",
  },
  {
    question: "How can I donate?",
    answer:
      "You can donate through our Donate page. 100% of your donation goes directly to our programs. We accept one-time and monthly donations via PayPal.",
  },
  {
    question: "Where does GAD operate?",
    answer:
      "GAD operates in Côte d'Ivoire, Mali, and is headquartered in Ontario, California. Our programs reach communities across West Africa.",
  },
  {
    question: "How is my donation used?",
    answer:
      "Your donation funds clean water infrastructure, school construction and supplies, healthcare services, and community empowerment programs. We maintain full transparency of all funds.",
  },
  {
    question: "Can I volunteer?",
    answer:
      "Yes! We welcome volunteers for various roles. Contact us through our Contact page to learn about current volunteer opportunities.",
  },
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Yes. GAD is a registered 501(c)(3) organization (EIN: 47-2155496). All donations are tax-deductible to the extent allowed by law.",
  },
];

interface FAQAccordionProps {
  items?: Array<{ question: string; answer: string }>;
}

export default function FAQAccordion({ items = defaultItems }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="liquid-glass-surface rounded-2xl overflow-hidden transition-shadow duration-300"
            style={{
              boxShadow: isOpen
                ? "0 10px 40px -10px rgba(0,109,54,0.15)"
                : "0 4px 16px rgba(0,0,0,0.04)",
            }}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/20 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-foreground">{item.question}</span>
              <svg
                className="h-5 w-5 shrink-0 text-accent transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className="transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
              style={{ maxHeight: isOpen ? "500px" : "0px" }}
            >
              <div className="px-6 pb-5 text-sm leading-relaxed text-muted">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
