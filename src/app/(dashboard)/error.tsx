"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
      <p className="mt-2 text-muted">An error occurred in the dashboard.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
      >
        Try Again
      </button>
    </div>
  );
}
