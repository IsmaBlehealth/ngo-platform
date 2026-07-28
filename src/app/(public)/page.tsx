import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import FloatingDonateBar from '@/components/FloatingDonateBar';

const programs = [
  {
    title: 'Clean Water Initiative',
    desc: 'Building sustainable water systems in communities across Africa and Latin America, providing access to clean drinking water for thousands.',
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80',
    stat: '50K+',
    statLabel: 'Lives Changed',
    href: '/programs#water',
  },
  {
    title: 'Education & Scholarships',
    desc: 'Empowering the next generation through education programs, school construction, and scholarship opportunities in Côte d\'Ivoire and Mali.',
    icon: '📚',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80',
    stat: '332',
    statLabel: 'Students Enrolled',
    href: '/programs/education',
  },
  {
    title: 'Healthcare Programs',
    desc: 'Delivering essential healthcare services to underserved communities through mobile clinics and community health workers.',
    icon: '🏥',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    stat: '15K+',
    statLabel: 'Patients Treated',
    href: '/programs#health',
  },
];

const stats = [
  { number: '2014', label: 'Founded', color: 'text-primary' },
  { number: '100K+', label: 'Lives Impacted', color: 'text-accent' },
  { number: '3', label: 'Countries', color: 'text-success' },
  { number: '99%', label: 'Passing Rate', color: 'text-primary' },
];

export default function HomePage() {
  return (
    <>
      <FloatingDonateBar />

      {/* ═══ HERO — Overlapping Composition ═══ */}
      <section className="relative min-h-[100vh] overflow-hidden bg-primary-dark">
        {/* Background image with parallax feel */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt="Children smiling"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient mask: transparent → dark */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 flex min-h-[100vh] items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <ScrollReveal>
                <p className="micro-header text-accent mb-4">
                  Global Approach To Development
                </p>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <h1 className="text-tight text-5xl font-black leading-tight text-white sm:text-7xl lg:text-8xl">
                  Every Child
                  <br />
                  <span className="stat-number">Deserves a Future</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={2}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                  Building sustainable futures through clean water, education, and healthcare
                  in communities across Africa and Latin America.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/donate" className="btn-primary">
                    Donate Now
                    <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/about" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z" fill="white"/>
          </svg>
        </div>

        {/* Overlapping stats bar — floats over hero */}
        <div className="overlap-up relative z-30 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="card-depth rounded-2xl bg-white p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i}>
                  <div className="text-center">
                    <p className={`stat-number text-3xl font-black sm:text-4xl ${s.color}`}>{s.number}</p>
                    <p className="mt-1 text-sm font-medium text-muted">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMS — BENTO GRID ═══ */}
      <section className="bg-white pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-3 text-center">What We Do</p>
            <h2 className="text-tight text-center text-4xl font-black text-primary sm:text-5xl">
              Our Programs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-relaxed text-muted">
              We work across three core areas to create lasting change in communities worldwide.
            </p>
          </ScrollReveal>

          {/* Bento Grid: Large + 2 small */}
          <div className="mt-16 bento-grid">
            {/* Main story — 2x2 */}
            <ScrollReveal className="bento-large">
              <Link href={programs[0].href} className="group relative block h-full overflow-hidden rounded-2xl">
                <Image
                  src={programs[0].image}
                  alt={programs[0].title}
                  fill
                  className="object-cover img-zoom-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
                  <span className="micro-header text-accent mb-2">{programs[0].statLabel}</span>
                  <p className="stat-number mb-2 text-5xl font-black">{programs[0].stat}</p>
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">{programs[0].title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{programs[0].desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    Learn More
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Small card 1 */}
            <ScrollReveal className="bento-tall" delay={1}>
              <Link href={programs[1].href} className="group relative block h-full overflow-hidden rounded-2xl">
                <Image
                  src={programs[1].image}
                  alt={programs[1].title}
                  fill
                  className="object-cover img-zoom-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="micro-header text-accent mb-2">{programs[1].statLabel}</span>
                  <p className="stat-number mb-2 text-4xl font-black">{programs[1].stat}</p>
                  <h3 className="text-xl font-bold text-white">{programs[1].title}</h3>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    Explore
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Small card 2 */}
            <ScrollReveal className="bento-tall" delay={2}>
              <Link href={programs[2].href} className="group relative block h-full overflow-hidden rounded-2xl">
                <Image
                  src={programs[2].image}
                  alt={programs[2].title}
                  fill
                  className="object-cover img-zoom-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="micro-header text-accent mb-2">{programs[2].statLabel}</span>
                  <p className="stat-number mb-2 text-4xl font-black">{programs[2].stat}</p>
                  <h3 className="text-xl font-bold text-white">{programs[2].title}</h3>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent">
                    Explore
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ DIAGONAL SEPARATOR → ABOUT ═══ */}
      <div className="relative -mt-1 bg-white">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 60L1440 80L0 80Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* ═══ ABOUT — Overlapping Card ═══ */}
      <section className="relative bg-slate-50 pattern-dots pt-24 pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <p className="micro-header text-accent mb-3">Who We Are</p>
                <h2 className="text-tight text-4xl font-black text-primary sm:text-5xl">
                  Empowering Communities
                  <br />
                  <span className="stat-number">Since 2014</span>
                </h2>
                <p className="mt-6 text-relaxed text-muted leading-relaxed">
                  Global Approach To Development is a 501(c)(3) non-profit organization founded by
                  Dr. Keuleya Ruth Ble MD MPH. We work to provide sustainable solutions in clean water,
                  education, and healthcare for communities across Africa and Latin America.
                </p>
                <p className="mt-4 text-relaxed text-muted leading-relaxed">
                  With a 99% passing rate in our schools and programs reaching thousands of
                  families, we are committed to creating lasting change.
                </p>
                <Link href="/about" className="btn-primary mt-8">
                  Our Story
                  <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="relative">
                {/* Floating badge */}
                <div className="absolute -top-6 -right-6 z-10 animate-float rounded-2xl bg-accent px-6 py-4 text-center shadow-glow">
                  <p className="stat-number text-3xl font-black">10+</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">Years</p>
                </div>
                {/* Image card with depth */}
                <div className="card-depth overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
                    alt="Community gathering"
                    width={600}
                    height={400}
                    className="h-[400px] w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ DIAGONAL SEPARATOR → IMPACT ═══ */}
      <div className="relative -mt-1 bg-slate-50">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 20L1440 80L0 80Z" fill="white"/>
        </svg>
      </div>

      {/* ═══ IMPACT — Alternating with Floating Stats ═══ */}
      <section className="bg-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-3 text-center">Real Results</p>
            <h2 className="text-tight text-center text-4xl font-black text-primary sm:text-5xl">
              Our Impact
            </h2>
          </ScrollReveal>

          <div className="mt-20 space-y-24">
            {[
              {
                title: 'Clean Water Transformation',
                text: 'Over 50,000 lives transformed through sustainable water systems. Our initiative provides access to clean drinking water, reducing waterborne diseases by 75% in communities we serve.',
                image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80',
                stat: '75%',
                statLabel: 'Disease Reduction',
              },
              {
                title: 'Education Excellence',
                text: 'With a 99% passing rate in our schools across Côte d\'Ivoire and Mali, we are proving that quality education can reach even the most remote communities. 332 students currently enrolled.',
                image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80',
                stat: '99%',
                statLabel: 'Passing Rate',
              },
              {
                title: 'Healthcare Access',
                text: 'Mobile health clinics bringing essential medical care to communities without access to hospitals. Over 15,000 patients treated across three countries.',
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
                stat: '15K+',
                statLabel: 'Patients Treated',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title}>
                <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="relative">
                      <div className="card-depth overflow-hidden rounded-2xl">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="h-[350px] w-full object-cover img-zoom"
                        />
                      </div>
                      {/* Floating stat card — overlaps the image */}
                      <div className="overlap-up absolute -bottom-8 right-6 rounded-xl bg-white p-5 shadow-primary sm:right-8">
                        <p className="stat-number text-3xl font-black">{item.stat}</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">{item.statLabel}</p>
                      </div>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <p className="micro-header text-accent mb-3">Impact Report</p>
                    <h3 className="text-tight text-3xl font-black text-primary sm:text-4xl">{item.title}</h3>
                    <p className="mt-4 text-relaxed text-muted leading-relaxed">{item.text}</p>
                    <Link href="/impact" className="btn-secondary mt-8">
                      View Impact
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIAGONAL SEPARATOR → DONATE ═══ */}
      <div className="relative -mt-1 bg-white">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 60L1440 80L0 80Z" fill="#0f2137"/>
        </svg>
      </div>

      {/* ═══ DONATE CTA — Full bleed with overlay ═══ */}
      <section className="relative overflow-hidden bg-primary-dark py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80"
            alt="Happy community"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-4">Make a Difference</p>
            <h2 className="text-tight text-4xl font-black text-white sm:text-6xl">
              Your Donation
              <br />
              <span className="stat-number">Changes Lives</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              100% of your donation goes directly to our programs. No administrative fees.
              Every dollar makes a real impact.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/donate" className="btn-primary !bg-accent !text-white">
                Donate $25
                <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/donate" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                Custom Amount
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ DIAGONAL SEPARATOR → CONTACT ═══ */}
      <div className="relative -mt-1 bg-primary-dark">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 20L1440 80L0 80Z" fill="white"/>
        </svg>
      </div>

      {/* ═══ CONTACT ═══ */}
      <section className="bg-white pb-24 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-3 text-center">Get In Touch</p>
            <h2 className="text-tight text-center text-4xl font-black text-primary sm:text-5xl">
              Contact Us
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: '📍', label: 'Address', value: '3200 E Guasti Rd., Suite 100\nOntario, CA 91761' },
              { icon: '📞', label: 'Phone', value: '909-728-8111' },
              { icon: '✉️', label: 'Email', value: 'info@gapdev.org' },
            ].map((c, i) => (
              <ScrollReveal key={c.label} delay={i}>
                <div className="card-depth-hover rounded-2xl p-8 text-center">
                  <span className="text-4xl">{c.icon}</span>
                  <p className="micro-header text-accent mt-4 mb-2">{c.label}</p>
                  <p className="text-sm font-medium text-muted whitespace-pre-line">{c.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
