"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-padding flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted">
        An unexpected error occurred. Please try again.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-muted">Error ID: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Try Again
      </button>
    </section>
  );
}
