import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Global Approach To Development is a 501(c)(3) non-profit organization founded in 2014 to improve the lives of underserved, low-income, and minority populations.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=800&fit=crop"
            alt="Team working together"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We are dedicated to fostering prosperity, universal health, and equality worldwide.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
                  alt="Community development"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Story</span>
              <h2 className="mt-2 text-3xl font-bold text-primary">Who We Are</h2>
              <p className="mt-6 text-muted leading-relaxed">
                Global Approach To Development is a 501(c)(3) non-profit organization that was founded in 2014 to improve the lives of underserved, low-income, and minority populations. We understand that through empowerment and the elimination of poverty, health disparities, and inequality, individuals can reach a state of optimal well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission + Vision Cards */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">Our Mission</h3>
              <p className="mt-4 text-muted leading-relaxed">
                Our mission is to eliminate poverty, health disparities, gender inequality, and improve the overall health of underserved populations. That&apos;s no different from the desire of other human beings around the world. We have a common problem, not only in underserved countries but also in developed countries.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">Our Vision</h3>
              <p className="mt-4 text-muted leading-relaxed">
                Our Vision is to improve the quality of life of under-served populations globally and to give a deprived community and children the opportunity to thrive, to learn, to give back and to live in a better world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop"
                  alt="Dr. Keuleya Ruth Ble"
                  width={600}
                  height={700}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Founder</span>
              <h2 className="mt-2 text-3xl font-bold text-primary">Dr. Keuleya Ruth Ble, MD, MPH</h2>
              <p className="mt-6 text-muted leading-relaxed">
                A medical doctor with a Master of Public Health degree, Dr. Ble brings over a decade of experience in healthcare and community development. Her vision of sustainable, community-driven change continues to guide every aspect of GAD&apos;s work.
              </p>
              <blockquote className="mt-6 border-l-4 border-accent pl-6 text-lg italic text-primary/80">
                &ldquo;There is no love more sincere than the love of giving&rdquo;
              </blockquote>
              <p className="mt-6 text-muted leading-relaxed">
                Dr. Ble founded Global Approach To Development in 2014 with a clear vision: to address the pressing needs of vulnerable populations through impactful programs in education, clean water, healthcare, and economic empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">Global Reach</span>
            <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Where We Work</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">
              <Image
                src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&h=500&fit=crop"
                alt="Cote d'Ivoire"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h3 className="text-2xl font-bold text-white">Cote d&apos;Ivoire</h3>
                <p className="mt-2 text-white/80">
                  Schools serving 332+ students with a 99% passing rate.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">
              <Image
                src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&h=500&fit=crop"
                alt="Mali"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h3 className="text-2xl font-bold text-white">Mali</h3>
                <p className="mt-2 text-white/80">
                  Healthcare programs serving three villages in Sikasso region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary">Join Us in Making a Difference</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            You can help create sustainable change and uplift communities around the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
