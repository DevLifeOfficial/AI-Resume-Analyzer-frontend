"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Pencil, Trash2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EntryFormDialog } from "./EntryFormDialog";
import { CollectionConfig } from "@/lib/config/profile.config";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import { UpdateProfileInput } from "@/lib/types/profile.type";

interface CollectionSectionProps {
  config: CollectionConfig;
  items: Record<string, any>[];
}

function emptyItemFor(config: CollectionConfig): Record<string, any> {
  return Object.fromEntries(
    config.fields.map((f) => [f.name, f.type === "tags" ? [] : f.type === "checkbox" ? false : ""]),
  );
}

export function CollectionSection({ config, items }: CollectionSectionProps) {
  const { updateProfile, saving } = useUpdateProfile();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openAdd = () => {
    setEditingIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (index: number) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const saveEntry = async (value: Record<string, any>) => {
    const next = [...items];
    // Strip fields hidden by isCurrent-style toggles so we don't persist stale dates
    const cleaned = { ...value };
    if (cleaned.isCurrent) cleaned.endDate = undefined;

    if (editingIndex === null) {
      next.push(cleaned);
    } else {
      next[editingIndex] = { ...next[editingIndex], ...cleaned };
    }

    const input: UpdateProfileInput = { [config.key]: next };
    await updateProfile(input);
    setDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;
    const next = items.filter((_, i) => i !== deleteIndex);
    const input: UpdateProfileInput = { [config.key]: next };
    await updateProfile(input);
    setDeleteIndex(null);
  };

  const currentDraft =
    editingIndex !== null ? { ...emptyItemFor(config), ...items[editingIndex] } : emptyItemFor(config);

  return (
    <Card className="rounded-2xl border-border/80">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0">
          <CardTitle className="text-base">{config.title}</CardTitle>
          <CardDescription className="mt-0.5">{config.description}</CardDescription>
        </div>
        <Button size="sm" variant="outline" onClick={openAdd} className="shrink-0 gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{config.addLabel}</span>
        </Button>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center py-10 px-4 rounded-xl border border-dashed border-border">
            <Inbox className="w-5 h-5 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground italic">{config.emptyMessage}</p>
            <Button size="sm" variant="ghost" onClick={openAdd} className="gap-1.5 mt-1">
              <Plus className="w-3.5 h-3.5" />
              {config.addLabel}
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div
                  key={item._id ?? `${config.key}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border p-3.5 bg-card/60 hover:border-primary/30 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{config.getTitle(item)}</p>
                    {config.getSubtitle(item) && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{config.getSubtitle(item)}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Edit ${config.getTitle(item)}`}
                      onClick={() => openEdit(index)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      aria-label={`Delete ${config.getTitle(item)}`}
                      onClick={() => setDeleteIndex(index)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>

      <EntryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingIndex === null ? config.addLabel : `Edit ${config.title.slice(0, -1) || config.title}`}
        fields={config.fields}
        initialValue={currentDraft}
        onSubmit={saveEntry}
        submitting={saving}
      />

      <AlertDialog open={deleteIndex !== null} onOpenChange={(open) => !open && setDeleteIndex(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This can't be undone. The entry will be permanently removed from your profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={saving}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}