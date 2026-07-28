"use client";

import { useLocale } from "@/lib/locale-context";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded transition-colors font-medium ${
          locale === "en" ? "bg-accent text-white" : "hover:bg-primary/10 text-foreground/60"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => setLocale("fr")}
        className={`px-2 py-1 rounded transition-colors font-medium ${
          locale === "fr" ? "bg-accent text-white" : "hover:bg-primary/10 text-foreground/60"
        }`}
        aria-label="Passer en français"
      >
        FR
      </button>
    </div>
  );
}
