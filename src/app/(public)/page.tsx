import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Home",
  description:
    "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa. Global Approach To Development — Progress Through Equal Opportunity.",
};

const fallbackPrograms = [
  {
    slug: "clean-water",
    title: "Clean Water Initiatives",
    shortDescription: "We work to provide access to clean and safe drinking water in underserved communities.",
    icon: "💧",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&h=400&fit=crop",
  },
  {
    slug: "education",
    title: "Education & Scholarships",
    shortDescription: "Education is a powerful tool for change. We offer scholarships and educational support to children and young adults.",
    icon: "📚",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
  },
  {
    slug: "healthcare",
    title: "Healthcare & Medical Aid",
    shortDescription: "We provide essential healthcare services to communities in need, including medical camps and maternal and child health.",
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
];

const stats = [
  { number: "332+", label: "Students Educated", icon: "🎓" },
  { number: "99%", label: "Passing Rate", icon: "📊" },
  { number: "3", label: "Villages Served", icon: "🏘️" },
  { number: "10+", label: "Years of Impact", icon: "🌍" },
];

export default async function HomePage() {
  let programs = fallbackPrograms;

  try {
    const dbPrograms = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbPrograms.length > 0) {
      programs = dbPrograms.map((p, i) => ({
        slug: p.slug,
        title: p.title,
        shortDescription: p.shortDescription,
        icon: p.icon || "📋",
        image: fallbackPrograms[i]?.image || fallbackPrograms[0].image,
      }));
    }
  } catch {
    // Use fallback data if DB is unavailable
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop"
            alt="Children in West Africa"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 z-10">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent mb-6">
              Progress Through Equal Opportunity
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              Every Child Deserves a <span className="text-accent">Chance to Thrive</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              We believe in creating pathways to education, health, and empowerment, ensuring that underserved communities can thrive and contribute globally.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
              >
                Donate Now
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L0,120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-1 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-8 relative z-10">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-xl shadow-primary/5 text-center card-hover">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">What We Do</span>
            <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Our Programs</h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto">
              Three pillars driving lasting change in communities across West Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs#${program.slug}`}
                className="group rounded-2xl overflow-hidden bg-white shadow-lg shadow-primary/5 card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-4xl">{program.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{program.shortDescription}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview with Image */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop"
                  alt="Community empowerment in West Africa"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-accent p-6 text-white shadow-xl hidden lg:block">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-white/80">Years of Impact</div>
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                About Us
              </span>
              <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
                Empowering Communities Across West Africa
              </h2>
              <p className="mt-6 text-muted leading-relaxed">
                Global Approach To Development is a 501(c)(3) non-profit organization founded in 2014 to improve the lives of underserved, low-income, and minority populations. We understand that through empowerment and the elimination of poverty, health disparities, and inequality, individuals can reach a state of optimal well-being.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Our mission is to eliminate poverty, health disparities, gender inequality, and improve the overall health of underserved populations. We operate in Cote d&apos;Ivoire and Mali, bringing clean water, education, and healthcare to communities in need.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                >
                  About Us
                </Link>
                <Link
                  href="/programs"
                  className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  Our Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="relative section-padding hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=1080&fit=crop"
            alt="Impact background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-7xl text-center z-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Impact</span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Making a Real Difference</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl font-bold text-accent">{stat.number}</div>
                <div className="mt-2 text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=600&fit=crop"
              alt="Volunteers helping communities"
              width={1200}
              height={600}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
              <div className="px-8 sm:px-12 max-w-lg">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Donate Today</h2>
                <p className="mt-4 text-white/80">
                  Your generosity can make a world of difference. Every donation helps us deliver clean water, education, healthcare, and economic opportunities to those who need it most.
                </p>
                <Link
                  href="/donate"
                  className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Mission</span>
          <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Committed to Global Change</h2>
          <p className="mt-6 text-muted leading-relaxed max-w-3xl mx-auto">
            Our mission is to eliminate poverty, health disparities, gender inequality, and improve the overall health of underserved populations. That&apos;s no different from the desire of other human beings around the world. We have a common problem, not only in underserved countries but also in developed countries.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Learn More About Us
          </Link>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-8 text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold">Call Us</h3>
              <p className="mt-2 text-sm text-muted">(909) 728-8111</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8 text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold">Email Us</h3>
              <p className="mt-2 text-sm text-muted">info@gapdev.org</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8 text-center card-hover">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mt-4 font-bold">Find Us</h3>
              <p className="mt-2 text-sm text-muted">Ontario, CA</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-full border border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
