"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  description?: string;
  /** Rendered when not editing */
  renderView: () => ReactNode;
  /** Rendered when editing. Receives the current draft state via render props isn't
   *  needed here — the parent section owns its own draft state and passes it in. */
  renderEdit: () => ReactNode;
  onSave: () => Promise<void> | void;
  onCancel?: () => void;
  saving?: boolean;
  saveDisabled?: boolean;
  className?: string;
}

export function SectionCard({
  title,
  description,
  renderView,
  renderEdit,
  onSave,
  onCancel,
  saving,
  saveDisabled,
  className,
}: SectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    await onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsEditing(false);
  };

  return (
    <Card className={`rounded-2xl border-border/80 transition-shadow hover:shadow-[var(--shadow-card)] ${className ?? ""}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0">
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label={`Edit ${title}`}
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isEditing ? "edit" : "view"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isEditing ? renderEdit() : renderView()}
          </motion.div>
        </AnimatePresence>

        {isEditing && (
          <div className="flex items-center gap-2 justify-end pt-2 border-t border-border/60 mt-4">
            <Button variant="ghost" size="sm" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving || saveDisabled}>
              {saving && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}