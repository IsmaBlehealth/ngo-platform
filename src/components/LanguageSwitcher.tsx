"use client";

import { useLocale } from "@/lib/locale-context";

const languages = [
  { code: "en" as const, label: "EN" },
  { code: "es" as const, label: "ES" },
  { code: "de" as const, label: "DE" },
  { code: "pt" as const, label: "PT" },
  { code: "fr" as const, label: "FR" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 text-sm">
      {languages.map((lang, i) => {
        const isLast = i === languages.length - 1;
        return (
          <span key={lang.code} className="flex items-center gap-1">
            <button
              onClick={() => setLocale(lang.code)}
              className={`px-2 py-1 rounded transition-colors font-medium ${
                locale === lang.code ? "bg-accent text-white" : "hover:bg-primary/10 text-foreground/60"
              }`}
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.label}
            </button>
            {!isLast && <span className="text-muted">|</span>}
          </span>
        );
      })}
    </div>
  );
}
