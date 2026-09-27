import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { IconMail, IconPhone } from "@/components/icons";
import { company } from "@/lib/content";
import { canonical, pageKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AVD 360 Solution for a free consultation on business excellence, quality, ISO and digital transformation.",
  keywords: pageKeywords.contact,
  alternates: { canonical: canonical("/contact") },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Build Smarter Businesses Together"
        description="Tell us about your goals and challenges. We'll show you how one connected system can give you better control."
      />

      <section className="bg-surface py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            {/* Contact details */}
            <Reveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-navy">Get in Touch</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Reach out for a free consultation. We typically respond within
                    one business day.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={company.phoneHref}
                    className="flex items-center gap-4 rounded-2xl border border-navy/5 bg-surface-alt p-5 shadow-sm transition-shadow hover:shadow-card"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <IconPhone className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                        Phone
                      </span>
                      <span className="block text-base font-semibold text-navy">
                        {company.phone}
                      </span>
                    </span>
                  </a>

                  <a
                    href={company.emailHref}
                    className="flex items-center gap-4 rounded-2xl border border-navy/5 bg-surface-alt p-5 shadow-sm transition-shadow hover:shadow-card"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <IconMail className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-widest text-muted">
                        Email
                      </span>
                      <span className="block break-all text-base font-semibold text-navy">
                        {company.email}
                      </span>
                    </span>
                  </a>
                </div>

                {/* Map placeholder */}
                <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-navy/15 bg-surface-alt text-sm text-muted">
                  Map location coming soon
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-navy/5 bg-white p-7 shadow-card sm:p-9">
                <h2 className="text-2xl font-bold text-navy">Send an Enquiry</h2>
                <p className="mt-2 text-sm text-muted">
                  Fields marked <span className="text-gold">*</span> are required.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
