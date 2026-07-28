"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingDonateBar from "@/components/FloatingDonateBar";
import HeroCarousel from "@/components/HeroCarousel";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

const programs = [
  {
    icon: "💧",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
    stat: "50K+",
    statLabelKey: "program.statLabel",
    titleKey: "program.title",
    descKey: "program.desc",
    href: "/programs#water",
  },
  {
    icon: "📚",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    stat: "332",
    statLabelKey: "education.statLabel",
    titleKey: "education.title",
    descKey: "education.desc",
    href: "/programs/education",
  },
  {
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    stat: "15K+",
    statLabelKey: "health.statLabel",
    titleKey: "health.title",
    descKey: "health.desc",
    href: "/programs#health",
  },
];

const stats = [
  { number: "2014", labelKey: "home.stats.founded", color: "text-primary" },
  { number: "100K+", labelKey: "home.stats.impacted", color: "text-accent" },
  { number: "3", labelKey: "home.stats.countries", color: "text-success" },
  { number: "99%", labelKey: "home.stats.passingRate", color: "text-primary" },
];

const impactItems = [
  {
    titleKey: "home.impact.water.title",
    textKey: "home.impact.water.text",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
    stat: "75%",
    statLabelKey: "home.impact.water.statLabel",
  },
  {
    titleKey: "home.impact.education.title",
    textKey: "home.impact.education.text",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80",
    stat: "99%",
    statLabelKey: "home.impact.education.statLabel",
  },
  {
    titleKey: "home.impact.health.title",
    textKey: "home.impact.health.text",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    stat: "15K+",
    statLabelKey: "home.impact.health.statLabel",
  },
];

const contacts = [
  { icon: "📍", labelKey: "home.contact.address", value: "3200 E Guasti Rd., Suite 100\nOntario, CA 91761" },
  { icon: "📞", labelKey: "home.contact.phone", value: "909-728-8111" },
  { icon: "✉️", labelKey: "home.contact.email", value: "info@gapdev.org" },
];

export default function HomeContent() {
  const { locale } = useLocale();
  const tr = (key: string) => (t as (l: string, k: string) => string)(locale, key);

  return (
    <>
      <FloatingDonateBar />
      <HeroCarousel />

      <section className="relative z-30 px-4 md:px-10 max-w-7xl mx-auto -mt-16 md:-mt-24 mb-20">
        <div className="rounded-xl p-8 md:p-10 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/5 before:to-transparent before:pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.labelKey} delay={i}>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className={`text-3xl md:text-4xl font-black text-accent mb-2 drop-shadow-sm`}>{s.number}</p>
                  <p className="text-sm font-medium text-white/60 uppercase tracking-wider">{tr(s.labelKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F6] pt-24 pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16 flex flex-col items-center">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">{tr("home.whatWeDo")}</h2>
              <h1 className="text-4xl md:text-[84px] font-black leading-[1.1] mb-6 tracking-tight text-foreground" style={{ fontFamily: "var(--font-inter)" }}>
                {tr("home.ourPrograms")}
              </h1>
              <p className="text-lg max-w-[640px] text-muted leading-relaxed">{tr("home.programs.desc")}</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            <ScrollReveal className="md:col-span-2 md:row-span-2">
              <Link href={programs[0].href} className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06),0_20px_40px_-8px_rgba(0,0,0,0.08)] md:col-span-2 md:row-span-2 bento-hover block cursor-pointer border-primary/10 bg-white/90 h-full">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image src={programs[0].image} alt="" fill className="object-cover img-zoom opacity-60" sizes="(max-width: 768px) 100vw, 66vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">{tr(programs[0].statLabelKey)}</span>
                  <span className="text-3xl md:text-4xl font-black text-accent mb-4">{programs[0].stat}</span>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white">{tr(programs[0].titleKey)}</h3>
                  <p className="text-sm mb-6 max-w-md text-white/70">{tr(programs[0].descKey)}</p>
                  <div className="flex items-center text-sm font-semibold text-accent">
                    {tr("home.learnMore")}
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {[1, 2].map((idx) => (
              <ScrollReveal key={idx} delay={idx}>
                <Link href={programs[idx].href} className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06),0_20px_40px_-8px_rgba(0,0,0,0.08)] bento-hover block cursor-pointer border-primary/10 bg-white/90 h-full">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image src={programs[idx].image} alt="" fill className="object-cover img-zoom opacity-60" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                    <span className="text-2xl font-black text-accent mb-1 font-bold">{programs[idx].stat}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">{tr(programs[idx].statLabelKey)}</span>
                    <h3 className="text-lg font-bold mb-4 tracking-tight text-white">{tr(programs[idx].titleKey)}</h3>
                    <div className="flex items-center text-sm font-semibold text-white">
                      {tr("home.explore")}
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="relative -mt-1 bg-[#FAF9F6]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 60L1440 80L0 80Z" fill="#f1f4f9"/>
        </svg>
      </div>

      <section className="relative bg-[#f1f4f9] pattern-dots pt-24 pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <p className="micro-header text-accent mb-3">{tr("home.whoWeAre")}</p>
                <h2 className="text-tight text-4xl font-black text-primary sm:text-5xl">
                  {tr("home.empowering")}
                  <br />
                  <span className="stat-number">{tr("home.since2014")}</span>
                </h2>
                <p className="mt-6 text-relaxed text-muted leading-relaxed">{tr("home.about.desc1")}</p>
                <p className="mt-4 text-relaxed text-muted leading-relaxed">{tr("home.about.desc2")}</p>
                <Link href="/about" className="btn-primary mt-8">
                  {tr("home.ourStory")}
                  <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="relative">
                <div className="absolute -top-6 -right-6 z-10 animate-float rounded-2xl bg-accent px-6 py-4 text-center shadow-glow">
                  <p className="stat-number text-3xl font-black">10+</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">{tr("home.years")}</p>
                </div>
                <div className="card-depth overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
                    alt="Community gathering"
                    width={600}
                    height={400}
                    className="h-[400px] w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="relative -mt-1 bg-[#f1f4f9]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 20L1440 80L0 80Z" fill="#FAF9F6"/>
        </svg>
      </div>

      <section className="bg-[#FAF9F6] pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-3 text-center">{tr("home.realResults")}</p>
            <h2 className="text-tight text-center text-4xl font-black text-primary sm:text-5xl">{tr("home.ourImpact")}</h2>
          </ScrollReveal>

          <div className="mt-20 space-y-24">
            {impactItems.map((item, i) => (
              <ScrollReveal key={item.titleKey}>
                <div className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative">
                      <div className="card-depth overflow-hidden rounded-2xl">
                        <Image
                          src={item.image}
                          alt=""
                          width={600}
                          height={400}
                          className="h-[350px] w-full object-cover img-zoom"
                        />
                      </div>
                      <div className="overlap-up absolute -bottom-8 right-6 rounded-xl liquid-glass-light p-5 shadow-primary sm:right-8">
                        <p className="stat-number text-3xl font-black">{item.stat}</p>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">{tr(item.statLabelKey)}</p>
                      </div>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <p className="micro-header text-accent mb-3">{tr("home.impact.report")}</p>
                    <h3 className="text-tight text-3xl font-black text-primary sm:text-4xl">{tr(item.titleKey)}</h3>
                    <p className="mt-4 text-relaxed text-muted leading-relaxed">{tr(item.textKey)}</p>
                    <Link href="/impact" className="btn-secondary mt-8">
                      {tr("home.impact.view")}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="relative -mt-1 bg-[#FAF9F6]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0L1440 60L1440 80L0 80Z" fill="#1B1F23"/>
        </svg>
      </div>

      <section className="relative overflow-hidden bg-foreground py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80"
            alt="Happy community"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-4">{tr("donate.title")}</p>
            <h2 className="text-tight text-4xl font-black text-white sm:text-6xl">
              {tr("home.donate.heading")}
              <br />
              <span className="stat-number">{tr("home.donate.heading2")}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{tr("home.donate.desc")}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/donate" className="btn-primary !bg-accent !text-white">
                {tr("home.donate.amount")}
                <svg className="btn-arrow h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/donate" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                {tr("home.donate.custom")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="relative -mt-1 bg-foreground">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80L1440 20L1440 80L0 80Z" fill="#FAF9F6"/>
        </svg>
      </div>

      <section className="bg-[#FAF9F6] pb-24 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="micro-header text-accent mb-3 text-center">{tr("home.contact.getInTouch")}</p>
            <h2 className="text-tight text-center text-4xl font-black text-primary sm:text-5xl">{tr("home.contact.title")}</h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {contacts.map((c, i) => (
              <ScrollReveal key={c.labelKey} delay={i}>
                <div className="liquid-glass-surface card-depth-hover rounded-2xl p-8 text-center">
                  <span className="text-4xl">{c.icon}</span>
                  <p className="micro-header text-accent mt-4 mb-2">{tr(c.labelKey)}</p>
                  <p className="text-sm font-medium text-muted whitespace-pre-line">{c.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
