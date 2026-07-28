"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0D5C63] flex items-center justify-center">
            <span className="text-3xl text-white font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            System Error
          </h1>
          <p className="text-muted mb-6">
            An unexpected error occurred. Our team has been notified.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#0D5C63] text-white rounded-xl font-medium hover:bg-[#083d42] transition-colors"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-3 border-2 border-[#0D5C63] text-[#0D5C63] rounded-xl font-medium hover:bg-[#0D5C63]/5 transition-colors"
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
