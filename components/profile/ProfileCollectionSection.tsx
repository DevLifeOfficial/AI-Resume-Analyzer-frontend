import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CollectionConfig } from "../../lib/config/profile/types";
import { useProfileCollection } from "../../lib/hooks/profile/useProfileCollection";
import { ProfileCard } from "./ProfileCard";
import { FormDialog } from "./FormDialog";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { EmptyState } from "./EmptyState";
import GlassCard from "@/app/(Profile)/Profile/components/GlassCard";

interface ProfileCollectionSectionProps {
  config: CollectionConfig;
  items: Record<string, unknown>[];
  icon?: React.ReactNode;
}

export function ProfileCollectionSection({
  config,
  items = [],
  icon,
}: ProfileCollectionSectionProps) {
  const {
    formOpen,
    editingIndex,
    formValues,
    errors,
    saving,
    deleteIndex,
    openAdd,
    openEdit,
    openDelete,
    closeDialogs,
    updateFormValue,
    onSave,
    onDelete,
  } = useProfileCollection({ config, items });

  const count = items.length;

  return (
    <GlassCard className="p-6 md:p-8" hover={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className="text-[16px] md:text-[18px] font-bold text-white tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {config.title}
          </h3>
          <p className="text-[11px] md:text-[12px] text-white/40 mt-0.5">
            {count} {count === 1 ? "entry" : "entries"} · {config.description}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openAdd}
          className="flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-xl"
          style={{
            background: "rgba(5,200,200,0.1)",
            color: "#05C8C8",
            border: "1px solid rgba(5,200,200,0.22)",
          }}
        >
          <Plus size={13} />
          {config.addLabel}
        </motion.button>
      </div>

      {/* List / Empty State */}
      {count === 0 ? (
        <EmptyState
          title={config.emptyMessage}
          description={`Add details to your ${config.title.toLowerCase()} to customize and improve your ATS scores.`}
          actionLabel={config.addLabel}
          onAction={openAdd}
          icon={icon}
        />
      ) : (
        <div className="space-y-3.5">
          {items.map((item, idx) => (
            <ProfileCard
              key={(item as { _id?: string | number })._id ?? idx}
              item={item}
              index={idx}
              config={config}
              onEdit={() => openEdit(idx, item)}
              onDelete={() => openDelete(idx)}
              icon={icon}
            />
          ))}
        </div>
      )}

      {/* Reusable Form Dialog */}
      <FormDialog
        open={formOpen}
        onOpenChange={(open) => (!open ? closeDialogs() : null)}
        title={editingIndex !== null ? `Edit ${config.title}` : config.addLabel}
        fields={config.fields}
        values={formValues}
        errors={errors}
        onValueChange={updateFormValue}
        onSave={onSave}
        saving={saving}
      />

      {/* Reusable Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteIndex !== null}
        onOpenChange={(open) => (!open ? closeDialogs() : null)}
        title={`Delete ${config.title} Entry?`}
        description="Are you sure you want to delete this entry? This action is permanent and will recalculate your profile completeness score."
        onConfirm={onDelete}
        loading={saving}
      />
    </GlassCard>
  );
}
