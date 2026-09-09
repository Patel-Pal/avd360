"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { platformModules } from "@/lib/content";
import { moduleIcons } from "@/lib/iconMap";

export function PlatformModules() {
  const [active, setActive] = useState(platformModules[0].title);
  const current =
    platformModules.find((m) => m.title === active) ?? platformModules[0];
  const ActiveIcon = moduleIcons[current.title];

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Platform modules"
        className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
      >
        {platformModules.map((m) => {
          const Icon = moduleIcons[m.title];
          const isActive = m.title === active;
          return (
            <button
              key={m.title}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(m.title)}
              className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                isActive
                  ? "border-gold bg-gold/10 text-navy"
                  : "border-navy/10 bg-white text-navy/70 hover:border-navy/20"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-gold" : "text-navy/50"}`} />
              {m.title}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-navy/5 bg-white p-8 shadow-card"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <ActiveIcon className="h-7 w-7" />
            </span>
            <h3 className="text-2xl font-bold text-navy">{current.title}</h3>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {current.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 rounded-lg bg-surface-alt px-4 py-3 text-sm font-medium text-navy"
              >
                <span className="h-2 w-2 rotate-45 bg-gold" />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
