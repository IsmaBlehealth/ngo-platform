import Link from "next/link";
import { prisma } from "@/lib/prisma";

const fallbackStats = [
  { value: "332+", label: "Students Enrolled" },
  { value: "3", label: "Villages Served" },
  { value: "10+", label: "Years of Impact" },
  { value: "100%", label: "Transparent Operations" },
];

const fallbackPrograms = [
  {
    slug: "clean-water",
    title: "Clean Water",
    shortDescription: "Building wells and water systems that provide safe drinking water to villages.",
    icon: "💧",
  },
  {
    slug: "education",
    title: "Education",
    shortDescription: "Operating schools and providing scholarships to children in need.",
    icon: "📚",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortDescription: "Delivering medical care and health education to underserved communities.",
    icon: "🏥",
  },
];

export default async function HomePage() {
  let programs = fallbackPrograms;
  let stats = fallbackStats;

  try {
    const dbPrograms = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbPrograms.length > 0) {
      programs = dbPrograms.map((p) => ({
        slug: p.slug,
        title: p.title,
        shortDescription: p.shortDescription,
        icon: p.icon || "📋",
      }));
    }

    const [totalStudents, totalProjects, donationCount] = await Promise.all([
      prisma.user.count({ where: { role: "DONOR" } }),
      prisma.project.count(),
      prisma.donation.count({ where: { status: "COMPLETED" } }),
    ]);

    if (totalStudents > 0 || totalProjects > 0 || donationCount > 0) {
      stats = [
        { value: `${totalStudents}+`, label: "Students Enrolled" },
        { value: `${totalProjects}`, label: "Villages Served" },
        { value: "10+", label: "Years of Impact" },
        { value: `${donationCount}`, label: "Donations Made" },
      ];
    }
  } catch {
    // Use fallback data if DB is unavailable
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Building Sustainable Futures
            </h1>
            <p className="mt-6 text-lg text-white/80">
              We provide clean water, quality education, and accessible healthcare
              to communities in West Africa. Every child deserves a chance to thrive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
              >
                Donate Now
              </Link>
              <Link
                href="/programs"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold">Our Programs</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
            Three pillars driving lasting change in communities across Cote d&apos;Ivoire and Mali.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs#${program.slug}`}
                className="group rounded-xl border p-6 transition-shadow hover:shadow-lg"
              >
                <div className="text-4xl">{program.icon}</div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{program.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Preview */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold">Our Impact</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Founded in 2014 by Dr. Keuleya Ruth Ble, we have been transforming
            lives in West Africa through sustainable community programs.
          </p>
          <Link
            href="/impact"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            See Our Impact
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">Make a Difference Today</h2>
          <p className="mt-4 text-white/80">
            Your donation helps us build wells, schools, and clinics. Every dollar matters.
          </p>
          <Link
            href="/donate"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </>
  );
}
