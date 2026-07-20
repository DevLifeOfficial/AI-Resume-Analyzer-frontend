"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,    
  Zap,
} from "lucide-react";
import type { ProfileUser } from "@/lib/types/profile.type";
import { NAV, NavSection } from "@/data";
import Link from "next/link";


interface SidebarProps {
  active: NavSection;
  onChange: (s: NavSection) => void;
  user: ProfileUser;
}

export function Sidebar({ active, onChange, user }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.aside
      animate={{ width: expanded ? 220 : 64 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      className="flex-shrink-0 flex flex-col py-5 overflow-hidden"
      style={{
        background: "rgba(9,18,34,0.97)",
        borderRight: "1px solid rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
  
         <Link href="/" className="flex items-center gap-2 group px-4 mb-7">
              <img
                src="/logo.jpg"
                alt="ResumeAI Logo"
                className="w-8 h-8 rounded-full group-hover:scale-105 transition-transform"
              />
           {expanded && ( <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume<span className="text-[var(--teal)]">AI</span>
              </span>
           )}
            </Link>
      

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2">
        {NAV.map(({ key, label, Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              aria-current={isActive ? "page" : undefined}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left overflow-hidden transition-colors group"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "rgba(5,200,200,0.1)",
                    border: "1px solid rgba(5,200,200,0.2)",
                    boxShadow: "0 0 24px rgba(5,200,200,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={16}
                className="relative flex-shrink-0 transition-colors"
                style={{ color: isActive ? "#05C8C8" : "rgba(255,255,255,0.35)" }}
              />
              <motion.span
                animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
                transition={{ duration: 0.16, delay: expanded ? 0.04 : 0 }}
                className="relative text-[13px] font-medium whitespace-nowrap transition-colors"
                style={{ color: isActive ? "#05C8C8" : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </motion.span>
            </button>
          );
        })}
      </nav>

      {/* Avatar */}
      <div className="px-2 pt-3 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0"
            style={{ background: "rgba(5,200,200,0.15)", color: "#05C8C8" }}
          >
            {initials}
          </div>
          <motion.div
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.16 }}
            className="overflow-hidden"
          >
            <p className="text-[12px] font-semibold text-white whitespace-nowrap leading-tight">
              {user.name.split(" ")[0]}
            </p>
            <p className="text-[10px] text-white/30 whitespace-nowrap mt-0.5">
              {user.plan === "PRO" ? "Pro Plan" : "Free Plan"}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}