"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

const navLinks = [
  { href: "/", key: "nav.home" as const },
  { href: "/programs", key: "nav.programs" as const },
  { href: "/impact", key: "nav.impact" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/blog", key: "nav.blog" as const },
  { href: "/contact", key: "nav.contact" as const },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { locale } = useLocale();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/old-site/logos/main-logo.png"
            alt="Global Approach To Development"
            width={192}
            height={48}
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => router.prefetch(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {t(locale, link.key)}
            </Link>
          ))}
          <div className="ml-2 h-6 w-px bg-primary/10" />
          <Link
            href="/donate"
            className="btn-primary ml-2 px-6 py-2.5 text-sm"
          >
            {t(locale, "nav.donate")}
          </Link>
          <div className="ml-2 h-6 w-px bg-primary/10" />
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-primary/5 hover:text-primary"
              >
                {t(locale, "nav.dashboard")}
              </Link>
              <span className="px-2 text-sm text-muted">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-primary/5 hover:text-primary"
              >
                {t(locale, "nav.signout")}
              </button>
            </>
            ) : (
            <Link
              href="/auth/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-all hover:bg-primary/5 hover:text-primary"
            >
              {t(locale, "nav.signin")}
            </Link>
          )}
          <LanguageSwitcher />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-lg p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-primary/10 bg-surface/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5"
                }`}
              >
                {t(locale, link.key)}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 block px-5 py-3 text-center text-sm"
            >
              {t(locale, "nav.donate")}
            </Link>
            <div className="my-2 border-t border-primary/10" />
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/5"
                >
                  {t(locale, "nav.dashboard")}
                </Link>
                <span className="block px-3 py-2 text-sm text-muted">{session.user?.name}</span>
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/70 hover:bg-primary/5"
                >
                  {t(locale, "nav.signout")}
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/5"
              >
                {t(locale, "nav.signin")}
              </Link>
            )}
            <div className="mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
