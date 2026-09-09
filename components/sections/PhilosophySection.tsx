import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { IconPeople, IconProcess, IconTechnology } from "@/components/icons";
import { company, peopleProcessTech } from "@/lib/content";

const icons = [IconPeople, IconProcess, IconTechnology];

export function PhilosophySection() {
  return (
    <section className="bg-surface-alt py-20">
      <Container>
        <SectionHeading
          label="Core Philosophy"
          title="People + Process + Technology"
          description="We connect the three forces that drive lasting excellence. Each reinforces the others to create measurable, sustainable performance."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {peopleProcessTech.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-navy/5 bg-white p-8 text-center shadow-card">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-lg font-bold uppercase tracking-[0.2em] text-navy">
            {company.philosophy}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
