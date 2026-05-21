"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HERO, STATS } from "@/data";

const floatVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Animated score ring mock
function ScoreMock() {
  const circumference = 2 * Math.PI * 45;
  const progress = 0.91;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-8 -right-4 md:right-8 bg-[var(--navy-mid)]/95 backdrop-blur-xl border border-[rgba(5,200,200,0.2)] rounded-2xl p-4 shadow-2xl w-36"
    >
      <p
        className="text-[10px] text-white/40 font-medium mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ATS SCORE
      </p>
      <div className="relative inline-flex items-center justify-center w-16 h-16 mx-auto block">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <motion.span
          className="absolute text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          91%
        </motion.span>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className="w-3 h-3 text-green-400" />
        <span className="text-[10px] text-green-400 font-medium">
          +49% vs before
        </span>
      </div>
    </motion.div>
  );
}

function KeywordMock() {
  const keywords = ["React", "TypeScript", "Node.js", "AWS", "CI/CD"];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-12 -left-4 md:left-4 bg-[var(--navy-mid)]/95 backdrop-blur-xl border border-[rgba(5,200,200,0.2)] rounded-2xl p-4 shadow-2xl w-48"
    >
      <p
        className="text-[10px] text-white/40 font-medium mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        MISSING KEYWORDS
      </p>
      <div className="flex flex-wrap gap-1">
        {keywords.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(5,200,200,0.12)] text-[var(--teal)] border border-[rgba(5,200,200,0.2)]"
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--navy)]"
    >
      {/* Mesh background */}
      <div className="absolute inset-0 hero-mesh" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,200,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,200,200,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                custom={0}
                variants={floatVariants}
                initial="initial"
                animate="animate"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
                  <Zap className="w-3.5 h-3.5 text-[var(--teal)]" />
                  <span className="text-sm text-[var(--teal)] font-medium">
                    {HERO.badge}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                custom={1}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {HERO.headline[0]},
                <br />
                {HERO.headline[1]},
                <br />
                <span className="gradient-text">{HERO.subheadline}</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg"
              >
                {HERO.body}
              </motion.p>

              <motion.div
                custom={3}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button className="bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold text-base px-8 py-6 rounded-2xl btn-glow group">
                  {HERO.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 text-base px-8 py-6 rounded-2xl"
                >
                  Watch Demo
                </Button>
              </motion.div>

              <motion.p
                custom={4}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="text-white/30 text-sm mt-4 flex items-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                {HERO.ctaSub}
              </motion.p>

              {/* Inline stats */}
              <motion.div
                custom={5}
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/5"
              >
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-2xl font-bold text-white mb-0.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-white/40">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Visual mock */}
            <motion.div
              custom={2}
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Main resume card */}
              <div className="relative w-full max-w-md">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  {/* Resume mockup */}
                  <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Header bar */}
                    <div className="bg-gradient-to-r from-[var(--navy)] to-[var(--navy-light)] px-6 py-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="ml-3 text-white/40 text-xs">
                        resume_optimized.pdf
                      </span>
                    </div>

                    {/* Resume content mockup */}
                    <div className="p-6 space-y-3">
                      <div className="space-y-1.5">
                        <div className="h-5 w-40 bg-gray-200 rounded" />
                        <div className="h-3 w-56 bg-gray-100 rounded" />
                      </div>
                      <div className="h-px bg-gray-100 my-3" />
                      <div className="space-y-2">
                        {[90, 80, 95, 70, 85].map((w, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <div
                              className={`h-2.5 rounded-full ${i === 0 ? "bg-[var(--teal)]" : "bg-gray-200"}`}
                              style={{ width: `${w}%` }}
                            />
                          </div>
                        ))}
                      </div>
                      {/* AI analysis overlay */}
                      <div className="mt-4 bg-[rgba(5,200,200,0.06)] border border-[rgba(5,200,200,0.15)] rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-3 h-3 text-[var(--teal)]" />
                          <span
                            className="text-xs font-semibold text-[var(--teal)]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            AI Suggestion
                          </span>
                        </div>
                        <div className="space-y-1">
                          {[85, 65, 90].map((w, i) => (
                            <div
                              key={i}
                              className="h-2 rounded-full bg-gray-100"
                              style={{ width: `${w}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating overlays */}
                <ScoreMock />
                <KeywordMock />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--navy)] to-transparent" />
    </section>
  );
}
