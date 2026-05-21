"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WORLD_IMPACT, STATS } from "@/data";

function CountUp({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
    </motion.span>
  );
}

export default function WorldImpactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="stats"
      className="bg-[var(--navy)] py-24 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <span className="text-sm text-[var(--teal)] font-medium">
              The Reality of Job Searching in 2025
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The world has changed.
            <br />
            <span className="gradient-text">Has your resume?</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            AI is now on both sides of the hiring process. Those who adapt will
            thrive. Those who don't will keep wondering why the silence.
          </p>
        </motion.div>

        {/* Impact cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {WORLD_IMPACT.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-3xl bg-[var(--navy-light)] border border-white/5 p-8 group hover:border-white/10 transition-all"
            >
              {/* Accent glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                }}
              />
              <div
                className="absolute top-0 left-8 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: item.accent }}
              />

              <div
                className="text-5xl font-bold mb-4"
                style={{
                  color: item.accent,
                  fontFamily: "var(--font-display)",
                }}
              >
                {item.stat}
              </div>
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {item.body}
              </p>
              <p className="text-white/20 text-xs italic">
                Source: {item.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--teal)]/10 via-transparent to-[#0ea5e9]/10" />
          <div className="absolute inset-0 border border-[rgba(5,200,200,0.15)] rounded-3xl" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[var(--navy-mid)] p-8 text-center group hover:bg-[var(--navy-light)] transition-colors"
              >
                <div
                  className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-[var(--teal)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {inView && <CountUp value={stat.value} />}
                </div>
                <p className="text-white/60 font-medium text-sm mb-1">
                  {stat.label}
                </p>
                <p className="text-white/25 text-xs">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
