"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="bg-[var(--navy)] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden text-center"
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-light)] via-[var(--navy-mid)] to-[var(--navy)]" />
          <div className="absolute inset-0 hero-mesh opacity-60" />
          <div className="absolute inset-0 border border-[rgba(5,200,200,0.15)] rounded-[2.5rem]" />

          {/* Glow orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--teal)]/8 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[var(--teal)] to-transparent opacity-40" />

          <div className="relative z-10 py-20 px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.25)] mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--teal)]" />
              <span className="text-sm text-[var(--teal)] font-medium">Your dream job is one upload away</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stop getting ghosted.
              <br />
              <span className="gradient-text">Start getting hired.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/50 text-lg max-w-xl mx-auto mb-10"
            >
              Join 200,000+ job seekers who used ResumeAI to land offers at Google, Stripe, Netflix, and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold text-base px-10 py-6 rounded-2xl btn-glow group animate-pulse-ring">
                Analyze My Resume — Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/10 bg-transparent text-white hover:border-white/70 hover:bg-white text-base px-10 py-6 rounded-2xl"
              >
                Book a Demo
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white/25 text-sm mt-6"
            >
              Free forever plan · No credit card required · Results in 8 seconds
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}