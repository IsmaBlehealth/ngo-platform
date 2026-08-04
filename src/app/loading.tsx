export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header skeleton */}
      <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="h-10 w-40 animate-pulse rounded-lg bg-primary/10" />
          <div className="hidden items-center gap-2 lg:flex">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 w-20 animate-pulse rounded-lg bg-primary/10" />
            ))}
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center bg-primary/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 w-full pt-24">
          <div className="max-w-[680px] space-y-6">
            <div className="h-6 w-40 animate-pulse rounded-full bg-primary/20" />
            <div className="h-16 w-full animate-pulse rounded-xl bg-primary/20 md:h-24" />
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-primary/15" />
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-36 animate-pulse rounded-full bg-accent/30" />
              <div className="h-12 w-36 animate-pulse rounded-full bg-primary/15" />
            </div>
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-primary/5" />
            ))}
          </div>
        </div>
      </section>

      <span className="sr-only">Loading page content...</span>
    </div>
  );
}
