import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold">Global Approach To Development</h3>
            <p className="mt-4 max-w-md text-sm text-white/60 leading-relaxed">
              Building sustainable futures through clean water, quality education,
              and accessible healthcare in West Africa.
            </p>
            <div className="mt-4 text-xs text-white/50">
              501(c)(3) Nonprofit Organization | EIN: 47-2155496
            </div>
            <div className="mt-6 flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-accent hover:text-white" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-accent hover:text-white" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-accent hover:text-white" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-accent hover:text-white" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Programs</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <Link href="/programs#clean-water" className="transition-colors hover:text-accent">
                  Clean Water Initiatives
                </Link>
              </li>
              <li>
                <Link href="/programs#education" className="transition-colors hover:text-accent">
                  Education &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link href="/programs#healthcare" className="transition-colors hover:text-accent">
                  Healthcare &amp; Medical Aid
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="transition-colors hover:text-accent">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/donate" className="transition-colors hover:text-accent">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-accent">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (909) 728-8111
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@gapdev.org
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            3200 E Guasti Rd., Suite 100, Ontario, CA 91761
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          &copy; 2014 - {year} Global Approach To Development. All rights reserved. |{" "}
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          {" | "}
          <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
