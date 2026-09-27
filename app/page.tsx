import type { Metadata } from "next";
import Link from "next/link";
import { canonical, pageKeywords } from "@/lib/seo";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { PillarStrip } from "@/components/sections/PillarStrip";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { PlatformModuleCard } from "@/components/PlatformModuleCard";
import { BenefitItem } from "@/components/BenefitItem";
import { USPCard } from "@/components/USPCard";
import { CTASection } from "@/components/CTASection";
import { IconArrowRight } from "@/components/icons";
import {
  aboutCopy,
  businessBenefits,
  pillars,
  platformModules,
  whyChooseUs,
} from "@/lib/content";

export const metadata: Metadata = {
  description:
    "AVD 360 Solution connects People, Process and Technology to deliver Business Excellence and Digital Transformation — consulting, quality, ISO management, lean and a connected digital business platform.",
  keywords: pageKeywords.home,
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarStrip />

      {/* About preview */}
      <section className="bg-surface py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                label="Who We Are"
                title="An Integrated Business Excellence & Digital Transformation Company"
                align="left"
              />
              <p className="mt-6 text-base leading-relaxed text-muted">
                {aboutCopy.intro}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {aboutCopy.approach}
              </p>
              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
              >
                Learn More
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-brand p-8 text-white shadow-card">
                <div className="absolute -right-10 -top-10 h-40 w-40 rotate-45 bg-white/10" />
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Our Approach
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-snug">
                  Connecting People, Process &amp; Technology
                </h3>
                <ul className="mt-6 space-y-3 text-sm text-white/85">
                  <li>Better control &amp; real-time visibility</li>
                  <li>Standardized, connected processes</li>
                  <li>Measurable performance improvement</li>
                  <li>Sustainable business growth</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Core Solutions */}
      <section className="bg-surface-alt py-20">
        <Container>
          <SectionHeading
            label="Core Solutions"
            title="Five Pillars That Drive Excellence"
            description="From consulting and lean excellence to quality, ISO and a connected digital platform — everything you need to run a better business."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.1}>
                <ServiceCard
                  title={p.title}
                  short={p.short}
                  highlights={p.highlights}
                  href={`/services#${p.id}`}
                  iconKey={p.id}
                  maxHighlights={4}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PhilosophySection />

      {/* AVD 360 Platform teaser */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-20" />
        <Container className="relative">
          <SectionHeading
            invert
            label="Flagship Product"
            title="The AVD 360 Digital Business Platform"
            description="An integrated digital business-management platform connecting all departments with real-time visibility and control."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformModules.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 0.08}>
                <PlatformModuleCard
                  title={m.title}
                  features={m.features}
                  iconKey={m.title}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
            >
              Explore the Platform
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Business Benefits */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            label="Business Benefits"
            title="Measurable Outcomes You Can Expect"
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessBenefits.map((b, i) => (
              <Reveal key={b} delay={(i % 3) * 0.06}>
                <BenefitItem label={b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface-alt py-20">
        <Container>
          <SectionHeading
            label="Why Choose AVD 360"
            title="Built to Give You an Edge"
            description="Ten reasons organizations partner with us to transform how they operate."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((u, i) => (
              <Reveal key={u.title} delay={(i % 3) * 0.08}>
                <USPCard index={i + 1} title={u.title} description={u.description} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
