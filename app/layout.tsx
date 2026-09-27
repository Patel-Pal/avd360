import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/content";
import {
  siteUrl,
  ogImage,
  primaryKeywords,
  canonical,
  organizationJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "AVD 360 Solution is an integrated Business Excellence and Digital Transformation company in India — Consulting, Business Excellence, Quality Management, ISO Management and Digital Solutions.",
  keywords: primaryKeywords,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  applicationName: company.name,
  alternates: {
    canonical: canonical("/"),
  },
  category: "Business Consulting",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description:
      "One System. Connected Processes. Better Control. Consulting, Business Excellence, Quality, ISO and Digital Solutions.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${company.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: "One System. Connected Processes. Better Control.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
  // Add your Google Search Console verification token here when available.
  // verification: { google: "your-token" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Structured data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd()),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
