import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Global Approach To Development",
    alternateName: "GAD",
    url: "https://ngo-platform-399q.vercel.app",
    logo: "https://ngo-platform-399q.vercel.app/images/old-site/logos/main-logo.png",
    description: "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    foundingDate: "2014",
    nonprofitStatus: "501(c)(3)",
    taxID: "47-2155496",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3200 E Guasti Rd., Suite 100",
      addressLocality: "Ontario",
      addressRegion: "CA",
      postalCode: "91761",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-909-728-8111",
      email: "info@gapdev.org",
      contactType: "customer service",
    },
    areaServed: [
      { "@type": "Country", name: "Cote d'Ivoire" },
      { "@type": "Country", name: "Mali" },
    ],
    knowsAbout: ["Clean Water", "Education", "Healthcare", "West Africa", "Nonprofit"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HomeContent />
    </>
  );
}
