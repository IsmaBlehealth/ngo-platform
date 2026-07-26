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
            <p className="mt-4 text-xs text-white/50">
              501(c)(3) Nonprofit Organization | EIN: 47-2155496
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Programs</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/programs#clean-water" className="transition-colors hover:text-white">
                  Clean Water
                </Link>
              </li>
              <li>
                <Link href="/programs#education" className="transition-colors hover:text-white">
                  Education &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link href="/programs#healthcare" className="transition-colors hover:text-white">
                  Healthcare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="transition-colors hover:text-white">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donate" className="transition-colors hover:text-white">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          &copy; {year} Global Approach To Development. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
