"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck } from "@/components/icons";

type Tab = { key: string; label: string; items: string[] };

export function ExploreTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="rounded-2xl border border-navy/5 bg-white p-6 shadow-card sm:p-8">
      <div
        role="tablist"
        aria-label="Explore capabilities"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-navy text-white"
                  : "bg-surface-alt text-navy/70 hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current?.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {current?.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-lg bg-surface-alt px-4 py-3 text-sm font-medium text-navy"
            >
              <IconCheck className="h-4 w-4 shrink-0 text-gold" />
              {item}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
