"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText, Upload } from "lucide-react";
import GlassCard from "./GlassCard";
import { useState } from "react";


export function ResumeTab() {
  const [dragging, setDragging] = useState(false);


  return (
    <GlassCard className="p-8" hover={false}>
      <h2 className="text-[18px] font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
        Resume Management
      </h2>

      {/* Current file */}
      <div
        className="p-5 rounded-2xl mb-5 flex items-center justify-between gap-4"
        style={{
          background: "rgba(5,200,200,0.05)",
          border: "1px solid rgba(5,200,200,0.14)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(5,200,200,0.14)" }}
          >
            <FileText size={17} style={{ color: "#05C8C8" }} />
          </div>
          <div>
            <p className="font-semibold text-white text-[13px]">alex-chen-resume-2024.pdf</p>
            <p className="text-[11px] text-white/40 mt-0.5">248 KB · Uploaded Mar 15, 2024 · Version 3</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[Eye, Download].map((Icon, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.08 }}
              className="p-2 rounded-lg text-white/40 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <Icon size={13} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <motion.div
        onHoverStart={() => setDragging(true)}
        onHoverEnd={() => setDragging(false)}
        animate={{
          borderColor: dragging ? "rgba(5,200,200,0.5)" : "rgba(255,255,255,0.07)",
          background: dragging ? "rgba(5,200,200,0.03)" : "transparent",
        }}
        className="rounded-2xl p-12 text-center cursor-pointer mb-6 transition-all"
        style={{ border: "2px dashed rgba(255,255,255,0.07)" }}
      >
        <motion.div
          animate={{ y: dragging ? -5 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{
            background: "rgba(5,200,200,0.1)",
            border: "1px solid rgba(5,200,200,0.2)",
          }}
        >
          <Upload size={21} style={{ color: "#05C8C8" }} />
        </motion.div>
        <p className="font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
          Drop your resume here
        </p>
        <p className="text-[13px] text-white/35">PDF or DOCX up to 5 MB</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 text-[13px] font-bold px-6 py-2.5 rounded-xl"
          style={{
            background: "rgba(5,200,200,0.1)",
            color: "#05C8C8",
            border: "1px solid rgba(5,200,200,0.25)",
          }}
        >
          Browse Files
        </motion.button>
      </motion.div>

      {/* Analysis bars */}
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold">
          Analysis Results
        </p>
        {[
          { label: "ATS Compatibility", val: 87, color: "#05C8C8" },
          { label: "Keyword Coverage", val: 72, color: "#F59E0B" },
          { label: "Format Quality", val: 91, color: "#10B981" },
          { label: "Content Depth", val: 78, color: "#8B5CF6" },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-white/45">{item.label}</span>
              <span style={{ color: item.color }} className="font-semibold">{item.val}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.val}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

