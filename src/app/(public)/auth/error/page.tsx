import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <section className="section-padding flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">Authentication Error</h1>
      <p className="mt-4 text-lg text-muted">
        Something went wrong while trying to sign you in.
      </p>
      <p className="mt-2 max-w-md text-sm text-muted">
        You may have denied access, or there was a temporary issue with the
        authentication provider. Please try again.
      </p>
      <Link
        href="/auth/login"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Back to Login
      </Link>
    </section>
  );
}
