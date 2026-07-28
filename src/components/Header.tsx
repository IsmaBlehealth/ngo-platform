"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            GAD
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-primary leading-tight block">Global Approach To</span>
            <span className="text-sm font-bold text-primary leading-tight block">Development</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/60 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 h-6 w-px bg-primary/10" />
          <Link
            href="/donate"
            className="ml-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-light hover:shadow-lg hover:scale-105"
          >
            Donate
          </Link>
          <div className="ml-2 h-6 w-px bg-primary/10" />
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary"
              >
                Dashboard
              </Link>
              <span className="px-2 text-sm text-muted">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary"
              >
                Sign Out
              </button>
            </>
            ) : (
            <Link
              href="/auth/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              Sign In
            </Link>
          )}
          <LanguageSwitcher />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-lg p-2 lg:hidden"
          aria-label="Toggle menu"
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
        <div className="border-t border-primary/10 lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-md"
            >
              Donate Now
            </Link>
            <div className="my-2 border-t border-primary/10" />
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-primary/5"
                >
                  Dashboard
                </Link>
                <span className="block px-3 py-2 text-sm text-muted">{session.user?.name}</span>
                <button
                  onClick={() => { signOut(); setOpen(false); }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/60 hover:bg-primary/5"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-primary/5"
              >
                Sign In
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
