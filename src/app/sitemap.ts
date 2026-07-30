import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const lastModified = new Date("2026-07-30");
  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/programs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/programs/education`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/impact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/blog/about-child-trauma`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/global-impact-of-clean-water`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/scholarships-for-underprivileged`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog/mobile-health-clinics`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/donate`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
