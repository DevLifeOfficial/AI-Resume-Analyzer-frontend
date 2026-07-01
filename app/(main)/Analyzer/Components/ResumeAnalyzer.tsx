"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UPLOAD_RESUME, ANALYZE_RESUME } from "@/GraphQL/graphql";
import { EXPERIENCE_LEVELS, FOCUS_OPTIONS, PROFESSIONS } from "@/data";
import { useMutation } from "@apollo/client/react";
import Spinner from "./Spinner";

interface AnalysisResponse {
  atsScore: number;
  keywords: string[];
  suggestions: string[];
  strengths: string[];
  confidence: number | null;
}

interface UploadResumeResult {
  uploadResume: {
    _id: string;
    filename: string;
    createdAt: string;
  };
}

interface AnalyzeResumeResult {
  analyzeResume: AnalysisResponse;
}

const ALLOWED_MIMETYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;

type Phase = "idle" | "uploading" | "analyzing" | "done" | "error";

// Read a File as base64, stripping the data: URL prefix
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [profession, setProfession] = useState(PROFESSIONS[0]);
  const [experience, setExperience] = useState(EXPERIENCE_LEVELS[0].value);
  const [focus, setFocus] = useState(FOCUS_OPTIONS[0].value);
  const [jobDescriptionText, setJobDescriptionText] = useState("");

  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadResume] = useMutation<UploadResumeResult>(UPLOAD_RESUME);
  const [analyzeResume] = useMutation<AnalyzeResumeResult>(ANALYZE_RESUME);

  const validateAndSetFile = useCallback((candidate: File) => {
    setErrorMessage(null);
    if (!ALLOWED_MIMETYPES.includes(candidate.type)) {
      setErrorMessage("Only PDF and DOCX files are supported.");
      return;
    }
    if (candidate.size > MAX_FILE_BYTES) {
      setErrorMessage("File is too large. Max size is 5MB.");
      return;
    }
    setFile(candidate);
    setPhase("idle");
    setAnalysis(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) validateAndSetFile(dropped);
    },
    [validateAndSetFile]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) validateAndSetFile(selected);
  };

  const buildJobDescription = (): string | undefined => {
    const focusLabel =
      FOCUS_OPTIONS.find((f) => f.value === focus)?.label ?? "";
    const experienceLabel =
      EXPERIENCE_LEVELS.find((l) => l.value === experience)?.label ?? "";

    const parts: string[] = [
      `Target profession: ${profession}`,
      `Experience level: ${experienceLabel}`,
      `Analysis focus: ${focusLabel}`,
    ];

    if (focus === "tailor" && jobDescriptionText.trim()) {
      parts.push(`Job description:\n${jobDescriptionText.trim()}`);
    }

    return parts.join("\n");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setErrorMessage("Please choose a resume file first.");
      return;
    }

    setErrorMessage(null);

    try {
      // 1. Upload
      setPhase("uploading");
      const fileBase64 = await fileToBase64(file);

      const uploadRes = await uploadResume({
        variables: {
          createResumeInput: {
            fileBase64,
            filename: file.name,
            mimetype: file.type,
          },
        },
      });

      const resumeId = uploadRes.data?.uploadResume?._id;
      if (!resumeId) {
        throw new Error("Upload succeeded but no resume ID was returned.");
      }

      // 2. Analyze
      setPhase("analyzing");
      const analyzeRes = await analyzeResume({
        variables: {
          analyzeResumeInput: {
            resumeId,
            jobDescription: buildJobDescription(),
          },
        },
      });

      const result = analyzeRes.data?.analyzeResume;
      if (!result) {
        throw new Error("Analysis did not return a result.");
      }

      setAnalysis(result);
      setPhase("done");
    } catch (err: any) {
      const message =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        "Something went wrong while analyzing your resume.";
      setErrorMessage(message);
      setPhase("error");
    }
  };

  const reset = () => {
    setFile(null);
    setAnalysis(null);
    setErrorMessage(null);
    setPhase("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isBusy = phase === "uploading" || phase === "analyzing";

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
            <span className="text-sm text-[var(--teal)] font-medium">
              Upload your real resume
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            See the AI in action
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Drop in your resume, tell us a bit about the role, and we'll
            score it and tell you exactly what to fix.
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
            <div
              onClick={() => !isBusy && fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`upload-zone rounded-3xl p-8 text-center cursor-pointer bg-[var(--navy-light)] ${
                isDragOver ? "drag-over" : ""
              } ${isBusy ? "opacity-60 pointer-events-none" : ""}`}
            >
              <input
                title="Upload Resume" 
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <div className="w-14 h-14 rounded-2xl bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <p
                className="text-white font-semibold mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isDragOver ? "Drop it here" : "Drop your resume here"}
              </p>
              <p className="text-white/40 text-sm mb-4">
                PDF or DOCX — up to 5MB
              </p>

              {file ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(5,200,200,0.08)] border border-[rgba(5,200,200,0.15)] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[var(--teal)]" />
                  </div>
                  <span className="text-xs text-white/60">{file.name}</span>
                  <button
                    title="Remove file"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                    className="text-white/30 hover:text-white/70"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs text-white/30">
                  Click or drag a file to upload
                </span>
              )}
            </div>

            {/* Context selects */}
            <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-5 space-y-4">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                Tell us about the role
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">
                    Profession
                  </label>
                  <select
                    title="Select Profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    disabled={isBusy}
                    className="w-full bg-[var(--navy)] border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)]"
                  >
                    {PROFESSIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/40 block mb-1.5">
                    Experience
                  </label>
                  <select
                    title="Select Experience Level"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    disabled={isBusy}
                    className="w-full bg-[var(--navy)] border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)]"
                  >
                    {EXPERIENCE_LEVELS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40 block mb-1.5">
                  Analysis focus
                </label>
                <select
                 title="Select Analysis Focus"
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  disabled={isBusy}
                  className="w-full bg-[var(--navy)] border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)]"
                >
                  {FOCUS_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <AnimatePresence>
                {focus === "tailor" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-xs text-white/40 block mb-1.5">
                      Paste the job description
                    </label>
                    <textarea
                      value={jobDescriptionText}
                      onChange={(e) => setJobDescriptionText(e.target.value)}
                      disabled={isBusy}
                      rows={4}
                      placeholder="Paste the job posting here for a targeted match..."
                      className="w-full bg-[var(--navy)] border border-white/10 rounded-xl px-3 py-2 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)] resize-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-2 text-xs text-red-400 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-2xl px-4 py-3">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              onClick={phase === "done" ? reset : handleAnalyze}
              disabled={isBusy || (!file && phase !== "done")}
              className="w-full bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold py-6 rounded-2xl text-base btn-glow disabled:opacity-60"
            >
              {phase === "uploading" ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Uploading resume…
                </span>
              ) : phase === "analyzing" ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Analyzing…
                </span>
              ) : phase === "done" ? (
                "Try Another Resume →"
              ) : (
                "⚡ Analyze My Resume"
              )}
            </Button>
          </motion.div>

          {/* Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {phase !== "done" || !analysis ? (
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
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                          ATS Match Score
                        </p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="text-5xl font-bold text-white"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          <span className="text-[var(--teal)]">
                            {Math.round(analysis.atsScore)}
                          </span>
                          <span className="text-2xl text-white/30">/ 100</span>
                        </motion.div>
                        {analysis.confidence != null && (
                          <p className="text-yellow-400 text-xs mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Confidence: {Math.round(analysis.confidence * 100)}%
                          </p>
                        )}
                      </div>
                      {/* Mini score ring */}
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="6"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke="var(--teal)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 32}
                          initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                          animate={{
                            strokeDashoffset:
                              2 * Math.PI * 32 * (1 - analysis.atsScore / 100),
                          }}
                          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Keywords found */}
                    {analysis.keywords.length > 0 && (
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />{" "}
                          Keywords Found
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysis.keywords.map((kw, i) => (
                            <motion.span
                              key={kw}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.4 + i * 0.06 }}
                              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.1)] text-green-400 border border-[rgba(34,197,94,0.2)]"
                            >
                              {kw}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths */}
                    {analysis.strengths.length > 0 && (
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-[var(--teal)]" />{" "}
                          Strengths
                        </p>
                        <div className="space-y-2">
                          {analysis.strengths.map((s, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.06 }}
                              className="flex items-start gap-2.5 text-xs text-white/50"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)] mt-0.5 flex-shrink-0" />
                              {s}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions / fixes */}
                    {analysis.suggestions.length > 0 && (
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-yellow-400" />{" "}
                          Suggested Fixes
                        </p>
                        <div className="space-y-2">
                          {analysis.suggestions.map((s, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.06 }}
                              className="flex items-start gap-2.5 text-xs text-white/50"
                            >
                              <AlertCircle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {s}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
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
