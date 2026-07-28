"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: string) {
    const segments = pathname.split("/");
    if (["en", "fr"].includes(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("en")}
        className="px-2 py-1 rounded hover:bg-primary/10 transition-colors font-medium"
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted">|</span>
      <button
        onClick={() => switchLocale("fr")}
        className="px-2 py-1 rounded hover:bg-primary/10 transition-colors font-medium"
        aria-label="Passer en français"
      >
        FR
      </button>
    </div>
  );
}
