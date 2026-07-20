"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { useState } from "react";
import type { ProfileUser } from "@/lib/types/profile.type";

export function SkillsTab({ user }: { user: ProfileUser }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const skills = user.skills ?? [];

  return (
    <GlassCard className="p-8" hover={false}>
      <div className="mb-8">
        <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          Skills
        </h2>
        <p className="text-[12px] text-white/40 mt-0.5">Hover to highlight · Manage your skills</p>
      </div>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => {
            const isHovered = hovered === skill;
            return (
              <motion.span
                key={skill}
                onHoverStart={() => setHovered(skill)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-[12px] px-4 py-2 rounded-2xl cursor-default font-medium transition-all"
                style={{
                  background: isHovered ? "rgba(5,200,200,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isHovered ? "#05C8C8" : "rgba(255,255,255,0.07)"}`,
                  color: isHovered ? "#05C8C8" : "rgba(255,255,255,0.6)",
                }}
              >
                {skill}
              </motion.span>
            );
          })}
        </div>
      ) : (
        <p className="text-[12px] text-white/35 italic">No skills added yet.</p>
      )}
    </GlassCard>
  );
}