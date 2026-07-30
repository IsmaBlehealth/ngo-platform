import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Impact",
  description: "See the real impact of Global Approach To Development on communities in West Africa.",
};

const stats = [
  { number: 100000, label: "Community Members", suffix: "+" },
  { number: 50000, label: "Clean Water Access", suffix: "+" },
  { number: 332, label: "Students Enrolled", suffix: "" },
  { number: 99, label: "Passing Rate", suffix: "%" },
  { number: 3, label: "Countries Served", suffix: "" },
  { number: 15000, label: "Patients Treated", suffix: "+" },
];

const impactStories = [
  {
    icon: "water_drop",
    category: "Education",
    title: "Classrooms Full of Hope",
    description: "With your support, hundreds of students now have access to a safe, engaging learning environment. From the youngest pupils to eager teens, your donations help provide the notebooks, pens, and classroom space they need to thrive.",
    image: "/images/old-site/intro-images/scrolling-3.jpg",
    imageAlt: "Clean water project in West Africa",
    stat: "332",
    statLabel: "Students",
  },
  {
    icon: "school",
    category: "Sports",
    title: "Team Spirit and Safe Play",
    description: "Every week, these young players come together to train, play, and support one another — building teamwork, discipline, and confidence. Their enthusiasm is unstoppable. With your support, we can provide them with the resources to grow even further.",
    image: "/images/old-site/intro-images/btm3-2.jpg",
    imageAlt: "Students in classrooms in Côte d'Ivoire",
    stat: "99%",
    statLabel: "Passing Rate",
  },
  {
    icon: "health_and_safety",
    category: "Education",
    title: "Tools That Transform Learning",
    description: "Students now have lockers to store their materials and a new projector that brings interactive lessons to life. These improvements help create a more organized, engaging, and modern learning environment. A game changer in rural areas.",
    image: "/images/old-site/intro-images/btm3-3.jpg",
    imageAlt: "Healthcare clinic serving communities",
    stat: "15K+",
    statLabel: "Patients Treated",
  },
];

export default function ImpactPage() {
  return (
    <>
      {/* Hero — full-screen cinematic */}
      <header className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/old-site/slider/hero-2.jpg"
            alt="Community impact across West Africa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary/60 to-background" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Real Results
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl font-[family-name:var(--font-montserrat)]">
            Our Impact
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Education, healthcare, and access to clean water are fundamental rights. See how communities are transforming through empowerment and equal opportunity.
          </p>
        </div>
      </header>

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Impact" }]} />

      {/* Stats Grid — liquid-glass cards */}
      <section className="py-24 bg-primary-dark relative z-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-montserrat)]">
              By The Numbers
            </h2>
            <div className="w-24 h-1 gold-bg-gradient mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="liquid-glass p-8 rounded-xl heavy-shadow hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl font-black gold-gradient mb-2 font-[family-name:var(--font-montserrat)]">
                  {stat.number >= 1000
                    ? `${(stat.number / 1000).toFixed(stat.number >= 10000 ? 0 : 0)}K`
                    : stat.number}
                  {stat.suffix}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories — alternating with diagonal separators */}
      {/* Story 1 */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src={impactStories[0].image}
                alt={impactStories[0].imageAlt}
                width={1200}
                height={700}
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl heavy-shadow"
              />
              <div className="absolute -bottom-6 -right-6 liquid-glass-light p-6 rounded-xl heavy-shadow hidden md:block">
                <div className="text-4xl font-black gold-gradient font-[family-name:var(--font-montserrat)]">
                  {impactStories[0].stat}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mt-1">
                  {impactStories[0].statLabel}
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3 text-accent">
                <span className="material-symbols-outlined text-2xl text-accent">water_drop</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {impactStories[0].category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-montserrat)]">
                {impactStories[0].title}
              </h3>
              <p className="text-lg text-muted leading-relaxed">
                {impactStories[0].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Separator */}
      <div className="w-full h-24 bg-gray-50 separator-clip-diagonal-down" />

      {/* Story 2 */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <span className="material-symbols-outlined text-2xl text-accent">school</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {impactStories[1].category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-montserrat)]">
                {impactStories[1].title}
              </h3>
              <p className="text-lg text-muted leading-relaxed">
                {impactStories[1].description}
              </p>
            </div>
            <div className="relative">
              <Image
                src={impactStories[1].image}
                alt={impactStories[1].imageAlt}
                width={1200}
                height={700}
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl heavy-shadow"
              />
              <div className="absolute -bottom-6 -left-6 liquid-glass-light p-6 rounded-xl heavy-shadow hidden md:block">
                <div className="text-4xl font-black gold-gradient font-[family-name:var(--font-montserrat)]">
                  {impactStories[1].stat}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mt-1">
                  {impactStories[1].statLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Separator */}
      <div className="w-full h-24 bg-background separator-clip-diagonal-up" />

      {/* Story 3 */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src={impactStories[2].image}
                alt={impactStories[2].imageAlt}
                width={1200}
                height={700}
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl heavy-shadow"
              />
              <div className="absolute -bottom-6 -right-6 liquid-glass-light p-6 rounded-xl heavy-shadow hidden md:block">
                <div className="text-4xl font-black gold-gradient font-[family-name:var(--font-montserrat)]">
                  {impactStories[2].stat}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mt-1">
                  {impactStories[2].statLabel}
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center gap-3 text-accent">
                <span className="material-symbols-outlined text-2xl text-accent">health_and_safety</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  {impactStories[2].category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary font-[family-name:var(--font-montserrat)]">
                {impactStories[2].title}
              </h3>
              <p className="text-lg text-muted leading-relaxed">
                {impactStories[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/old-site/intro-images/scrolling-9.jpg"
            alt="Make an impact"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark z-10" />
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4 block">
            Make an Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 font-[family-name:var(--font-montserrat)]">
            Your Donation Changes Lives
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/donate"
              className="w-full sm:w-auto gold-bg-gradient text-primary-dark font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 active:scale-95 duration-150 heavy-shadow transition-all text-center"
            >
              Donate $25
            </Link>
            <Link
              href="/donate"
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/5 active:scale-95 duration-150 transition-all text-center"
            >
              Custom Amount
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
