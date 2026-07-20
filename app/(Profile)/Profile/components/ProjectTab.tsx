
import { motion } from "framer-motion";
import { ExternalLink, Plus } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProfileUser } from "@/lib/types/profile.type";

function getProjectColors(title: string) {
  const pairs = [
    ["#3B82F6", "#8B5CF6"], // blue to purple
    ["#EC4899", "#F43F5E"], // pink to rose
    ["#10B981", "#05C8C8"], // emerald to teal
    ["#F59E0B", "#EF4444"], // amber to red
    ["#8B5CF6", "#D946EF"]  // purple to fuchsia
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % pairs.length;
  return { color1: pairs[index][0], color2: pairs[index][1] };
}

export function ProjectsTab({ user }: { user: ProfileUser }) {
  const USER = user;
  const projectsList = USER.projects ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            Projects
          </h2>
          <p className="text-[12px] text-white/40 mt-0.5">
            {projectsList.length} projects
          </p>
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
          <Plus size={13} /> Add Project
        </motion.button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {projectsList.map((project, i) => {
          const { color1, color2 } = getProjectColors(project.title);
          const techStack = project.techStack ?? [];
          const isFeatured = i === 0; // Mock first project as featured for visual interest

          return (
            <motion.div
              key={project._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 28px 80px rgba(0,0,0,0.5)" }}
              className="rounded-[24px] overflow-hidden flex flex-col"
              style={{
                background: "rgba(22,34,54,0.65)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div
                className="h-24 relative"
                style={{
                  background: `linear-gradient(135deg, ${color1}, ${color2})`,
                }}
              >
                {isFeatured && (
                  <span
                    className="absolute top-3 right-3 text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{ background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.9)" }}
                  >
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-bold text-white text-[15px]"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                </div>
                <p className="text-[12px] text-white/45 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {techStack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md text-white/35"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className="flex gap-3 pt-3 mt-auto"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors"
                    >
                      <FaGithub size={11} /> GitHub
                    </a>
                  )}
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors ml-auto"
                    >
                      <ExternalLink size={11} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}