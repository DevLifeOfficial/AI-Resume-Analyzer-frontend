"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Zap, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const MOCK_KEYWORDS_FOUND = ["Python", "Machine Learning", "SQL", "Data Analysis", "Pandas"];
const MOCK_KEYWORDS_MISSING = ["TensorFlow", "Spark", "Kubernetes", "dbt", "Airflow"];
const MOCK_SUGGESTIONS = [
  { type: "success", text: "Strong quantified achievements in Experience section" },
  { type: "warning", text: "Add more technical keywords from the job description" },
  { type: "success", text: "Education section is ATS-friendly" },
  { type: "error", text: "Missing 5 critical keywords: TensorFlow, Spark, Kubernetes..." },
  { type: "success", text: "Action verbs used effectively throughout" },
];

export default function LiveDemoSection() {
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAnalyze = () => {
    setPhase("analyzing");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 400);
      }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  const reset = () => {
    setPhase("idle");
    setProgress(0);
  };

  return (
    <section className="bg-[var(--navy-mid)] py-24 overflow-hidden">
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
            <span className="text-sm text-[var(--teal)] font-medium">Try it live — no sign up</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See the AI in action
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Click "Analyze Demo Resume" to see exactly what our AI surfaces in seconds.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Upload zone */}
            <div className="upload-zone rounded-3xl p-8 text-center cursor-pointer bg-[var(--navy-light)]">
              <div className="w-14 h-14 rounded-2xl bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <p className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                Drop your resume here
              </p>
              <p className="text-white/40 text-sm mb-4">PDF, DOCX, or TXT — up to 5MB</p>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-8 h-8 rounded-lg bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.15)] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[var(--teal)]" />
                </div>
                <span className="text-xs text-white/30">sample_resume.pdf loaded</span>
              </div>
            </div>

            {/* Job description box */}
            <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-5">
              <p className="text-xs text-white/40 font-medium mb-3 uppercase tracking-wider">
                Job Description
              </p>
              <div className="space-y-1.5">
                {[95, 80, 88, 72, 91, 65, 78].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-white/5" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-[var(--teal)] bg-[rgba(5,200,200,0.1)] px-2 py-0.5 rounded-full border border-[rgba(5,200,200,0.2)]">
                  Senior Data Scientist @ Stripe
                </span>
              </div>
            </div>

            <Button
              onClick={phase === "done" ? () => {
               
                  if (isAuthenticated) { 
                    reset()
                    router.replace("/Analyzer");
                  }else {
                    router.push("/Authentication");
                  }
                } : () => handleAnalyze()}
              disabled={phase === "analyzing"}
              className="w-full bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold py-6 rounded-2xl text-base btn-glow disabled:opacity-60"
            >
              {phase === "analyzing" ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[var(--navy)]/40 border-t-[var(--navy)] rounded-full"
                  />
                  Analyzing… {Math.round(progress)}%
                </span>
              ) : phase === "done" ? (
                "Try Another Resume →"
              ) : (
                "⚡ Analyze Demo Resume"
              )}
            </Button>

            {/* Progress bar */}
            <AnimatePresence>
              {phase === "analyzing" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--teal)] to-[#0ea5e9] rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {phase !== "done" ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[420px] bg-[var(--navy-light)] border border-white/5 rounded-3xl flex flex-col items-center justify-center p-8"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-white/15" />
                  </div>
                  <p className="text-white/20 text-sm text-center">
                    Your analysis results will appear here
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[var(--navy-light)] border border-[rgba(5,200,200,0.15)] rounded-3xl overflow-hidden"
                >
                  {/* Score header */}
                  <div className="bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] p-6 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">ATS Match Score</p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="text-5xl font-bold text-white"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          <span className="text-[var(--teal)]">73</span>
                          <span className="text-2xl text-white/30">/ 100</span>
                        </motion.div>
                        <p className="text-yellow-400 text-xs mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Good — could reach 94 with AI optimization
                        </p>
                      </div>
                      {/* Mini score ring */}
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <motion.circle
                          cx="40" cy="40" r="32"
                          fill="none" stroke="var(--teal)" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 32}
                          initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - 0.73) }}
                          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Keywords found */}
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" /> Keywords Found
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {MOCK_KEYWORDS_FOUND.map((kw, i) => (
                          <motion.span
                            key={kw}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.1)] text-green-400 border border-[rgba(34,197,94,0.2)]"
                          >
                            {kw}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Keywords missing */}
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-400" /> Missing Keywords
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {MOCK_KEYWORDS_MISSING.map((kw, i) => (
                          <motion.span
                            key={kw}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 + i * 0.08 }}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(239,68,68,0.1)] text-red-400 border border-[rgba(239,68,68,0.2)]"
                          >
                            {kw}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="space-y-2">
                      {MOCK_SUGGESTIONS.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.08 }}
                          className="flex items-start gap-2.5 text-xs text-white/50"
                        >
                          {s.type === "success" ? (
                            <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : s.type === "warning" ? (
                            <AlertCircle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          {s.text}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}