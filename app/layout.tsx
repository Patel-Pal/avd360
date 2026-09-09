import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://avd360solution.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "AVD 360 Solution is an integrated Business Excellence and Digital Transformation company — Consulting, Business Excellence, Quality Management, ISO Management and Digital Solutions.",
  keywords: [
    "Business Excellence",
    "Digital Transformation",
    "ISO Management",
    "Quality Management",
    "Lean Manufacturing",
    "Consulting",
    "AVD 360 Solution",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description:
      "One System. Connected Processes. Better Control. Consulting, Business Excellence, Quality, ISO and Digital Solutions.",
    images: [
      {
        url: "/logo.jpeg",
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
    images: ["/logo.jpeg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
