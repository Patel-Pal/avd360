import Link from "next/link";
import { Container } from "@/components/Container";
import { GoldDivider } from "@/components/SectionHeading";
import { IconMail, IconPhone } from "@/components/icons";
import { company, logoSrc, navLinks, pillars } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={`${company.name} logo`}
              width={240}
              height={72}
              className="h-auto w-56 max-w-full rounded-md bg-white p-3"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {company.tagline}. {company.subTagline}
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-gold">
              {company.strapline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2">
              {pillars.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/services#${p.id}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <IconPhone className="h-4 w-4 text-gold" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={company.emailHref}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <IconMail className="h-4 w-4 text-gold" />
                  {company.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {["in", "f", "x"].map((s) => (
                <span
                  key={s}
                  aria-hidden="true"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-xs font-semibold uppercase text-white/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <GoldDivider className="mt-12" />

        <p className="mt-6 text-center text-xs text-white/50">
          © {year} {company.name}. All rights reserved. {company.positioning}
        </p>
      </Container>
    </footer>
  );
}
