import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import { LocaleProvider } from "@/lib/locale-context";
import BackToTop from "@/components/BackToTop";
import ReadingProgress from "@/components/ReadingProgress";
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Global Approach To Development",
    images: [
      {
        url: "/og-image.svg",
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
    images: ["/og-image.svg"],
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
        <Providers>
          <LocaleProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
            >
              Skip to main content
            </a>
            <ReadingProgress />
            {children}
            <BackToTop />
            <Analytics />
            <SpeedInsights />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
