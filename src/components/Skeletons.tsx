export function CardSkeleton() {
  return (
    <div className="liquid-glass-surface rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="h-48 bg-primary/5 rounded-xl mb-4" />
      <div className="h-4 bg-primary/10 rounded w-3/4 mb-2" />
      <div className="h-3 bg-primary/5 rounded w-full mb-1" />
      <div className="h-3 bg-primary/5 rounded w-2/3" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex gap-4 p-4 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="h-4 bg-primary/5 rounded flex-1" />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      <div className="h-8 bg-primary/10 rounded w-1/3" />
      <div className="h-4 bg-primary/5 rounded w-2/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-[60vh] bg-primary/10 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 bg-primary/5 rounded w-64 mx-auto" />
        <div className="h-6 bg-primary/5 rounded w-96 mx-auto" />
      </div>
    </div>
  );
}
