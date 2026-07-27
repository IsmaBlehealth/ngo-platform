import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Global Approach To Development is a 501(c)(3) non-profit organization founded in 2014 to improve the lives of underserved, low-income, and minority populations.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            We are dedicated to fostering prosperity, universal health, and equality worldwide.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl space-y-12">
          <div>
            <p className="text-lg text-muted">
              Global Approach To Development is a 501(c)(3) non-profit organization that was founded in 2014 to improve the lives of underserved, low-income, and minority populations. We understand that through empowerment and the elimination of poverty, health disparities, and inequality, individuals can reach a state of optimal well-being.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Mission Statement</h2>
            <p className="mt-4 text-muted">
              Our mission is to eliminate poverty, health disparities, gender inequality, and improve the overall health of underserved populations. That&apos;s no different from the desire of other human beings around the world. We have a common problem, not only in underserved countries but also in developed countries. We have the same global threats to our development, education, economy, and health.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Vision Statement</h2>
            <p className="mt-4 text-muted">
              Our Vision is to improve the quality of life of under-served populations globally and to give a deprived community and children the opportunity to thrive, to learn, to give back and to live in a better world.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Founder</h2>
            <div className="mt-4 rounded-xl border p-6">
              <h3 className="text-lg font-semibold">Dr. Keuleya Ruth Ble, MD, MPH</h3>
              <p className="mt-2 text-sm text-muted">
                A medical doctor with a Master of Public Health degree, Dr. Ble brings
                over a decade of experience in healthcare and community development.
                Her vision of sustainable, community-driven change continues to guide
                every aspect of GAD&apos;s work.
              </p>
              <blockquote className="mt-4 border-l-4 border-primary pl-4 text-sm italic text-muted">
                &ldquo;There is no love more sincere than the love of giving&rdquo;
              </blockquote>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Where We Work</h2>
            <p className="mt-4 text-muted">
              We operate in Cote d&apos;Ivoire and Mali, two countries in West Africa where
              communities face significant challenges in access to clean water, education,
              and healthcare. Our programs are designed to address these gaps through
              sustainable, locally-led initiatives.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Contact Us
            </Link>
            <Link
              href="/programs"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
