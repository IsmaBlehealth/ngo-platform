import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F6] via-[#f1f4f9] to-primary/5" />
      <div className="pattern-dots absolute inset-0 opacity-40" />

      <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-primary-blob opacity-30" />
      <div className="absolute right-[10%] bottom-[20%] h-64 w-64 rounded-full bg-secondary-blob opacity-25" />
      <div className="absolute right-[25%] top-[10%] h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[10%] left-[20%] h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="stat-number mb-4 text-[10rem] font-black leading-none sm:text-[14rem]">
          404
        </span>

        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mb-10 max-w-md text-muted leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
            <span className="btn-arrow">→</span>
          </Link>
          <Link href="/programs" className="btn-secondary">
            Our Programs
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
