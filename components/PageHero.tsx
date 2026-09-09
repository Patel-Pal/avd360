import { Container } from "@/components/Container";
import { GoldDivider } from "@/components/SectionHeading";

export function PageHero({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-b from-gradient-start/20 to-transparent"
        aria-hidden="true"
      />
      <Container className="relative py-20 text-center sm:py-24">
        {label && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            {label}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <GoldDivider className="mx-auto mt-6" />
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
