"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { pillarIcons } from "@/lib/iconMap";

export type ServiceCardProps = {
  title: string;
  short: string;
  highlights: string[];
  href: string;
  /** Key into pillarIcons (the pillar id). Resolved inside this client component. */
  iconKey: string;
  /** Show only the first N highlights (e.g. on the home page). */
  maxHighlights?: number;
};

export function ServiceCard({
  title,
  short,
  highlights,
  href,
  iconKey,
  maxHighlights,
}: ServiceCardProps) {
  const Icon = pillarIcons[iconKey];
  const items =
    typeof maxHighlights === "number"
      ? highlights.slice(0, maxHighlights)
      : highlights;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{short}</p>
      <ul className="mt-5 space-y-2">
        {items.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-navy/80">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-gold"
      >
        Learn more
        <IconArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
