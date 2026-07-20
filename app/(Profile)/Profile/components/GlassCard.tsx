
import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, boxShadow: "0 28px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(5,200,200,0.08)" } : undefined}
      transition={{ duration: 0.22 }}
      className={`rounded-[14px] ${className}`}
      style={{
        background: "rgba(22,34,54,0.65)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}