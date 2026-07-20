"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { ProfileUser } from "@/lib/types/profile.type";
import GlassCard from "./GlassCard";
import { NavSection } from "@/data";

interface OverviewTabProps {
  user: ProfileUser;
  onNavigate: (section: NavSection) => void;
}

export function OverviewTab({ user, onNavigate }: OverviewTabProps) {
  const recentExperience = (user.experience ?? []).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Read-only skills preview, links out to the real Skills tab for editing */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold">Top Skills</p>
            <button
              onClick={() => onNavigate("skills")}
              className="text-[11px] text-[#05C8C8] flex items-center gap-1 hover:opacity-80"
            >
              Manage <ChevronRight size={11} />
            </button>
          </div>
          {(user.skills?.length ?? 0) > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills!.slice(0, 14).map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="text-[12px] px-3 py-1.5 rounded-xl font-medium"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-white/35 italic">No skills added yet.</p>
          )}
        </GlassCard>

        {/* Experience snapshot, links out to the real Experience tab for editing */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold">
              Experience Snapshot
            </p>
            <button
              onClick={() => onNavigate("experience")}
              className="text-[11px] text-[#05C8C8] flex items-center gap-1 hover:opacity-80"
            >
              Manage <ChevronRight size={11} />
            </button>
          </div>
          {recentExperience.length > 0 ? (
            <div className="space-y-4">
              {recentExperience.map((exp) => (
                <div key={exp._id} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "#05C8C8", opacity: exp.isCurrent ? 1 : 0.55 }}
                  >
                    {exp.company?.[0] ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate">{exp.title}</p>
                    <p className="text-[11px] text-white/45 truncate">{exp.company}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-white/35 italic">No experience added yet.</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}