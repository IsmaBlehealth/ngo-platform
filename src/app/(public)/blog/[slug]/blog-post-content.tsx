"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { blogPosts, categoryColors, formatDate } from "./data";

export function BlogPostContent({ slug }: { slug: string }) {
  const pathname = usePathname();
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <section className="section-padding">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-primary">Post Not Found</h1>
          <p className="mt-4 text-muted">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href="/blog"
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                pathname === "/blog" ? "ring-2 ring-accent" : ""
              } ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text}`}
            >
              {post.category}
            </Link>
            <time className="text-sm text-white/60">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Article */}
            <article className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
                <div className="prose prose-lg max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted leading-relaxed mb-6 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Article Footer */}
                <div className="mt-10 border-t border-gray-100 pt-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/blog"
                      className="rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                    >
                      &larr; All Posts
                    </Link>
                    <Link
                      href="/donate"
                      className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
                    >
                      Support Our Cause
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                  <h3 className="text-lg font-bold text-primary mb-6">
                    Related Posts
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map(([key, related]) => (
                      <Link
                        key={key}
                        href={`/blog/${key}`}
                        className="group block overflow-hidden rounded-xl"
                      >
                        <div className="relative h-36 overflow-hidden rounded-xl">
                          <Image
                            src={related.image}
                            alt={related.title}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-3">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${categoryColors[related.category]?.bg} ${categoryColors[related.category]?.text}`}
                          >
                            {related.category}
                          </span>
                          <h4 className="mt-2 text-sm font-semibold text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <time className="mt-1 block text-xs text-muted">
                            {formatDate(related.publishedAt)}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sidebar CTA */}
                <div className="mt-6 rounded-2xl bg-primary p-8 text-center">
                  <h3 className="text-lg font-bold text-white">
                    Make a Difference
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Your support helps us reach more communities in need.
                  </p>
                  <Link
                    href="/donate"
                    className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-light hover:shadow-lg"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-primary">
            Stay Connected
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Follow our journey and discover how together we can create lasting
            change for communities worldwide.
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
