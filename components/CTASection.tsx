import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { company } from "@/lib/content";

export function CTASection({
  title = company.closingCta,
  description = "Talk to our team about connecting your people, process and technology on one platform.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-20" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-45 bg-gold/10"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
            >
              Get a Free Consultation
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              Call {company.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
