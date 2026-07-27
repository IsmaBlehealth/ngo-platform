import Link from "next/link";
import { prisma } from "@/lib/prisma";

const fallbackPrograms = [
  {
    slug: "clean-water",
    title: "Clean Water Initiatives",
    shortDescription: "We work to provide access to clean and safe drinking water in underserved communities.",
    icon: "💧",
  },
  {
    slug: "education",
    title: "Education & Scholarships",
    shortDescription: "Education is a powerful tool for change. We offer scholarships and educational support to children and young adults.",
    icon: "📚",
  },
  {
    slug: "healthcare",
    title: "Healthcare & Medical Aid",
    shortDescription: "We provide essential healthcare services to communities in need, including medical camps and maternal and child health.",
    icon: "🏥",
  },
];

export default async function HomePage() {
  let programs = fallbackPrograms;

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
  } catch {
    // Use fallback data if DB is unavailable
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Progress Through Equal Opportunity
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Global Approach To Development
            </h1>
            <p className="mt-6 text-lg text-white/80">
              We believe in creating pathways to education, health, and empowerment, ensuring that underserved communities can thrive and contribute globally.
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

      {/* Programs */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <p className="mt-3 text-sm font-semibold text-primary">Click Here →</p>
              </Link>
            ))}
            <Link
              href="/programs"
              className="group rounded-xl border-2 border-dashed p-6 transition-shadow hover:border-primary hover:shadow-lg"
            >
              <div className="text-4xl">📋</div>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">
                View More Programs
              </h3>
              <p className="mt-2 text-sm text-muted">
                By exploring more of our programs, you can see the breadth of our impact and the diverse approaches.
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">Click Here →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Introducing
          </p>
          <h2 className="mt-2 text-3xl font-bold">Global Approach To Development</h2>
          <p className="mt-4 text-muted">
            Welcome to Global Approach To Development, where we are dedicated to making a meaningful difference in communities across the globe. Our focus is on addressing the pressing needs of vulnerable populations through impactful programs in education, clean water, healthcare, and economic empowerment.
          </p>
          <p className="mt-4 text-muted">
            We believe that sustainable change comes from empowering individuals and providing them with the tools to build better futures.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Support Our Cause</h3>
              <p className="mt-2 text-sm text-muted">
                We believe that every act of generosity can create lasting change.
              </p>
              <Link href="/donate" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                Donate Now →
              </Link>
            </div>
            <div className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">Join Us in Making a Difference</h3>
              <p className="mt-2 text-sm text-muted">
                You can help create sustainable change and uplift communities around the world.
              </p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
                Get Involved →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl rounded-2xl bg-accent p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-bold">Donate Now</h2>
          <p className="mt-4 text-white/80">
            Your generosity can make a world of difference. Every donation helps us deliver clean water, education, healthcare, and economic opportunities to those who need it most.
          </p>
          <Link
            href="/donate"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            Donate Now
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            We Are Committed
          </p>
          <h2 className="mt-2 text-3xl font-bold">Our Mission Statement</h2>
          <p className="mt-4 text-muted">
            Our mission is to eliminate poverty, health disparities, gender inequality, and improve the overall health of underserved populations. That&apos;s no different from the desire of other human beings around the world. We have a common problem, not only in underserved countries but also in developed countries. We have the same global threats to our development, education, economy, and health.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            About Us
          </Link>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">Reach Out to Us</h2>
          <p className="mt-4 text-muted">
            Drop Us a Line — We&apos;d love to hear from you! Whether you have questions about our programs, want to get involved, or need more information about how you can support our cause, feel free to reach out.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <span>📞 909-728-8111</span>
            <span>✉️ info@gapdev.org</span>
            <span>📍 Ontario, CA</span>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
