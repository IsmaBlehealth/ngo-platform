import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Education & Scholarships",
  description: "We empower students with scholarships, breaking barriers to higher education.",
};

export default async function EducationPage() {
  let programs = await prisma.program.findMany({
    where: { slug: "education" },
    include: { projects: true },
  }).catch(() => []);

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Education & Scholarships</h1>
          <p className="mt-4 mx-auto max-w-2xl text-white/80">
            We empower students with scholarships, breaking barriers to higher education.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <p className="text-lg text-muted">
            Education is the key to breaking cycles of poverty, and we are committed to making it accessible to all. Through our Education & Scholarships program, we provide financial support and educational resources to underprivileged students, enabling them to pursue higher learning. Our goal is to eliminate barriers to education and give students the tools they need to succeed academically. By investing in education, we are investing in a future where everyone has the opportunity to reach their potential. Support these initiatives and help build a brighter tomorrow.
          </p>
        </div>
      </section>

      {/* ─── SCHOOL PROJECT: COTE D'IVOIRE ─── */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">School Project: Cote d&apos;Ivoire</h2>

          <div className="mt-8 rounded-xl border bg-white p-8">
            <h3 className="text-2xl font-bold text-primary">Groupe Scolaire Agbe — Elementary School</h3>
            <p className="mt-4 text-muted">
              The communities we serve represent <strong>62.4 percent of the rural population in Ivory Coast living below the poverty line</strong>. For their children, the only option to access elementary education was a daunting <strong>25-mile walk</strong>. This significant distance to the nearest school severely limits educational access, particularly for younger children who cannot manage the daily trek on foot. Due to their remote location and the lack of available educational resources, most of these children are unlikely to attain the highest grades in education.
            </p>
            <p className="mt-4 text-muted">
              In 2011, community members, along with their Church, came together to establish a school using clay and wood for its construction. Unfortunately, this infrastructure did not offer a safe and nurturing learning environment. In response, Global Approach to Development intervened by constructing a school that ensures a secure learning atmosphere and provides quality education.
            </p>

            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
              <strong>Note:</strong> The original classrooms were made of clay and wood — broken, unhygienic, and unsafe. GAD replaced them with a proper school building.
            </div>

            <p className="mt-4 text-muted">
              Recognizing the vital role of school attendance for students in the community, GAD took action by constructing a school that offers a safe learning environment and quality education. The original school, established in 2011, started with just <strong>58 students</strong>. By 2015, GAD completed a new primary school facility. The new school facility currently serves <strong>332 students</strong>, comprising <strong>166 girls and 166 boys</strong>. Our curriculum covers the equivalent of kindergarten through 5th grade. With a <strong>national passing rate of 99%</strong>, we are proud to nurture the brightest futures for children who might otherwise have been limited to roles as farmers and housewives had we not intervened and established this school.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">332</div>
                <div className="text-xs text-muted">Students</div>
              </div>
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">166</div>
                <div className="text-xs text-muted">Girls</div>
              </div>
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">166</div>
                <div className="text-xs text-muted">Boys</div>
              </div>
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-xs text-muted">Passing Rate</div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border bg-white p-8">
            <h3 className="text-2xl font-bold text-primary">Groupe Scolaire Agbe — Secondary School</h3>
            <p className="mt-4 text-muted">
              Following the completion of the elementary school, we discovered that students had to travel <strong>54 miles to access secondary education</strong>, encompassing both middle and high school. GAD acknowledged the necessity for these students to pursue their education beyond grade 5 within their own community. Consequently, GAD initiated the construction of a middle and high school in <strong>2016</strong> and completed the project in <strong>2019</strong>. The establishment of this new school sparked enthusiasm among the community members.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">2016</div>
                <div className="text-xs text-muted">Construction Started</div>
              </div>
              <div className="rounded-lg bg-primary/5 p-4 text-center">
                <div className="text-2xl font-bold text-primary">2019</div>
                <div className="text-xs text-muted">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHOOL PROJECT: MALI ─── */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">School Project: Mali</h2>

          <div className="mt-8 rounded-xl border bg-white p-8">
            <h3 className="text-2xl font-bold text-primary">Our Work in Sikasso</h3>
            <p className="mt-4 text-muted">
              Mali is the largest land-locked country in the Sahel region of West Africa, and it is one of the poorest countries in the world with an average annual GDP per capita of about $660 in 2012 (World Bank, 2014).
            </p>
            <p className="mt-4 text-muted">
              During a group&apos;s visit to Sikasso, Mali, in 2010, one member of the group sent her niece to a primary school. Like other students, she had to walk many miles to get to the nearest school. While in class, her ability to speak fluent French (which is the official academic language) made a positive impression on her classmates. In fact, her classmates couldn&apos;t express themselves fluently in French because the teacher taught them in their dialect. Therefore, two of her classmates asked her to teach them French. She replied that her uncle had taught her. The girls decided to walk with her to meet her uncle and ask for help, which he agreed to do. The girls found that the teaching was good and decided to make more friends. One after another, the uncle ended up having <strong>more than 50 children</strong> coming to his house to receive an education. For many, this teaching was their only way of receiving an education.
            </p>
            <p className="mt-4 text-muted">
              Therefore, to maximize the children&apos;s learning process, we decided to divide the children into two groups: <strong>ages 2-9 years old</strong> and <strong>10-16 years old</strong>, and we provided them with two sessions per week.
            </p>
            <p className="mt-4 text-muted">
              Seeing the increasing needs, we decided to help more and provide quality education to children living in villages around Sikasso, including <strong>Zandjougoula</strong>, <strong>Kozansso-dioula</strong>, and <strong>Zanadougou</strong>. During the courses, those who follow and correctly answer the questions receive cookies and candy. At the end of the course, all those who are present receive cookies and candy to encourage their greater participation. After the course, the students take a comprehensive exam and receive rewards, including school supplies and monthly financial support of $2, according to their merits and needs. The teachings have different formats, including teaching in the form of sketches, stories, and songs, and all groups are rewarded according to their merit.
            </p>
            <p className="mt-4 text-muted">
              When the children come home with these small gifts, the parents do not complain and allow their children to attend our teaching sessions. Moreover, the lack of interest from their parents creates a growing interest in them to attend our teaching sessions where we demonstrate attention to them, make them feel valuable, which in turn gives them hope for a brighter future.
            </p>

            <div className="mt-8">
              <h4 className="text-xl font-bold">Programs We Offer</h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h5 className="font-bold text-primary">Children&apos;s Clubs</h5>
                  <p className="mt-2 text-sm text-muted">
                    The club offers a safe environment where students come and interact with each other. They learn, innovate and express themselves. We encourage creativity and critical thinking.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h5 className="font-bold text-primary">Literacy Courses</h5>
                  <p className="mt-2 text-sm text-muted">
                    The courses are designed to improve children&apos;s ability to read, write, count using written materials, and sounds. Thus students are able to expand their skills, excel, and process words more clearly.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h5 className="font-bold text-primary">Art Education</h5>
                  <p className="mt-2 text-sm text-muted">
                    The art education includes dance, drama, music, drawing, and painting to improve academic performance, build self-esteem and enhance communication.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-amber-50 p-6">
              <h4 className="text-lg font-bold text-amber-800">Your Help Is Needed</h4>
              <p className="mt-2 text-amber-700">
                <strong>We Need A School Building</strong> — Unfortunately, we do not have a building in either village to house a school where these activities can be better conducted and enjoyed. In spite of the classes being held outdoors, the children zealously attend the teaching sessions. We have chosen to improve children&apos;s education in these villages.
              </p>
              <Link
                href="/donate"
                className="mt-4 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Donate to Build a School
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REACH OUT ─── */}
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
