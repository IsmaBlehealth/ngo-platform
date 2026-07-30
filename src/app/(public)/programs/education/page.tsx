import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Education & Scholarships",
  description: "We empower students with scholarships, breaking barriers to higher education.",
};

export default async function EducationPage() {
  await prisma.program.findMany({
    where: { slug: "education" },
    include: { projects: true },
  }).catch(() => []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/programs/education.jpg"
            alt="Education"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Education & Scholarships</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            We empower students with scholarships, breaking barriers to higher education.
          </p>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <p className="text-lg text-muted leading-relaxed">
            Education is the key to breaking cycles of poverty, and we are committed to making it accessible to all. Through our Education & Scholarships program, we provide financial support and educational resources to underprivileged students, enabling them to pursue higher learning. Our goal is to eliminate barriers to education and give students the tools they need to succeed academically. By investing in education, we are investing in a future where everyone has the opportunity to reach their potential. Support these initiatives and help build a brighter tomorrow.
          </p>
        </div>
      </section>

      {/* ─── SCHOOL PROJECT: COTE D'IVOIRE ─── */}
      <section className="section-padding bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">West Africa</span>
              <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">School Project: Cote d&apos;Ivoire</h2>
              <p className="mt-4 text-muted leading-relaxed">
                The communities we serve represent <strong>62.4 percent of the rural population in Ivory Coast living below the poverty line</strong>. For their children, the only option to access elementary education was a daunting <strong>25-mile walk</strong>. This significant distance to the nearest school severely limits educational access, particularly for younger children who cannot manage the daily trek on foot. Due to their remote location and the lack of available educational resources, most of these children are unlikely to attain the highest grades in education.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                In 2011, community members, along with their Church, came together to establish a school using clay and wood for its construction. Unfortunately, this infrastructure did not offer a safe and nurturing learning environment. In response, Global Approach to Development intervened by constructing a school that ensures a secure learning atmosphere and provides quality education.
              </p>
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-100">
                <strong>Note:</strong> The original classrooms were made of clay and wood — broken, unhygienic, and unsafe. GAD replaced them with a proper school building.
              </div>
              <p className="mt-4 text-muted leading-relaxed">
                Recognizing the vital role of school attendance for students in the community, GAD took action by constructing a school that offers a safe learning environment and quality education. The original school, established in 2011, started with just <strong>58 students</strong>. By 2015, GAD completed a new primary school facility. The new school facility currently serves <strong>332 students</strong>, comprising <strong>166 girls and 166 boys</strong>. Our curriculum covers the equivalent of kindergarten through 5th grade. With a <strong>national passing rate of 99%</strong>, we are proud to nurture the brightest futures for children who might otherwise have been limited to roles as farmers and housewives had we not intervened and established this school.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-20">
                <Image
                  src="/images/old-site/intro-images/scrolling-3.jpg"
                  alt="School project in Cote d'Ivoire"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 rounded-2xl liquid-glass-surface p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary">Groupe Scolaire Agbe — Elementary School</h3>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center card-hover">
                <div className="stat-number text-3xl font-bold">332</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Students</div>
              </div>
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center card-hover">
                <div className="stat-number text-3xl font-bold">166</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Girls</div>
              </div>
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center card-hover">
                <div className="stat-number text-3xl font-bold">166</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Boys</div>
              </div>
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center card-hover">
                <div className="stat-number text-3xl font-bold">99%</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Passing Rate</div>
              </div>
            </div>
          </div>

          {/* Secondary School */}
          <div className="mt-8 rounded-2xl liquid-glass-surface p-8 shadow-lg">
            <h3 className="text-xl font-bold text-primary">Groupe Scolaire Agbe — Secondary School</h3>
            <p className="mt-4 text-muted leading-relaxed">
              Following the completion of the elementary school, we discovered that students had to travel <strong>54 miles to access secondary education</strong>, encompassing both middle and high school. GAD acknowledged the necessity for these students to pursue their education beyond grade 5 within their own community. Consequently, GAD initiated the construction of a middle and high school in <strong>2016</strong> and completed the project in <strong>2019</strong>. The establishment of this new school sparked enthusiasm among the community members.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:w-1/2">
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center">
                <div className="stat-number text-2xl font-bold">2016</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Construction Started</div>
              </div>
              <div className="rounded-xl bg-[#FAF9F6] p-6 text-center">
                <div className="stat-number text-2xl font-bold">2019</div>
                <div className="mt-1 text-xs font-medium text-muted uppercase tracking-wider">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHOOL PROJECT: MALI ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">West Africa</span>
              <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">School Project: Mali</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Mali is the largest land-locked country in the Sahel region of West Africa, and it is one of the poorest countries in the world with an average annual GDP per capita of about $660 in 2012 (World Bank, 2014).
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                During a group&apos;s visit to Sikasso, Mali, in 2010, one member of the group sent her niece to a primary school. Like other students, she had to walk many miles to get to the nearest school. While in class, her ability to speak fluent French (which is the official academic language) made a positive impression on her classmates. In fact, her classmates couldn&apos;t express themselves fluently in French because the teacher taught them in their dialect. Therefore, two of her classmates asked her to teach them French. She replied that her uncle had taught her. The girls decided to walk with her to meet her uncle and ask for help, which he agreed to do. The girls found that the teaching was good and decided to make more friends. One after another, the uncle ended up having <strong>more than 50 children</strong> coming to his house to receive an education. For many, this teaching was their only way of receiving an education.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Therefore, to maximize the children&apos;s learning process, we decided to divide the children into two groups: <strong>ages 2-9 years old</strong> and <strong>10-16 years old</strong>, and we provided them with two sessions per week.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Seeing the increasing needs, we decided to help more and provide quality education to children living in villages around Sikasso, including <strong>Zandjougoula</strong>, <strong>Kozansso-dioula</strong>, and <strong>Zanadougou</strong>. During the courses, those who follow and correctly answer the questions receive cookies and candy. At the end of the course, all those who are present receive cookies and candy to encourage their greater participation. After the course, the students take a comprehensive exam and receive rewards, including school supplies and monthly financial support of $2, according to their merits and needs. The teachings have different formats, including teaching in the form of sketches, stories, and songs, and all groups are rewarded according to their merit.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                When the children come home with these small gifts, the parents do not complain and allow their children to attend our teaching sessions. Moreover, the lack of interest from their parents creates a growing interest in them to attend our teaching sessions where we demonstrate attention to them, make them feel valuable, which in turn gives them hope for a brighter future.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl sticky top-20">
                <Image
                  src="/images/old-site/intro-images/scrolling-6.jpg"
                  alt="School project in Mali"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </div>

          {/* Programs We Offer */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary">Programs We Offer</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl liquid-glass-surface p-8 shadow-lg card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <span className="text-xl">&#127967;</span>
                </div>
                <h4 className="mt-4 font-bold text-primary">Children&apos;s Clubs</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The club offers a safe environment where students come and interact with each other. They learn, innovate and express themselves. We encourage creativity and critical thinking.
                </p>
              </div>
              <div className="rounded-2xl liquid-glass-surface p-8 shadow-lg card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <span className="text-xl">&#128218;</span>
                </div>
                <h4 className="mt-4 font-bold text-primary">Literacy Courses</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The courses are designed to improve children&apos;s ability to read, write, count using written materials, and sounds. Thus students are able to expand their skills, excel, and process words more clearly.
                </p>
              </div>
              <div className="rounded-2xl liquid-glass-surface p-8 shadow-lg card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <span className="text-xl">&#127912;</span>
                </div>
                <h4 className="mt-4 font-bold text-primary">Art Education</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  The art education includes dance, drama, music, drawing, and painting to improve academic performance, build self-esteem and enhance communication.
                </p>
              </div>
            </div>
          </div>

          {/* Help Needed CTA */}
          <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-[#FAF9F6] shadow-lg border border-accent/20">
            <div className="p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
                  <span className="text-2xl">&#10084;</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Your Help Is Needed</h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    <strong>We Need A School Building</strong> — Unfortunately, we do not have a building in either village to house a school where these activities can be better conducted and enjoyed. In spite of the classes being held outdoors, the children zealously attend the teaching sessions. We have chosen to improve children&apos;s education in these villages.
                  </p>
                  <Link
                    href="/donate"
                    className="mt-6 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
                  >
                    Donate to Build a School
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REACH OUT ─── */}
      <section className="section-padding bg-accent">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white">Reach Out to Us Now!</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Join us in making a difference by supporting crucial initiatives that provide education, healthcare, and clean water to underserved communities. Contact us today to learn more.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-[#FAF9F6] px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-[#f1f4f9] hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
