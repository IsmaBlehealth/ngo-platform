import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See how Global Approach To Development is making a real difference in West Africa through clean water, education, and healthcare.",
};

const fallbackStats = [
  { value: "332+", label: "Students Enrolled", detail: "Across schools in Cote d'Ivoire" },
  { value: "3", label: "Villages Served", detail: "Healthcare access in Mali" },
  { value: "10+", label: "Years of Service", detail: "Founded in 2014" },
  { value: "$0", label: "Admin Overhead", detail: "100% goes to programs" },
];

const fallbackStories = [
  {
    title: "Clean Water Transforms a Village",
    subtitle: "",
    description:
      "In a rural village in Mali, families used to walk miles each day to collect water from contaminated sources. After GAD built a community well with a purification system, children no longer miss school to fetch water, and waterborne diseases have dramatically decreased.",
  },
  {
    title: "A Future Through Education",
    subtitle: "",
    description:
      "When Fatima enrolled in our school in Cote d'Ivoire, she was one of the first girls in her village to receive a formal education. Today, she is training to become a nurse, inspired by the healthcare workers who served her community through GAD.",
  },
  {
    title: "Healthcare on the Frontlines",
    subtitle: "",
    description:
      "Our mobile health clinics in Mali have provided essential care to three villages that previously had no access to medical services. From prenatal care to childhood vaccinations, our healthcare programs are saving lives every day.",
  },
];

export default async function ImpactPage() {
  let stories = fallbackStories;

  try {
    const dbStories = await prisma.impactStory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    if (dbStories.length > 0) {
      stories = dbStories.map((s) => ({
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
      }));
    }
  } catch {
    // Use fallback data if DB is unavailable
  }

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Our Impact</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Real results. Real change. Every dollar donated goes directly to our programs.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {fallbackStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border p-6 text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm font-semibold">{stat.label}</div>
                <div className="mt-1 text-xs text-muted">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl space-y-8">
          <h2 className="text-2xl font-bold">Stories of Change</h2>
          <div className="space-y-6">
            {stories.map((story) => (
              <div key={story.title} className="rounded-xl border p-6">
                <h3 className="text-lg font-semibold">{story.title}</h3>
                {story.subtitle && (
                  <p className="mt-1 text-sm font-medium text-primary">{story.subtitle}</p>
                )}
                <p className="mt-2 text-sm text-muted">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">Help Us Do More</h2>
          <p className="mt-4 text-white/80">
            Your support directly impacts communities. Join us in building a better future.
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
