"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HOW_IT_WORKS } from "@/data";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);
  const router = useRouter();
  return (
    <section id="how-it-works" className="bg-[var(--navy)] py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <span className="text-sm text-[var(--teal)] font-medium">Simple. Fast. Powerful.</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From upload to offer
            <br />
            <span className="gradient-text">in 4 simple steps</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            No tutorials, no onboarding calls. Just results in under 60 seconds.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-[39px] md:left-1/2 top-8 bottom-8 w-px bg-white/5 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--teal)] to-[#0ea5e9] origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {HOW_IT_WORKS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number — desktop center */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-20 h-20 rounded-2xl bg-[var(--navy-light)] border-2 border-[rgba(5,200,200,0.3)] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(5,200,200,0.1)]"
                    >
                      <span className="text-2xl">{step.icon}</span>
                      <span className="text-[10px] text-[var(--teal)] font-bold mt-0.5" style={{ fontFamily: "var(--font-display)" }}>
                        {step.step}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 md:w-5/12 ${isEven ? "md:pr-24" : "md:pl-24"} ${!isEven && "md:ml-auto"}`}>
                    <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-7 hover:border-[rgba(5,200,200,0.2)] transition-all duration-300 group">
                      <h3
                        className="text-xl font-bold text-white mb-3 group-hover:text-[var(--teal)] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button onClick={()=>{
              if (isAuthenticated) {
                    router.push("/Analyzer");
                  }else {
                    router.push("/Authentication");
                  }
          }} className="bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold text-base px-10 py-6 rounded-2xl btn-glow group">
            Start Your Free Analysis
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}