import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Global Approach To Development, our mission, founder, and how we build sustainable futures in West Africa.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Empowering communities through sustainable development since 2014.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted">
              Global Approach To Development (GAD) is dedicated to building sustainable
              futures for communities in West Africa. We focus on three pillars: clean
              water, quality education, and accessible healthcare. Our approach is
              community-driven, ensuring that every project meets the real needs of
              the people we serve.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted">
              Founded in 2014 by Dr. Keuleya Ruth Ble, a medical doctor and public
              health professional, GAD was born from a deep commitment to addressing
              the most pressing challenges facing communities in West Africa. What
              started as a small initiative has grown into a comprehensive development
              organization serving hundreds of students and multiple villages across
              Cote d'Ivoire and Mali.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Our Founder</h2>
            <div className="mt-4 rounded-xl border p-6">
              <h3 className="text-lg font-semibold">Dr. Keuleya Ruth Ble, MD, MPH</h3>
              <p className="mt-2 text-sm text-muted">
                A medical doctor with a Master of Public Health degree, Dr. Ble brings
                over a decade of experience in healthcare and community development.
                Her vision of sustainable, community-driven change continues to guide
                every aspect of GAD&apos;s work.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Where We Work</h2>
            <p className="mt-4 text-muted">
              We operate in Cote d'Ivoire and Mali, two countries in West Africa where
              communities face significant challenges in access to clean water, education,
              and healthcare. Our programs are designed to address these gaps through
              sustainable, locally-led initiatives.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
