import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Global Approach To Development",
    template: "%s | Global Approach To Development",
  },
  description:
    "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
  keywords: ["NGO", "nonprofit", "clean water", "education", "healthcare", "Africa"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Global Approach To Development",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Global Approach To Development — Progress Through Equal Opportunity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Approach To Development",
    description:
      "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-2">
          Skip to main content
        </a>
        {children}</Providers>
      </body>
    </html>
  );
}
