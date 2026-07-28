import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding flex flex-col items-center justify-center text-center min-h-[70vh] bg-gradient-to-br from-gray-50 via-white to-primary/5">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 mb-8">
        <svg
          className="h-14 w-14 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="mt-4 text-2xl font-semibold text-foreground">Page Not Found</p>
      <p className="mt-3 max-w-md text-muted leading-relaxed">
        The page you are looking for does not exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <Link
        href="/"
        className="mt-10 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:scale-105"
      >
        Back to Home
      </Link>
    </section>
  );
}
