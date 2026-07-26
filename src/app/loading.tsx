export default function Loading() {
  return (
    <section className="section-padding flex items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted">Loading...</p>
        <span className="sr-only">Loading...</span>
      </div>
    </section>
  );
}
