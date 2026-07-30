"use client";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  circle?: boolean;
}

export function SkeletonText({ className = "", lines = 3, circle = false }: LoadingSkeletonProps) {
  if (circle) {
    return (
      <div
        className={`h-12 w-12 rounded-full ${className}`}
        style={{
          background: "rgba(110, 122, 110, 0.2)",
          animation: "shimmer 1.5s infinite ease-in-out",
        }}
      />
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="rounded"
          style={{
            height: "0.875rem",
            background: "rgba(110, 122, 110, 0.2)",
            width: i === lines - 1 ? "60%" : "100%",
            animation: "shimmer 1.5s infinite ease-in-out",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`liquid-glass-surface rounded-2xl p-6 shadow-lg ${className}`}>
      <div
        className="mb-4 h-48 rounded-xl"
        style={{
          background: "rgba(110, 122, 110, 0.2)",
          animation: "shimmer 1.5s infinite ease-in-out",
        }}
      />
      <SkeletonText lines={3} />
    </div>
  );
}

export default function LoadingSkeleton({ className = "", lines = 3, circle = false }: LoadingSkeletonProps) {
  return <SkeletonText className={className} lines={lines} circle={circle} />;
}
