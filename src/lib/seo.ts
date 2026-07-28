const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export interface ProgramSchemaInput {
  slug: string;
  title: string;
  description: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Global Approach To Development",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    foundingDate: "2014",
    description:
      "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    nonprofit: {
      taxExemptStatus: "501(c)(3)",
      identifier: "47-2155496",
    },
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
    sameAs: [
      "https://www.facebook.com/",
      "https://twitter.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Global Approach To Development",
    url: baseUrl,
    description:
      "Building sustainable futures through clean water, quality education, and accessible healthcare in West Africa.",
    publisher: {
      "@type": "Organization",
      name: "Global Approach To Development",
      url: baseUrl,
    },
  };
}

export function generateProgramSchema(program: ProgramSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NGOProgram",
    name: program.title,
    description: program.description,
    url: program.url,
    provider: {
      "@type": "NGO",
      name: "Global Approach To Development",
      url: baseUrl,
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
