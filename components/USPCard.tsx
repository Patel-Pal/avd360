"use client";

import { motion } from "framer-motion";

export function USPCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-6 shadow-card"
    >
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand text-sm font-bold text-white">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-base font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}
