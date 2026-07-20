import type { ProfileUser } from "@/lib/types/profile.type";
import { Plus, GraduationCap } from "lucide-react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export function EducationTab({ user }: { user: ProfileUser }) {
  const USER = user;
  const educationList = USER.education ?? [];

  return (
    <GlassCard className="p-8" hover={false}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Education
          </h2>
          <p className="text-[12px] text-white/40 mt-0.5">{educationList.length} institutions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl"
          style={{
            background: "rgba(5,200,200,0.1)",
            color: "#05C8C8",
            border: "1px solid rgba(5,200,200,0.22)",
          }}
        >
          <Plus size={13} /> Add Education
        </motion.button>
      </div>
      <div className="space-y-4">
        {educationList.map((edu, i) => {
          const years = edu.startDate
            ? `${edu.startDate} - ${edu.endDate || "Present"}`
            : "";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ x: 3 }}
              className="flex gap-5 p-5 rounded-2xl transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white/60 flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <GraduationCap size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white text-[14px]">{edu.institution}</p>
                    <p className="text-[12px] text-white/50 mt-0.5">{edu.degree}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[11px] text-white/35">{years}</p>
                    {edu.grade && <p className="text-[10px] text-white/25 mt-0.5">Grade: {edu.grade}</p>}
                  </div>
                </div>
                {edu.fieldOfStudy && (
                  <span
                    className="inline-block mt-3 text-[10px] px-2.5 py-1 rounded-full font-bold"
                    style={{
                      background: "rgba(5,200,200,0.1)",
                      color: "#05C8C8",
                      border: "1px solid rgba(5,200,200,0.2)",
                    }}
                  >
                    🎓 {edu.fieldOfStudy}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}

