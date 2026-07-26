import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support our mission to build sustainable futures through clean water, quality education, and accessible healthcare.",
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
