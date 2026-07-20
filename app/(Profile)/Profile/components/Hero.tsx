"use client";

import { Check, Clock, Eye, FileTextIcon, MapPin, Share2, ShieldCheck, Upload, Download, Zap, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";

import type { ProfileUser } from "@/lib/types/profile.type";

export function Hero({ user }: { user: ProfileUser }) {
  const USER = user;
  const initials = USER.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const checks = [
    Boolean(USER.profileSummary?.trim()),
    (USER.skills?.length ?? 0) > 0,
    (USER.interests?.length ?? 0) > 0,
    Object.values(USER.socialLinks ?? {}).some(Boolean),
    (USER.experience?.length ?? 0) > 0,
    (USER.education?.length ?? 0) > 0,
    (USER.projects?.length ?? 0) > 0,
    (USER.certificates?.length ?? 0) > 0,
  ];
  const completedCount = checks.filter(Boolean).length;
  const profileCompletion = Math.round((completedCount / checks.length) * 100);

  const location = USER.experience?.[0]?.location || "Remote";
  const lastUpdated = "Recently";
  const atsScore = 85;

  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - profileCompletion / 100);


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[18px] "
      style={{
        background: "linear-gradient(140deg, rgba(22,34,54,0.92) 0%, rgba(14,26,46,0.96) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 10% 0%, rgba(5,200,200,0.18) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 90% 100%, rgba(99,91,255,0.1) 0%, transparent 55%)",
        }}
      />
      {/* Cover strip */}
      {/* <div
        className="h-24 w-full"
        style={{
          background:
            "linear-gradient(100deg, rgba(5,200,200,0.28) 0%, rgba(14,165,233,0.14) 45%, rgba(99,91,255,0.1) 100%)",
        }}
      /> */}

      <div className="relative h-45  px-7 pb-7 -mt-10 flex flex-col lg:flex-row lg:items-end gap-5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold select-none"
            style={{
              background: "linear-gradient(135deg, rgba(5,200,200,0.22) 0%, rgba(14,165,233,0.14) 100%)",
              border: "4px solid #0D1B2E",
              color: "#05C8C8",
              fontFamily: "'Syne', sans-serif",
              boxShadow: "0 0 30px rgba(5,200,200,0.2)",
            }}
          >
            {initials}
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#05C8C8" }}
          >
            <Check size={9} color="#0D1B2E" strokeWidth={3} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1">
            <h1
              className="text-[22px] font-bold text-white leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {USER.name}
            </h1>
            {USER.plan === "PRO" && (
              <span
                className="inline-flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase"
                style={{
                  background: "rgba(5,200,200,0.1)",
                  border: "1px solid rgba(5,200,200,0.28)",
                  color: "#05C8C8",
                }}
              >
                <ShieldCheck size={9} /> PRO
              </span>
            )}
          </div>
          <p className="text-white/55 text-[13px] mb-2">{USER.role}</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/35">
            <span className="flex items-center gap-1.5">
              <MapPin size={10} /> {location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={10} /> {USER.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={10} /> Updated {lastUpdated}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <div className="text-center">
            <div
              className="text-[32px] font-bold leading-none mb-1"
              style={{ color: "#05C8C8", fontFamily: "'Syne', sans-serif" }}
            >
              {atsScore}
            </div>
            <div className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-medium">
              ATS Score
            </div>
          </div>
          <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex flex-col items-center">
            <svg width="64" height="64" className="-rotate-90">
              <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
              <motion.circle
                cx="32" cy="32" r={r}
                fill="none"
                stroke="#05C8C8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
                style={{ filter: "drop-shadow(0 0 6px rgba(5,200,200,0.55))" }}
              />
            </svg>
            <div className="text-[10px] text-white/35 font-medium -mt-1">
              {profileCompletion}% done
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {[
            { Icon: Upload, label: "Upload" },
            { Icon: Download, label: "Download" },
            { Icon: Eye, label: "Preview" },
            { Icon: Share2, label: "Share" },
          ].map(({ Icon, label }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.45)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              <Icon size={14} />
              <span className="text-[9px] uppercase tracking-wider font-semibold">{label}</span>
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-md font-semibold"
            style={{
              background: "linear-gradient(135deg, rgba(5,200,200,0.18) 0%, rgba(14,165,233,0.12) 100%)",
              border: "1px solid rgba(5,200,200,0.3)",
              color: "#05C8C8",
              boxShadow: "0 0 24px rgba(5,200,200,0.15)",
            }}
          >
            <Zap size={14} />
            <span className="text-[9px] uppercase tracking-wider">Analyze</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}