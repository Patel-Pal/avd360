import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { ExploreTabs } from "@/components/ExploreTabs";
import { IconCheck } from "@/components/icons";
import { pillarIcons } from "@/lib/iconMap";
import {
  isoStandards,
  leanTools,
  pillars,
  qualityManagementList,
  whatWeDo,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Consulting, Business Excellence, Quality Management, ISO Management and Digital Solutions — detailed capabilities from AVD 360 Solution.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Services"
        title="Five Pillars. One Connected System."
        description="Practical consulting and smart digital solutions that improve efficiency, strengthen management systems and drive sustainable growth."
      />

      {/* What We Do summary */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading label="What We Do" title="A Complete, Connected Offering" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {whatWeDo.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-navy/5 bg-surface-alt p-7 shadow-card">
                  <h3 className="text-lg font-bold text-navy">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {w.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pillar detail sections */}
      <section className="bg-surface-alt py-20">
        <Container>
          <div className="space-y-8">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[p.id];
              return (
                <Reveal key={p.id}>
                  <div
                    id={p.id}
                    className="scroll-mt-24 rounded-2xl border border-navy/5 bg-white p-7 shadow-card sm:p-9"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="flex items-center gap-4 lg:w-1/3">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                          <Icon className="h-7 w-7" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                            Pillar {String(i + 1).padStart(2, "0")}
                          </p>
                          <h2 className="text-2xl font-bold text-navy">{p.title}</h2>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <p className="text-base leading-relaxed text-muted">{p.short}</p>
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {p.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-2.5 text-sm text-navy/80"
                            >
                              <IconCheck className="h-4 w-4 shrink-0 text-gold" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Explore standards / tools / quality */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            label="Explore Capabilities"
            title="Standards, Tools & Quality Frameworks"
            description="Browse the standards we implement, the lean tools we deploy, and the quality management capabilities we deliver."
          />
          <div className="mt-14">
            <ExploreTabs
              tabs={[
                { key: "iso", label: "ISO Standards", items: isoStandards },
                { key: "lean", label: "Lean Tools", items: leanTools },
                {
                  key: "quality",
                  label: "Quality Management",
                  items: qualityManagementList,
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
