import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import * as React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-md"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 mb-4 border border-white/5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-[14px] font-semibold text-white/90 mb-1">{title}</h3>
      <p className="text-[12px] text-white/40 max-w-[280px] mb-5 leading-relaxed">
        {description}
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAction}
        className="flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl text-white/80 transition-all border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
      >
        <Plus size={13} />
        {actionLabel}
      </motion.button>
    </motion.div>
  );
}
