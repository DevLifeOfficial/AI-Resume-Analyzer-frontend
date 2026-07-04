"use client";

import type { IconType } from "react-icons";
import {
  SiGoogle,
  SiMeta,
  SiApple,
  SiStripe,
  SiFigma,
  SiNotion,
} from "react-icons/si";
import { TRUSTED_LOGOS } from "@/data";
import { FaAmazon, FaMicrosoft } from "react-icons/fa";

const ICON_MAP: Record<string, IconType> = {
  Google: SiGoogle,
  Microsoft: FaMicrosoft,
  Amazon: FaAmazon,
  Meta: SiMeta,
  Apple: SiApple,
  Stripe: SiStripe,
  Figma: SiFigma,
  Notion: SiNotion,
};

export default function TrustedSection() {
  const doubled = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section className="bg-[var(--navy)] border-y border-[rgba(5,200,200,0.08)] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-white/30 text-sm tracking-widest uppercase font-medium">
          Candidates who got hired at
        </p>
      </div>

      {/* Marquee */}
      <div className="relative group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--navy)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--navy)] to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center gap-6 w-max animate-[trusted-scroll_24s_linear_infinite] group-hover:[animation-play-state:paused]"
        >
          {doubled.map((logo, i) => {
            const Icon = ICON_MAP[logo.name];
            return (
              <div
                key={i}
                className="group/logo relative flex flex-col items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] min-w-[140px] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.14] hover:-translate-y-0.5"
                style={{
                  ["--glow" as string]: logo.color,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 0 24px -4px ${logo.color}55` }}
                />
                {Icon ? (
                  <Icon
                    className="w-8 h-8 grayscale opacity-50 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300"
                    style={{ color: logo.color }}
                    aria-label={logo.name}
                  />
                ) : (
                  <span className="text-white/40 text-xs">{logo.name}</span>
                )}
                <span className="text-[10px] text-white/0 group-hover/logo:text-white/40 transition-colors duration-300 tracking-wide">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes trusted-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}