import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description: "Global Approach To Development is a 501(c)(3) non-profit organization founded in 2014 to improve the lives of underserved, low-income, and minority populations.",
};

export default function AboutPage() {
  const schema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ═══ HERO — Stitch cinematic style ═══ */}
      <header className="relative min-h-[70vh] flex items-center justify-center bg-primary-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/60 to-primary-dark/90 z-10" />
          <Image
            src="/images/old-site/intro-images/scrolling-7.jpg"
            alt="Community gathering"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto mt-20">
          <span className="text-xs font-bold text-accent tracking-widest uppercase mb-4 block">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Empowering Communities
            <br />
            <span className="text-gradient-gold">Since 2014</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to fostering prosperity, universal health, and equality worldwide.
          </p>
        </div>
      </header>

      {/* ═══ FOUNDER — Stitch two-column with floating badge ═══ */}
      <section className="py-24 px-6 bg-white relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(0,6,19,0.5)] aspect-[0.67] bg-primary-dark">
              <Image
                src="/images/old-site/about/btm1-img1.png"
                alt="Dr. Keuleya Ruth Ble"
                fill
                className="object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary-dark to-transparent" />
            </div>
            {/* Floating badge — Stitch style */}
            <div className="absolute -top-6 right-8 bg-accent text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg border border-accent-dark" style={{ animation: 'float 4s ease-in-out infinite' }}>
              10+ Years of Impact
            </div>
          </div>

          {/* Text side */}
          <div>
            <span className="text-xs font-bold text-primary-dark tracking-widest uppercase mb-2 block">Our Founder</span>
            <h2 className="text-3xl font-black text-primary-dark mb-4">Dr. Keuleya Ruth Ble</h2>
            <p className="text-sm text-accent font-semibold mb-8 flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Chief Medical Officer &amp; Visionary
            </p>
            <div className="space-y-6 text-base text-gray-600 leading-relaxed">
              <p>
                With over a decade of frontline medical and administrative experience, Dr. Ble established GAD to address the critical gaps in rural healthcare and education infrastructure.
              </p>
              <blockquote className="pl-6 border-l-4 border-accent italic text-primary-dark text-lg font-medium">
                &ldquo;True development is not just about building walls; it is about building the capacity of the people who live within them.&rdquo;
              </blockquote>
              <p>
                Her leadership ensures that our approach remains deeply rooted in the communities we serve, prioritizing sustainable empowerment over temporary relief.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIAGONAL SEPARATOR — Stitch clip-path ═══ */}
      <div className="w-full h-32 md:h-48 bg-gray-100 relative z-20" style={{ clipPath: 'polygon(0 4vw, 100% 0, 100% calc(100% - 4vw), 0 100%)' }} />

      {/* ═══ WHERE WE WORK — Stitch cards with double shadow ═══ */}
      <section className="py-24 px-6 bg-gray-100 relative z-10 -mt-16 md:-mt-24 pb-32" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="max-w-7xl mx-auto pt-16 md:pt-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary-dark tracking-widest uppercase mb-4 block">Global Reach</span>
            <h2 className="text-3xl font-bold text-primary-dark mb-4">Where We Work</h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 — Côte d'Ivoire */}
            <div className="bg-white rounded-2xl overflow-hidden group relative" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 10px 30px -10px rgba(0,6,19,0.5)' }}>
              <div className="aspect-[1.34] overflow-hidden">
                <Image
                  src="/images/old-site/programs/education.jpg"
                  alt="Cote d'Ivoire school"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Côte d&apos;Ivoire</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    332 Students Supported
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    99% Passing Rate
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 — Mali */}
            <div className="bg-white rounded-2xl overflow-hidden group relative" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 10px 30px -10px rgba(0,6,19,0.5)' }}>
              <div className="aspect-[1.34] overflow-hidden">
                <Image
                  src="/images/old-site/intro-images/scrolling-4.jpg"
                  alt="Mali village"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Mali</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    3 Villages Connected
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Sikasso Region Hub
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 — Ontario CA */}
            <div className="bg-white rounded-2xl overflow-hidden group relative" style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 10px 30px -10px rgba(0,6,19,0.5)' }}>
              <div className="aspect-[1.34] overflow-hidden">
                <Image
                  src="/images/old-site/intro-images/scrolling-10.jpg"
                  alt="Ontario California"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Ontario, CA</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Headquarters
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Global Operations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl text-center mx-auto">
          <h2 className="text-3xl font-black text-primary-dark">Join Us in Making a Difference</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            You can help create sustainable change and uplift communities around the world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Donate Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-dark px-8 py-3.5 text-sm font-bold text-primary-dark hover:bg-primary-dark/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
