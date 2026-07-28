import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { generateProgramSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our Clean Water, Education & Scholarships, and Healthcare programs in West Africa.",
};

const fallbackPrograms = [
  {
    id: "clean-water",
    title: "Clean Water",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&h=600&fit=crop",
    description:
      "Access to clean, safe drinking water is a fundamental human right. Yet millions in West Africa still lack this basic necessity. Our Clean Water program builds wells, water purification systems, and sustainable water infrastructure in communities across Cote d'Ivoire and Mali.",
    highlights: [
      "Community well construction",
      "Water purification systems",
      "Maintenance training for local teams",
      "Water quality monitoring",
    ],
    stats: { number: "15+", label: "Wells Built" },
  },
  {
    id: "education",
    title: "Education & Scholarships",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=600&fit=crop",
    description:
      "Education is the most powerful tool for breaking the cycle of poverty. We operate schools and provide scholarships to children who would otherwise not have access to quality education. Our schools in Cote d'Ivoire currently serve over 332 students with a remarkable 99% passing rate.",
    highlights: [
      "School operation in Cote d'Ivoire",
      "Scholarship programs for underserved children",
      "Teacher training and support",
      "Learning materials and supplies",
    ],
    stats: { number: "332", label: "Students Enrolled" },
  },
  {
    id: "healthcare",
    title: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
    description:
      "Healthcare access saves lives. We deliver medical care, health education, and preventive services to communities that lack basic healthcare infrastructure. Our healthcare programs serve three villages in Mali, bringing essential services to those who need them most.",
    highlights: [
      "Medical clinics in rural villages",
      "Health education and prevention programs",
      "Maternal and child health services",
      "Community health worker training",
    ],
    stats: { number: "3", label: "Villages Served" },
  },
];

export default async function ProgramsPage() {
  let programs = fallbackPrograms;

  try {
    const dbPrograms = await prisma.program.findMany({
      where: { isActive: true },
      include: { projects: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbPrograms.length > 0) {
      programs = dbPrograms.map((p, i) => ({
        id: p.slug,
        title: p.title,
        image: fallbackPrograms[i]?.image || fallbackPrograms[0].image,
        description: p.fullDescription,
        highlights: p.projects.map((proj) => proj.name),
        stats: fallbackPrograms[i]?.stats || { number: "1", label: "Program" },
      }));
    }
  } catch {
    // Use fallback data if DB is unavailable
  }

  const programSchemas = programs.map((p) =>
    generateProgramSchema({
      slug: p.id,
      title: p.title,
      description: p.description,
      url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/programs#${p.id}`,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchemas) }}
      />
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=800&fit=crop"
            alt="Our programs"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Our Programs</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Three pillars driving lasting change in communities across West Africa.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl space-y-20">
          {programs.map((program, index) => (
            <div
              key={program.id}
              id={program.id}
              className={`scroll-mt-20 grid grid-cols-1 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-cols-2-reverse" : "lg:grid-cols-2"
              }`}
            >
              <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={program.image}
                    alt={program.title}
                    width={800}
                    height={500}
                    className="object-cover w-full h-80"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-xl bg-accent p-4 text-white shadow-lg hidden lg:block">
                  <div className="text-2xl font-bold">{program.stats.number}</div>
                  <div className="text-xs text-white/80">{program.stats.label}</div>
                </div>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-bold text-primary">{program.title}</h2>
                <p className="mt-4 text-muted leading-relaxed">{program.description}</p>
                {program.highlights.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {program.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <span className="text-xs text-accent">✓</span>
                        </span>
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#FAF9F6]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary">Support Our Programs</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Your donation directly funds clean water, education, and healthcare programs in West Africa.
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
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
