import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-lg text-muted">Page not found</p>
      <p className="mt-2 max-w-md text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Back to Home
      </Link>
    </section>
  );
}
