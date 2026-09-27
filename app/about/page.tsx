import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { IconCheck } from "@/components/icons";
import { aboutCopy, company } from "@/lib/content";
import { canonical, pageKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "AVD 360 Solution is an integrated Business Excellence and Digital Transformation company connecting people, process and technology for sustainable growth.",
  keywords: pageKeywords.about,
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Not Just Software. A System. A Solution."
        description={company.positioning}
      />

      <section className="bg-surface py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <SectionHeading
                align="left"
                label="Our Story"
                title="Building Operational Excellence That Lasts"
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
                <p>{aboutCopy.intro}</p>
                <p>{aboutCopy.approach}</p>
                <p>{aboutCopy.commitment}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-navy/5 bg-surface-alt p-8 shadow-card">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  What Drives Us
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Better control & real-time visibility",
                    "Standardized, connected processes",
                    "Measurable performance improvement",
                    "Sustainable business growth",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-navy/80">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <PhilosophySection />

      <section className="bg-surface py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-brand p-10 text-center text-white shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Our Philosophy
              </p>
              <p className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                {company.philosophy}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/80">
                {company.strapline}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
