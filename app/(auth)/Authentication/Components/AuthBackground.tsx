"use client";

import { motion } from "framer-motion";

// ── Floating resume card 
function FloatingCard({
  style,
  delay,
  content,
}: {
  style: React.CSSProperties;
  delay: number;
  content: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: [20, 0, -10, -30],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
    >
      {content}
    </motion.div>
  );
}

// ── Particle dot ───────────────────────────────────────────────────────────
function Particle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[var(--teal)]"
      style={{ left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 2,
        ease: "easeInOut",
      }}
    />
  );
}

// ── Teal scan line ─────────────────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--teal)]/40 to-transparent pointer-events-none"
      initial={{ top: "-1%" }}
      animate={{ top: "101%" }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
    />
  );
}

// ── Score badge float ──────────────────────────────────────────────────────
const FLOATING_ELEMENTS = [
  {
    style: { top: "12%", left: "8%", transform: "rotate(-6deg)" },
    delay: 0,
    content: (
      <div className="bg-[var(--navy-light)]/80 backdrop-blur-sm border border-[rgba(5,200,200,0.2)] rounded-xl px-3 py-2 text-xs">
        <div className="text-[var(--teal)] font-bold text-sm">ATS Score</div>
        <div className="text-white font-bold text-lg">94%</div>
        <div className="text-white/40 text-[10px]">↑ from 43%</div>
      </div>
    ),
  },
  {
    style: { top: "20%", right: "6%", transform: "rotate(4deg)" },
    delay: 2,
    content: (
      <div className="bg-[var(--navy-light)]/80 backdrop-blur-sm border border-[rgba(5,200,200,0.15)] rounded-xl px-3 py-2 text-xs w-36">
        <div className="text-white/50 text-[10px] mb-1.5">Keywords Found</div>
        <div className="flex flex-wrap gap-1">
          {["React", "AWS", "Python"].map((k) => (
            <span key={k} className="px-1.5 py-0.5 bg-[rgba(5,200,200,0.12)] text-[var(--teal)] rounded text-[9px]">
              {k}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    style: { bottom: "22%", left: "6%", transform: "rotate(3deg)" },
    delay: 4,
    content: (
      <div className="bg-[var(--navy-light)]/80 backdrop-blur-sm border border-[rgba(240,180,41,0.2)] rounded-xl px-3 py-2 text-xs">
        <div className="text-[var(--gold)] font-bold text-sm">🎯 Match</div>
        <div className="text-white font-bold">3.2× interviews</div>
      </div>
    ),
  },
  {
    style: { bottom: "18%", right: "8%", transform: "rotate(-3deg)" },
    delay: 1.5,
    content: (
      <div className="bg-[var(--navy-light)]/80 backdrop-blur-sm border border-[rgba(34,197,94,0.2)] rounded-xl px-3 py-2 text-xs w-40">
        <div className="text-green-400 text-[10px] mb-1">AI Suggestion</div>
        <div className="space-y-1">
          {[85, 65, 90].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  id: i,
}));

export function AuthBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep navy base */}
      <div className="absolute inset-0 bg-[var(--navy)]" />

      {/* Mesh radials */}
      <div className="absolute inset-0 hero-mesh opacity-70" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,200,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,200,200,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scan line */}
      <ScanLine />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
      ))}

      {/* Floating cards */}
      {FLOATING_ELEMENTS.map((el, i) => (
        <FloatingCard key={i} style={el.style} delay={el.delay} content={el.content} />
      ))}

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--navy)] to-transparent" />
    </div>
  );
}