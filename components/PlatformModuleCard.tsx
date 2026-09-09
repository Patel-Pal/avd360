"use client";

import { motion } from "framer-motion";
import { moduleIcons } from "@/lib/iconMap";

export type PlatformModuleCardProps = {
  title: string;
  features: string[];
  /** Key into moduleIcons (the module title). Resolved inside this client component. */
  iconKey: string;
};

export function PlatformModuleCard({
  title,
  features,
  iconKey,
}: PlatformModuleCardProps) {
  const Icon = moduleIcons[iconKey];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-deep/60 p-6 backdrop-blur"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
