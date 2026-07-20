import { motion } from "framer-motion";
import { ActionMenu } from "./ActionMenu";
import { CollectionConfig } from "../../lib/config/profile/types";

interface ProfileCardProps {
  key: string | number;
  item: Record<string, unknown>;
  index: number;
  config: CollectionConfig;
  onEdit: () => void;
  onDelete: () => void;
  icon?: React.ReactNode;
}

export function ProfileCard({
  key,
  item,
  index,
  config,
  onEdit,
  onDelete,
  icon,
}: ProfileCardProps) {
  const title = config.getTitle(item);
  const subtitle = config.getSubtitle(item);

  // Extract description and tags if they exist
  const description = item.description as string | undefined;
  const tags = (item.skillsUsed || item.techStack || []) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -2 }}
      className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/3 transition-all"
    >
      {/* Icon Placeholder or Default Letter Badge */}
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 border border-white/5 shadow-inner">
        {icon || (title[0] || "?").toUpperCase()}
      </div>

      {/* Main Details */}
      <div className="flex-1 min-w-0 pr-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-semibold text-white text-[13.5px] leading-snug">
              {title}
            </h4>
            <p className="text-[11px] text-white/45 mt-0.5">{subtitle}</p>
          </div>
        </div>

        {description && (
          <p className="text-[12px] text-white/50 mt-2.5 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-lg text-white/40 bg-white/5 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right Ellipse Actions Dropdown Menu */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <ActionMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
    </motion.div>
  );
}
