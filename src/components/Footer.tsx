import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold">Global Approach To Development</h3>
            <p className="mt-2 max-w-md text-sm text-white/70">
              Building sustainable futures through clean water, quality education,
              and accessible healthcare in West Africa.
            </p>
            <p className="mt-4 text-xs text-white/70">
              501(c)(3) Nonprofit Organization | EIN: 47-2155496
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/70">
              <p>📞 909-728-8111</p>
              <p>✉️ info@gapdev.org</p>
              <p>📍 3200 E Guasti Rd., Suite 100, Ontario, CA 91761</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Programs</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/programs#clean-water" className="transition-colors hover:text-white">
                  Clean Water Initiatives
                </Link>
              </li>
              <li>
                <Link href="/programs#education" className="transition-colors hover:text-white">
                  Education &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link href="/programs#healthcare" className="transition-colors hover:text-white">
                  Healthcare &amp; Medical Aid
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="transition-colors hover:text-white">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/donate" className="transition-colors hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-white/70">
          &copy; 2024 - {year} Global Approach To Development. All rights reserved. |{" "}
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
