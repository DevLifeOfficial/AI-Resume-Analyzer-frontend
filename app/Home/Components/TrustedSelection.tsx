"use client";

import { motion } from "framer-motion";
import { TRUSTED_LOGOS } from "@/data";

export default function TrustedSection() {
  const doubled = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section className="bg-[var(--navy)] border-y border-[rgba(5,200,200,0.08)] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-white/30 text-sm tracking-widest uppercase font-medium">
          Candidates who got hired at
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--navy)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--navy)] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-12"
          animate={{ x: [0, -50 * TRUSTED_LOGOS.length] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ width: "max-content" }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-6 py-3 rounded-xl bg-white/3 border border-white/6 min-w-[120px]"
            >
              <span
                className="text-lg font-bold whitespace-nowrap"
                style={{
                  color: logo.color,
                  opacity: 0.7,
                  fontFamily: "var(--font-display)",
                  filter: "grayscale(30%)",
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}