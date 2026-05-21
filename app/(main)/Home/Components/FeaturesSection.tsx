"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/data";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[var(--navy-mid)] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <span className="text-sm text-[var(--teal)] font-medium">Everything you need to win</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Features built for
            <br />
            <span className="gradient-text">modern job seekers</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            From ATS scoring to AI rewrites, every tool you need to go from ignored to interview.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl bg-[var(--navy-light)] border border-white/5 p-7 overflow-hidden hover:border-[rgba(5,200,200,0.2)] transition-all duration-300"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feat.color} pointer-events-none`}
                style={{ opacity: 0 }}
              />
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${feat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="text-3xl mb-5">{feat.icon}</div>
              <h3
                className="text-lg font-bold text-white mb-3 group-hover:text-[var(--teal)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {feat.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}