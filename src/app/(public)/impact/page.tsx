import Link from "next/link";
import Image from "next/image";
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
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=700&fit=crop",
    imageAlt: "African school children studying in classrooms",
    stat: "332+",
    statLabel: "Students Supported",
    ctaText: "Help more kids learn",
    ctaHref: "/donate",
  },
  {
    title: "Team Spirit and Safe Play",
    subtitle: "Building confidence through sport",
    description: "Every week, these young players come together to train, play, and support one another — building teamwork, discipline, and confidence. Their enthusiasm is unstoppable. With your support, we can provide them with the resources to grow even further.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=700&fit=crop",
    imageAlt: "Children playing sports and building teamwork",
    stat: "150+",
    statLabel: "Young Athletes",
    ctaText: "Support community sports",
    ctaHref: "/donate",
  },
  {
    title: "Tools That Transform Learning",
    subtitle: "Creating spaces that inspire learning",
    description: "Students now have lockers to store their materials and a new projector that brings interactive lessons to life. These improvements help create a more organized, engaging, and modern learning environment. A game changer in rural areas.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=700&fit=crop",
    imageAlt: "Classroom supplies and modern learning technology",
    stat: "99%",
    statLabel: "Passing Rate",
    ctaText: "Support Classroom Upgrades",
    ctaHref: "/donate",
  },
];

const stats = [
  { number: "332+", label: "Students Educated" },
  { number: "99%", label: "Passing Rate" },
  { number: "3", label: "Villages Served" },
  { number: "10+", label: "Years of Impact" },
];

export default function ImpactPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden wave-divider">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=800&fit=crop"
            alt="Community impact across West Africa"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 z-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Our Impact</span>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Real Results. Real Change.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Every dollar donated goes directly to our programs. See how your generosity is transforming communities across West Africa.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold stat-number sm:text-5xl">{stat.number}</p>
                <p className="mt-2 text-sm font-medium text-muted sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {impactSections.map((section, i) => (
        <section
          key={section.title}
          className={`section-padding ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    width={1200}
                    height={700}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-6 shadow-xl sm:-bottom-8 sm:-right-8">
                  <p className="text-3xl font-bold stat-number">{section.stat}</p>
                  <p className="text-sm font-medium text-muted">{section.statLabel}</p>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">Impact Story</span>
                <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">{section.title}</h2>
                <p className="mt-2 text-lg font-medium text-accent">{section.subtitle}</p>
                <p className="mt-6 text-muted leading-relaxed">{section.description}</p>
                <div className="mt-8">
                  <Link
                    href={section.ctaHref}
                    className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
                  >
                    {section.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative accent-gradient py-20 text-center text-white overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold sm:text-4xl">Reach Out to Us Now!</h2>
          <p className="mt-4 text-lg text-white/90">
            Join us in making a difference by supporting crucial initiatives that provide education, healthcare, and clean water to underserved communities. Contact us today to learn more.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-gray-100 hover:shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/donate"
              className="rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Donate Now
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="rgba(255,255,255,0.15)" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L0,120Z" />
          </svg>
        </div>
      </section>
    </>
  );
}
