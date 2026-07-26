import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our Clean Water, Education & Scholarships, and Healthcare programs in West Africa.",
};

const fallbackPrograms = [
  {
    id: "clean-water",
    title: "Clean Water",
    description:
      "Access to clean, safe drinking water is a fundamental human right. Yet millions in West Africa still lack this basic necessity. Our Clean Water program builds wells, water purification systems, and sustainable water infrastructure in communities across Cote d'Ivoire and Mali.",
    highlights: [
      "Community well construction",
      "Water purification systems",
      "Maintenance training for local teams",
      "Water quality monitoring",
    ],
  },
  {
    id: "education",
    title: "Education & Scholarships",
    description:
      "Education is the most powerful tool for breaking the cycle of poverty. We operate schools and provide scholarships to children who would otherwise not have access to quality education. Our schools in Cote d'Ivoire currently serve over 332 students.",
    highlights: [
      "School operation in Cote d'Ivoire",
      "Scholarship programs for underserved children",
      "Teacher training and support",
      "Learning materials and supplies",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "Healthcare access saves lives. We deliver medical care, health education, and preventive services to communities that lack basic healthcare infrastructure. Our healthcare programs serve three villages in Mali, bringing essential services to those who need them most.",
    highlights: [
      "Medical clinics in rural villages",
      "Health education and prevention programs",
      "Maternal and child health services",
      "Community health worker training",
    ],
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
      programs = dbPrograms.map((p) => ({
        id: p.slug,
        title: p.title,
        description: p.fullDescription,
        highlights: p.projects.map((proj) => proj.name),
      }));
    }
  } catch {
    // Use fallback data if DB is unavailable
  }

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Our Programs</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Three pillars driving lasting change in communities across West Africa.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl space-y-16">
          {programs.map((program) => (
            <div key={program.id} id={program.id} className="scroll-mt-20">
              <h2 className="text-2xl font-bold">{program.title}</h2>
              <p className="mt-4 text-muted">{program.description}</p>
              {program.highlights.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {program.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
