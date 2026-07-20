"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { useState } from "react";



import type { ProfileUser } from "@/lib/types/profile.type";

export function SettingsTab({ user }: { user: ProfileUser }) {
  const USER = user;
  const [notifs, setNotifs] = useState(true);
  const [emails, setEmails] = useState(false);


  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={onToggle}
        className="relative flex-shrink-0 transition-all"
        style={{
          width: "36px",
          height: "20px",
          borderRadius: "10px",
          background: on ? "#05C8C8" : "rgba(255,255,255,0.1)",
        }}
      >
        <span
          className="absolute top-0.5 rounded-full bg-white transition-transform"
          style={{
            width: "16px",
            height: "16px",
            left: "2px",
            transform: on ? "translateX(16px)" : "translateX(0)",
          }}
        />
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
        Settings
      </h2>

      <GlassCard className="p-6" hover={false}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold mb-4">Profile</p>
        <div className="space-y-3">
          {[
            { label: "Email", value: USER.email, type: "text" },
            { label: "Plan", value: "Pro — All features unlocked", type: "badge" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[13px] text-white/60">{item.label}</p>
              {item.type === "badge" ? (
                <span
                  className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(5,200,200,0.1)", color: "#05C8C8" }}
                >
                  {item.value}
                </span>
              ) : (
                <p className="text-[13px] text-white/35">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6" hover={false}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold mb-4">Notifications</p>
        <div className="space-y-3">
          {[
            { label: "Job match alerts", on: notifs, toggle: () => setNotifs(!notifs) },
            { label: "Weekly digest emails", on: emails, toggle: () => setEmails(!emails) },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[13px] text-white/60">{item.label}</p>
              <Toggle on={item.on} onToggle={item.toggle} />
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6" hover={false}>
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-semibold mb-4">Security</p>
        <div className="space-y-3">
          {[
            { label: "Password", value: "••••••••••", type: "text" },
            { label: "Two-factor auth", value: "Enabled", type: "green" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <p className="text-[13px] text-white/60">{item.label}</p>
              {item.type === "green" ? (
                <span
                  className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}
                >
                  {item.value}
                </span>
              ) : (
                <p className="text-[13px] text-white/35">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Danger zone */}
      <div
        className="p-6 rounded-[24px]"
        style={{
          background: "rgba(239,68,68,0.04)",
          border: "1px solid rgba(239,68,68,0.1)",
          backdropFilter: "blur(24px)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.15em] text-red-400/60 font-semibold mb-4">
          Danger Zone
        </p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] text-white font-medium">Delete Account</p>
            <p className="text-[11px] text-white/35 mt-0.5">Permanently removes all your data</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="text-[12px] font-semibold px-4 py-2 rounded-xl flex-shrink-0"
            style={{
              background: "rgba(239,68,68,0.1)",
              color: "#EF4444",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            Delete Account
          </motion.button>
        </div>
      </div>
    </div>
  );
}

