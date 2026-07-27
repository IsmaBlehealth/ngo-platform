import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description: "See the real impact of Global Approach To Development on communities in West Africa.",
};

const impactSections = [
  {
    title: "Classrooms Full of Hope",
    subtitle: "Fueling the future, one desk at a time",
    description: "With your support, hundreds of students now have access to a safe, engaging learning environment. From the youngest pupils to eager teens, your donations help provide the notebooks, pens, and classroom space they need to thrive.",
    ctaText: "Help more kids learn",
    ctaHref: "/donate",
    color: "bg-blue-50",
  },
  {
    title: "Team Spirit and Safe Play",
    subtitle: "Building confidence through sport",
    description: "Every week, these young players come together to train, play, and support one another — building teamwork, discipline, and confidence. Their enthusiasm is unstoppable. With your support, we can provide them with the resources to grow even further.",
    ctaText: "Support community sports",
    ctaHref: "/donate",
    color: "bg-green-50",
  },
  {
    title: "Tools That Transform Learning",
    subtitle: "Creating spaces that inspire learning",
    description: "Students now have lockers to store their materials and a new projector that brings interactive lessons to life. These improvements help create a more organized, engaging, and modern learning environment. A game changer in rural areas.",
    ctaText: "Support Classroom Upgrades",
    ctaHref: "/donate",
    color: "bg-purple-50",
  },
];

export default function ImpactPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Impact</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Real results. Real change. Every dollar donated goes directly to our programs.
          </p>
        </div>
      </section>

      {impactSections.map((section, i) => (
        <section
          key={section.title}
          className={`section-padding ${i % 2 === 1 ? "bg-gray-50" : ""}`}
        >
          <div className="mx-auto max-w-4xl">
            <div className={`rounded-2xl ${section.color} p-8 sm:p-12`}>
              <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>
              <p className="mt-2 text-lg font-medium text-primary">{section.subtitle}</p>
              <p className="mt-4 text-muted">{section.description}</p>
              <Link
                href={section.ctaHref}
                className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {section.ctaText}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-accent py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold">Reach Out to Us Now!</h2>
          <p className="mt-4 text-white/80">
            Join us in making a difference by supporting crucial initiatives that provide education, healthcare, and clean water to underserved communities. Contact us today to learn more.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
