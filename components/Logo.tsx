import Link from "next/link";
import { company, logoSrc } from "@/lib/content";

/**
 * Navbar / footer logo.
 *
 * Uses the brand logo asset from `logoSrc` (see lib/content.ts). By default
 * this is the generated `/logo.svg` placeholder that matches the brand.
 * To use the real artwork, drop `logo.jpeg` into /public and set
 * `logoSrc = "/logo.jpeg"` in lib/content.ts.
 *
 * A plain <img> is used (rather than next/image) so both SVG and JPEG assets
 * work without extra next.config image settings.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className ?? ""}`}
      aria-label={`${company.name} home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={`${company.name} logo`}
        width={200}
        height={60}
        className="h-12 w-auto object-contain md:h-14"
      />
      <span className="sr-only">{company.name}</span>
    </Link>
  );
}
