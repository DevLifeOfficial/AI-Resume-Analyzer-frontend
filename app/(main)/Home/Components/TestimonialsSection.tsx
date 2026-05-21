"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data";
import Image from "next/image";

function TestimonialCard({
  t,
  i,
}: {
  t: (typeof TESTIMONIALS)[0];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (i % 3) * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group bg-[var(--navy-light)] border border-white/5 hover:border-[rgba(5,200,200,0.2)] rounded-3xl p-6 transition-all duration-300 flex flex-col"
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--teal)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, si) => (
          <Star key={si} className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
        ))}
      </div>

      <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>

      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" unoptimized />
        </div>
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            {t.name}
          </p>
          <p className="text-white/40 text-xs">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const half1 = TESTIMONIALS.slice(0, 3);
  const half2 = TESTIMONIALS.slice(3);

  return (
    <section id="testimonials" className="bg-[var(--navy)] py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <Star className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
            <span className="text-sm text-[var(--teal)] font-medium">4.9/5 from 12,000+ reviews</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Real people.
            <br />
            <span className="gradient-text">Real results.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Join thousands of job seekers who transformed their search with ResumeAI.
          </p>
        </motion.div>

        {/* Two animated rows */}
        <div className="space-y-5">
          <motion.div style={{ x: x1 }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {half1.map((t, i) => (
              <TestimonialCard key={t.name} t={t} i={i} />
            ))}
          </motion.div>
          <motion.div style={{ x: x2 }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {half2.map((t, i) => (
              <TestimonialCard key={t.name} t={t} i={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}