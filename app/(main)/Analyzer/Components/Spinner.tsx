"use client";
import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-4 h-4 border-2 border-[var(--navy)]/40 border-t-[var(--navy)] rounded-full"
    />
  );
}