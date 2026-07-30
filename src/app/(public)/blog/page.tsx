import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    slug: "about-child-trauma",
    title: "About Child Trauma",
    excerpt: "A traumatic event is a frightening, dangerous, or violent event that poses a threat to a child's life or bodily integrity. Witnessing a traumatic event that threatens the life or physical security of a loved one can also be traumatic.",
    category: "Healthcare",
    publishedAt: "2024-09-19",
    image: "/images/old-site/intro-images/btm3-4.jpg",
  },
  {
    slug: "global-impact-of-clean-water",
    title: "Global Impact of Clean Water on Health and Development",
    excerpt: "Clean water initiatives play a crucial role in shaping the health and development of communities around the world. By improving access to safe water, these initiatives help reduce diseases, foster well-being, and enable long-term community...",
    category: "Clean Water",
    publishedAt: "2024-09-19",
    image: "/images/old-site/intro-images/scrolling-2.jpg",
  },
  {
    slug: "scholarships-for-underprivileged",
    title: "Scholarships for Underprivileged: Breaking Barriers",
    excerpt: "Scholarships provide a critical lifeline for underprivileged students, allowing them to pursue higher education despite financial hardships. These programs not only offer financial support but also create opportunities for personal and academic...",
    category: "Education",
    publishedAt: "2024-09-19",
    image: "/images/old-site/programs/education.jpg",
  },
  {
    slug: "mobile-health-clinics",
    title: "Mobile Health Clinics Bringing Aid to Remote Regions",
    excerpt: "Mobile health clinics are revolutionizing access to healthcare for populations in remote and underserved regions. These clinics bridge the gap between rural communities and essential medical services, offering a lifeline to those who may otherwise...",
    category: "Healthcare",
    publishedAt: "2024-09-19",
    image: "/images/old-site/intro-images/btm3-3.jpg",
  },
];

export const metadata = {
  title: "Blog",
  description: "Read the latest updates, stories, and insights from Global Approach To Development.",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Healthcare: { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Clean Water": { bg: "bg-blue-100", text: "text-blue-700" },
  Education: { bg: "bg-purple-100", text: "text-purple-700" },
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/old-site/intro-images/scrolling-5.jpg"
            alt="Blog"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Education, healthcare, and access to clean water are fundamental rights. This blog explores the impact of various initiatives, showcasing how communities are transforming through empowerment and equal opportunity.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Featured Story
          </span>
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-6 block rounded-2xl overflow-hidden shadow-lg card-hover"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-96">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-white">
                <span
                  className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${categoryColors[featured.category]?.bg} ${categoryColors[featured.category]?.text}`}
                >
                  {featured.category}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl group-hover:text-primary-light transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <time className="text-sm text-muted">
                    {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Latest Articles
            </span>
            <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
              All Posts
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden bg-white shadow-lg card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-muted">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-sm font-semibold text-accent group-hover:text-accent-dark transition-colors">
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary">Stay Connected</h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Follow our journey and discover how together we can create lasting change for communities worldwide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
