"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { IconArrowRight } from "@/components/icons";
import { company } from "@/lib/content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Gradient-blue diagonal accent echoing the logo's V stroke */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-brand opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[130%] w-1/2 -skew-x-12 bg-gradient-to-b from-gradient-start/25 to-transparent"
        aria-hidden="true"
      />
      {/* Subtle watermark mark */}
      <div
        className="pointer-events-none absolute -bottom-10 right-6 select-none text-[12rem] font-black leading-none text-white/[0.03] sm:text-[16rem]"
        aria-hidden="true"
      >
        360
      </div>

      <Container className="relative py-24 sm:py-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-gold"
          >
            {company.strapline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {company.tagline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/80 sm:text-xl"
          >
            {company.subTagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/60"
          >
            {company.positioning}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
            >
              Explore Services
              <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
            >
              Talk to Us
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
