import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { generateProgramSchema } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our Clean Water, Education & Scholarships, and Healthcare programs in West Africa.",
};

const fallbackPrograms = [
  {
    id: "clean-water",
    title: "Clean Water",
    image: "/images/old-site/programs/clean-water.jpg",
    description:
      "Access to clean water is a fundamental right that many communities still lack. Our Clean Water Initiatives focus on delivering sustainable water solutions to underserved regions, ensuring safe and reliable water sources. By addressing waterborne diseases and improving sanitation, we help communities thrive and reduce health risks.",
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
    image: "/images/hero/gad-hero-2.jpg",
    description:
      "Education is the key to breaking cycles of poverty, and we are committed to making it accessible to all. Through our Education & Scholarships program, we provide financial support and educational resources to underprivileged students, enabling them to pursue higher learning.",
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
    image: "/images/old-site/programs/healthcare.jpg",
    description:
      "Good health is the foundation of a strong community, and our Healthcare & Medical Aid programs aim to provide vital medical services to underserved populations. We bring essential healthcare, including preventative care, treatments, and emergency aid, directly to those in need.",
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
      programs = dbPrograms.map((p: { slug: string; title: string; fullDescription: string; projects: { name: string }[] }, i: number) => ({
        id: p.slug,
        title: p.title,
        image: fallbackPrograms[i]?.image || fallbackPrograms[0].image,
        description: p.fullDescription,
        highlights: p.projects.map((proj: { name: string }) => proj.name),
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
      {/* Hero — liquid glass */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/intro-images/scrolling-2.jpg"
            alt="Our programs"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/90 via-black/60 to-black/10" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div
          className="absolute left-0 top-0 h-full w-full md:w-[55%] z-10 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, rgba(0,30,15,0.75) 0%, rgba(0,50,25,0.55) 50%, rgba(0,30,15,0.1) 85%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-20">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: "rgba(0,42,21,0.4)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.12)",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            What We Do
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7)" }}>
            Programs
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}>
            Our initiatives focus on education, healthcare, and clean water access.
          </p>
        </div>
      </section>

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Programs" }]} />

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
            Join us in making a difference by supporting crucial initiatives that provide education, healthcare, and clean water to underserved communities. Contact us today to learn more.
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
