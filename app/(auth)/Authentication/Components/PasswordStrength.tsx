"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface PasswordStrengthProps {
  password: string;
}

type Strength = { score: number; label: string; color: string; width: string };

function getStrength(pw: string): Strength {
  if (!pw) return { score: 0, label: "", color: "transparent", width: "0%" };

  let score = 0;
  if (pw.length >= 8)          score++;
  if (pw.length >= 12)         score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: "Weak",   color: "#ef4444", width: "20%" };
  if (score === 2) return { score, label: "Fair",   color: "#f59e0b", width: "40%" };
  if (score === 3) return { score, label: "Good",   color: "#f0b429", width: "60%" };
  if (score === 4) return { score, label: "Strong", color: "#22c55e", width: "80%" };
  return { score, label: "Excellent", color: "#05c8c8", width: "100%" };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => getStrength(password), [password]);

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-1.5 overflow-hidden"
    >
      {/* Bar track */}
      <div className="h-1 w-full rounded-full bg-white/6 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: strength.width }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ backgroundColor: strength.color }}
        />
      </div>
      {/* Label */}
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-white/30">Password strength</p>
        <p
          className="text-[10px] font-semibold transition-colors"
          style={{ color: strength.color }}
        >
          {strength.label}
        </p>
      </div>
    </motion.div>
  );
}