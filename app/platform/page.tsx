import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";
import { PlatformModules } from "@/components/PlatformModules";
import { IconCheck, IconTasks, IconDocs } from "@/components/icons";
import { platformHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "AVD 360 Platform",
  description:
    "The AVD 360 Digital Business Platform — an integrated digital business-management platform connecting all departments with real-time visibility and control.",
};

const highlightIcons = [IconTasks, IconDocs];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        label="Flagship Product"
        title="AVD 360 Digital Business Platform"
        description="An integrated digital business-management platform connecting all departments with real-time visibility and control."
      />

      <section className="bg-surface py-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-muted">
              One connected platform brings Management, Production, Quality, ISO,
              Maintenance, Stores, HR and CRM &amp; Sales together — so every team
              works from the same real-time data, with automated workflows and
              live dashboards that keep the whole business in control.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface-alt py-20">
        <Container>
          <SectionHeading
            label="Modules"
            title="Eight Connected Departments"
            description="Select a module to explore its capabilities. Every module shares one database and one workflow engine."
          />
          <div className="mt-14">
            <PlatformModules />
          </div>
        </Container>
      </section>

      {/* Feature highlights */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            label="Key Capabilities"
            title="Smart, Automated & Audit-Ready"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {platformHighlights.map((h, i) => {
              const Icon = highlightIcons[i] ?? IconCheck;
              return (
                <Reveal key={h.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-2xl border border-navy/5 bg-surface-alt p-8 shadow-card">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="text-xl font-bold text-navy">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {h.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {h.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 text-sm text-navy/80"
                        >
                          <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
