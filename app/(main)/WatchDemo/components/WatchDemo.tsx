"use client";

import { CHAPTERS, HIGHLIGHTS } from "@/data";
import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";

export default function WatchDemo() {
  return (
    <main className="min-h-screen bg-[var(--navy-mid)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.2)] mb-6">
            <Clock className="w-3.5 h-3.5 text-[var(--teal)]" />
            <span className="text-sm text-[var(--teal)] font-medium">2 min 30 sec walkthrough</span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See the resume analyzer in action
          </h1>
          <p className="text-white/40 text-base max-w-2xl mb-8">
            A quick walkthrough of uploading a resume, reading the ATS score, and turning AI
            suggestions into real edits — start to finish.
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl overflow-hidden border border-white/5 bg-[var(--navy-light)] mb-4"
        >
          <div className="aspect-video">
            {/* Replace src with your real hosted demo video (YouTube/Loom/Mux embed, or a self-hosted <video> tag) */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Product walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Chapters */}
        <div className="grid sm:grid-cols-2 gap-2 mb-12">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.time}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="flex items-center gap-3 bg-[var(--navy-light)] border border-white/5 rounded-xl px-4 py-3"
            >
              <span className="text-[var(--teal)] text-xs font-mono w-10 flex-shrink-0">{c.time}</span>
              <span className="text-white/60 text-sm">{c.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Explanation content */}
        <div className="border-t border-white/5 pt-10">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What you're looking at
          </h2>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-[var(--navy-light)] border border-white/5 rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center mb-3">
                  <h.icon className="w-4 h-4 text-[var(--teal)]" />
                </div>
                <p className="text-white font-medium text-sm mb-1">{h.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{h.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-[rgba(5,200,200,0.05)] border border-[rgba(5,200,200,0.15)] rounded-2xl p-5">
            <CheckCircle2 className="w-5 h-5 text-[var(--teal)] flex-shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm">
              Want to try it on your own resume instead of watching?{" "}
              <a href="/analyzer" className="text-[var(--teal)] hover:underline font-medium">
                Jump straight to the analyzer →
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}