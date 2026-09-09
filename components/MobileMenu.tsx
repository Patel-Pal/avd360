"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/content";
import { IconClose } from "@/components/icons";

export function MobileMenu({
  open,
  onClose,
  activePath,
}: {
  open: boolean;
  onClose: () => void;
  activePath: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-72 max-w-[85%] flex-col bg-navy p-6 shadow-2xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-lg font-bold text-white">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-md p-1 text-white/80 hover:text-gold"
              >
                <IconClose className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active =
                  activePath === link.href ||
                  (link.href !== "/" && activePath.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-white/10 text-gold"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/contact"
              onClick={onClose}
              className="mt-6 rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
            >
              Get a Free Consultation
            </Link>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
