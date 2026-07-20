"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import type { ProfileUser } from "@/lib/types/profile.type";
import GlassCard from "./GlassCard";
import { NavSection } from "@/data";


interface InsightsPanelProps {
  user: ProfileUser;
  onNavigate: (section: NavSection) => void;
}

export function InsightsPanel({ user, onNavigate }: InsightsPanelProps) {
  const checks: { label: string; done: boolean; section: NavSection }[] = [
    { label: "Add a profile summary", done: Boolean(user.profileSummary?.trim()), section: "overview" },
    { label: "Add your skills", done: (user.skills?.length ?? 0) > 0, section: "skills" },
    { label: "Add your interests", done: (user.interests?.length ?? 0) > 0, section: "overview" },
    {
      label: "Link a social profile",
      done: Object.values(user.socialLinks ?? {}).some(Boolean),
      section: "overview",
    },
    { label: "Add work experience", done: (user.experience?.length ?? 0) > 0, section: "experience" },
    { label: "Add education", done: (user.education?.length ?? 0) > 0, section: "education" },
    { label: "Showcase a project", done: (user.projects?.length ?? 0) > 0, section: "projects" },
    { label: "Add a certificate", done: (user.certificates?.length ?? 0) > 0, section: "certificates" },
  ];

  const completed = checks.filter((c) => c.done).length;
  const completion = Math.round((completed / checks.length) * 100);
  const missing = checks.filter((c) => !c.done);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-1">
        <Sparkles size={13} style={{ color: "#05C8C8" }} />
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/40">Profile Insights</p>
      </div>

      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] text-white/40">Completeness</p>
          <TrendingUp size={13} style={{ color: "#10B981" }} />
        </div>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-[30px] font-bold leading-none text-white font-display">{completion}</span>
          <span className="text-white/25 text-sm pb-1">%</span>
        </div>
        <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(to right, #05C8C8, #10B981)" }}
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 1.1, delay: 0.3 }}
          />
        </div>
      </GlassCard>

      <GlassCard className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-white/40">Skills</p>
          <p className="text-lg font-display font-semibold text-white">{user.skills?.length ?? 0}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-white/40">Experience</p>
          <p className="text-lg font-display font-semibold text-white">{user.experience?.length ?? 0}</p>
        </div>
      </GlassCard>

      {missing.length > 0 ? (
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={11} style={{ color: "#F59E0B" }} />
            <p className="text-[11px] text-white/40">Suggested next steps</p>
          </div>
          <ul className="space-y-2">
            {missing.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.section)}
                  className="w-full flex items-center gap-2 text-left text-[11px] text-white/50 hover:text-white/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(5,200,200,0.6)" }} />
                  <span className="truncate">{item.label}</span>
                  <ChevronRight size={10} className="ml-auto flex-shrink-0 opacity-60" />
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>
      ) : (
        <GlassCard className="p-4 flex items-center gap-2">
          <CheckCircle2 size={14} style={{ color: "#10B981" }} />
          <p className="text-[11px] text-white/60">Your profile is complete!</p>
        </GlassCard>
      )}
    </div>
  );
}