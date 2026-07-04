"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/data";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const router = useRouter();
  return (
    <section id="pricing" className="bg-[var(--navy-mid)] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <Zap className="w-3.5 h-3.5 text-[var(--teal)]" />
            <span className="text-sm text-[var(--teal)] font-medium">Simple, transparent pricing</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Invest in your career.
            <br />
            <span className="gradient-text">Cancel anytime.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            One month of Pro pays for itself with a single salary negotiation. Start free, upgrade when you're ready.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-3xl border overflow-hidden flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-b from-[var(--navy-light)] to-[var(--navy)] border-[rgba(5,200,200,0.35)] shadow-[0_0_60px_rgba(5,200,200,0.12)]"
                  : "bg-[var(--navy-light)] border-white/5"
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--teal)] to-transparent" />
              )}
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--teal)] text-[var(--navy)]">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex-1">
                <p
                  className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-white/40 text-base mb-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-white/40 text-sm mb-8">{plan.desc}</p>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.highlight
                            ? "bg-[rgba(5,200,200,0.15)] text-[var(--teal)]"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <Button onClick={() => router.push(`/Payment?plan=${plan.name.toLowerCase()}`)}
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                  className={`w-full py-5 rounded-2xl font-bold text-sm ${
                    plan.highlight
                      ? "bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] btn-glow"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-sm mt-8"
        >
          All plans include 14-day money-back guarantee · No credit card required for Free
        </motion.p>
      </div>
    </section>
  );
}