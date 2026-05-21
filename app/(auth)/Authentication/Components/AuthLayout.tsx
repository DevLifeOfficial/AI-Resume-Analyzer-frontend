"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import type { AuthPageConfig } from "@/lib/config/auth.config";
import { AuthBackground } from "./AuthBackground";

interface AuthLayoutProps {
  config: AuthPageConfig;
  children: React.ReactNode;
}

export function AuthLayout({ config, children }: AuthLayoutProps) {
  return (
    <div className="relative h-screen flex overflow-hidden">
      <AuthBackground />

      {/* ── Left decorative panel (lg+) ── */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 hidden lg:flex lg:w-[52%] flex-col justify-between p-12 xl:p-16 border-r border-white/[0.05]"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="w-9 h-9 rounded-xl bg-[var(--teal)] flex items-center justify-center shadow-[0_0_20px_rgba(5,200,200,0.35)]">
            <Sparkles className="w-4 h-4 text-[var(--navy)]" />
          </div>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resume<span className="text-[var(--teal)]">AI</span>
          </span>
        </Link>

        {/* ── Center content — anchored to vertical midpoint ── */}
        <div className="max-w-[400px] xl:max-w-[440px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Mode label */}
            <p className="text-[var(--teal)] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              {config.mode === "login" ? "Welcome back" : "Get started free"}
            </p>

            {/* Hero headline */}
            <h2
              className="text-4xl xl:text-[46px] font-bold text-white leading-[1.12] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {config.mode === "login" ? (
                <>Your next job<br />starts here</>
              ) : (
                <>Beat the bots.<br />Land the job.</>
              )}
            </h2>

            {/* Subtext */}
            <p className="text-white/40 text-[15px] leading-relaxed mb-8 max-w-[340px]">
              {config.mode === "login"
                ? "ResumeAI scores your resume against any job in 8 seconds — giving you an unfair advantage."
                : "Join 200k+ job seekers using AI to beat ATS systems and land more interviews."}
            </p>

            {/* Benefit bullets — now using config.bullets */}
            <ul className="space-y-3">
              {config.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[var(--teal)]" />
                  </div>
                  <span className="text-white/50 text-sm">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom trust bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center gap-8"
        >
          {[
            { value: "200k+", label: "Users" },
            { value: "94%",   label: "ATS Pass Rate" },
            { value: "4.9★",  label: "Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-white font-bold text-lg leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right: Form panel ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 lg:p-8 xl:p-10 min-h-screen overflow-y-auto">

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-[var(--teal)] flex items-center justify-center shadow-[0_0_16px_rgba(5,200,200,0.35)]">
            <Sparkles className="w-4 h-4 text-[var(--navy)]" />
          </div>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resume<span className="text-[var(--teal)]">AI</span>
          </span>
        </Link>

        {/* ── Glass card ── */}
        <div className="w-full max-w-[420px]">
          <div className="relative bg-[var(--navy-mid)]/70 backdrop-blur-2xl border border-white/[0.07] rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
            {/* Top teal accent line */}
            <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[var(--teal)]/40 to-transparent rounded-full" />

            {children}
          </div>

          {/* Legal */}
          <p className="text-center text-white/[0.18] text-xs mt-5 px-4 leading-relaxed">
            By continuing you agree to our{" "}
            <Link
              href="/terms"
              className="text-white/35 hover:text-[var(--teal)] transition-colors underline underline-offset-2 decoration-white/20"
            >
              Terms
            </Link>
            {" "}and{" "}
            <Link
              href="/privacy"
              className="text-white/35 hover:text-[var(--teal)] transition-colors underline underline-offset-2 decoration-white/20"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}