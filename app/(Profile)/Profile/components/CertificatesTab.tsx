
import { motion } from "framer-motion";
import { Calendar, Plus } from "lucide-react";
import GlassCard from "./GlassCard";
import type { ProfileUser } from "@/lib/types/profile.type";

function getOrgColor(orgName?: string) {
  if (!orgName) return "#05C8C8";
  const colors = ["#FF6B6B", "#4ECDC4", "#45B6FE", "#9B5DE5", "#F15BB5", "#FEE440", "#00F5D4", "#00BBF9"];
  let hash = 0;
  for (let i = 0; i < orgName.length; i++) {
    hash = orgName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function CertificatesTab({ user }: { user: ProfileUser }) {
  const USER = user;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
          Certificates
        </h2>
        <motion.button
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl"
          style={{
            background: "rgba(5,200,200,0.1)",
            color: "#05C8C8",
            border: "1px solid rgba(5,200,200,0.22)",
          }}
        >
          <Plus size={13} /> Add Certificate
        </motion.button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {(USER.certificates ?? []).map((cert, i) => {
          const org = cert.issuingOrganization || "Unknown";
          const orgInitial = org[0] || "?";
          const color = getOrgColor(org);
          const date = cert.issueDate || "No Date";
          const credId = cert.credentialId;
          const credUrl = cert.credentialUrl;

          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
              className="p-5 rounded-[24px]"
              style={{
                background: "rgba(22,34,54,0.65)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                  style={{ background: color }}
                >
                  {orgInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-[13px] leading-snug">{cert.name}</p>
                  <p className="text-[11px] text-white/45 mt-0.5">{org}</p>
                </div>
              </div>
              <div className="text-[11px] text-white/35 space-y-1 mb-4">
                <p className="flex items-center gap-1.5">
                  <Calendar size={9} /> {date}
                </p>
                {credId && <p className="font-mono text-[10px] text-white/25">{credId}</p>}
              </div>
              {credUrl && (
                <a
                  href={credUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full text-[11px] font-bold py-2 rounded-xl"
                    style={{
                      background: "rgba(5,200,200,0.07)",
                      color: "#05C8C8",
                      border: "1px solid rgba(5,200,200,0.18)",
                    }}
                  >
                    Verify Credential
                  </motion.button>
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}