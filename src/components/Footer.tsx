"use client";

import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { locale } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-on-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold">Global Approach To Development</h3>
            <p className="mt-4 max-w-md text-sm text-on-primary/70 leading-relaxed">
              {t(locale, "footer.mission.desc")}
            </p>
            <div className="mt-4 text-xs text-on-primary/50">
              501(c)(3) Nonprofit Organization | EIN: 47-2155496
            </div>
            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-on-primary/80 mb-4">{t(locale, "footer.stayUpdated")}</h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-on-primary/80">{t(locale, "footer.programs")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-on-primary/60">
              <li>
                <Link href="/programs#clean-water" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "footer.program.water")}
                </Link>
              </li>
              <li>
                <Link href="/programs#education" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "footer.program.education")}
                </Link>
              </li>
              <li>
                <Link href="/programs#healthcare" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "footer.program.health")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-on-primary/80">{t(locale, "footer.quickLinks")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-on-primary/60">
              <li>
                <Link href="/" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.impact")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/donate" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.donate")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-1.5 transition-colors hover:text-accent">
                  {t(locale, "nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-on-primary/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-on-primary/60">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (909) 728-8111
          </div>
          <div className="flex items-center gap-3 text-sm text-on-primary/60">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@gapdev.org
          </div>
          <div className="flex items-center gap-3 text-sm text-on-primary/60">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t(locale, "about.address")}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-on-primary/10 pt-8 text-center text-xs text-on-primary/40">
          {t(locale, "footer.copyright").replace("{year}", String(year))} |{" "}
          <Link href="/privacy" className="hover:text-accent transition-colors">{t(locale, "footer.privacy")}</Link>
          {" | "}
          <Link href="/terms" className="hover:text-accent transition-colors">{t(locale, "footer.terms")}</Link>
        </div>
      </div>
    </footer>
  );
}
