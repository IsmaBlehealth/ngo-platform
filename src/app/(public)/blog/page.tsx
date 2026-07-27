import Link from "next/link";

const blogPosts = [
  {
    slug: "about-child-trauma",
    title: "About Child Trauma",
    excerpt: "A traumatic event is a frightening, dangerous, or violent event that poses a threat to a child's life or bodily integrity.",
    category: "Healthcare",
    publishedAt: "2024-09-19",
  },
  {
    slug: "global-impact-of-clean-water",
    title: "Global Impact of Clean Water on Health and Development",
    excerpt: "Clean water initiatives play a crucial role in shaping the health and development of communities around the world.",
    category: "Clean Water",
    publishedAt: "2024-09-19",
  },
  {
    slug: "scholarships-for-underprivileged",
    title: "Scholarships for Underprivileged: Breaking Barriers",
    excerpt: "Scholarships provide a critical lifeline for underprivileged students, allowing them to pursue higher education despite financial hardships.",
    category: "Education",
    publishedAt: "2024-09-19",
  },
  {
    slug: "mobile-health-clinics",
    title: "Mobile Health Clinics Bringing Aid to Remote Regions",
    excerpt: "Mobile health clinics are revolutionizing access to healthcare for populations in remote and underserved regions.",
    category: "Healthcare",
    publishedAt: "2024-09-19",
  },
];

export const metadata = {
  title: "Blog",
  description: "Read the latest updates, stories, and insights from Global Approach To Development.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Stories, insights, and updates from our work around the world.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border p-6 transition-shadow hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {post.category}
                </span>
                <h2 className="mt-2 text-xl font-bold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
