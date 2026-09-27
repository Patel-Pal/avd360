import { company } from "@/lib/content";

/**
 * Centralized SEO configuration — single source of truth for the site's
 * canonical origin, keyword sets and structured data.
 *
 * The origin can be overridden per-environment via NEXT_PUBLIC_SITE_URL,
 * falling back to the production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://avd360.in"
).replace(/\/$/, "");

/** Absolute URL of the social share / OG image. */
export const ogImage = `${siteUrl}/logo.jpeg`;

/**
 * Primary keyword set used site-wide. India-focused where relevant, since the
 * domain is .in and the business operates in the Indian market.
 */
export const primaryKeywords: string[] = [
  "AVD 360 Solution",
  "business excellence consulting",
  "digital transformation company",
  "ISO management consultant",
  "ISO certification consultant India",
  "quality management system",
  "lean manufacturing consultant",
  "operational excellence",
  "business management platform",
  "process digitization",
  "management consulting India",
  "Kaizen and 5S consultant",
];

/** Per-page keyword sets (merged with primaryKeywords where useful). */
export const pageKeywords: Record<string, string[]> = {
  home: [
    "business excellence and digital transformation",
    "connected business management system",
    "people process technology",
    "real-time business dashboard",
  ],
  about: [
    "about AVD 360 Solution",
    "business excellence company India",
    "operational excellence partner",
  ],
  services: [
    "consulting services",
    "business excellence services",
    "quality management services",
    "ISO 9001 14001 45001 27001 consultant",
    "IATF 16949 consultant",
    "lean manufacturing services",
    "digital solution for manufacturing",
  ],
  platform: [
    "digital business management platform",
    "ERP alternative for SME",
    "production quality ISO maintenance software",
    "workflow automation platform",
    "manufacturing management software India",
  ],
  whyUs: [
    "why choose AVD 360",
    "all departments on one platform",
    "high ROI business software",
    "future-ready business technology",
  ],
  contact: [
    "contact AVD 360 Solution",
    "free business consultation",
    "ISO consultant enquiry",
    "digital transformation consultation India",
  ],
};

/** Build an absolute canonical URL for a given path (e.g. "/services"). */
export function canonical(path = "/"): string {
  const clean = path === "/" ? "" : `/${path.replace(/^\//, "")}`;
  return `${siteUrl}${clean}`;
}

/**
 * JSON-LD structured data: Organization + WebSite.
 * Rendered once in the root layout so it appears on every page.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: ogImage,
    description:
      "AVD 360 Solution is an integrated Business Excellence and Digital Transformation company — Consulting, Business Excellence, Quality Management, ISO Management and Digital Solutions.",
    slogan: company.tagline,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: siteUrl,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: company.name },
  };
}

/**
 * ProfessionalService schema for the services offered — helps search engines
 * understand the business type and offerings.
 */
export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: siteUrl,
    image: ogImage,
    priceRange: "$$",
    areaServed: "IN",
    serviceType: [
      "Business Excellence Consulting",
      "Digital Transformation",
      "Quality Management",
      "ISO Management",
      "Lean Manufacturing Consulting",
    ],
  };
}
