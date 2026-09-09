import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { BenefitItem } from "@/components/BenefitItem";
import { USPCard } from "@/components/USPCard";
import { CTASection } from "@/components/CTASection";
import { businessBenefits, whyChooseUs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Business benefits and the reasons organizations choose AVD 360 — all departments on one platform, real-time data, reduced cost and future-ready technology.",
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        label="Why Us"
        title="The AVD 360 Advantage"
        description="Real, measurable benefits and the reasons organizations trust us to transform how they operate."
      />

      {/* Business Benefits */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            label="Business Benefits"
            title="Measurable Outcomes You Can Expect"
            description="Fifteen tangible improvements our clients see across visibility, efficiency, cost, quality and growth."
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
            title="Ten Reasons to Partner With Us"
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
