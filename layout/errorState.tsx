"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: "default" | "network";
  compact?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  variant = "default",
  compact = false,
}: ErrorStateProps) {
  const Icon = variant === "network" ? WifiOff : AlertTriangle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[var(--navy-light)] border border-red-500/20 rounded-2xl flex flex-col items-center text-center ${
        compact ? "p-4" : "p-8"
      }`}
    >
      <div
        className={`rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3 ${
          compact ? "w-9 h-9" : "w-14 h-14"
        }`}
      >
        <Icon className={compact ? "w-4 h-4 text-red-400" : "w-6 h-6 text-red-400"} />
      </div>
      {!compact && <p className="text-white font-semibold mb-1">{title}</p>}
      <p className={`text-white/40 ${compact ? "text-xs" : "text-sm"} max-w-xs`}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--teal)] hover:text-white transition-colors px-3 py-1.5 rounded-full border border-[var(--teal)]/30 hover:border-[var(--teal)]/60"
        >
          <RefreshCw className="w-3 h-3" />
          Try again
        </button>
      )}
    </motion.div>
  );
}