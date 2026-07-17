"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ProfileFieldConfig } from "@/lib/config/profile.config";
import { ProfileFieldInput } from "./ProfileFieldInput";

interface EntryFormDialogProps<T extends Record<string, any>> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: ProfileFieldConfig[];
  initialValue: T;
  onSubmit: (value: T) => Promise<void> | void;
  submitting?: boolean;
}

export function EntryFormDialog<T extends Record<string, any>>({
  open,
  onOpenChange,
  title,
  fields,
  initialValue,
  onSubmit,
  submitting,
}: EntryFormDialogProps<T>) {
  const [draft, setDraft] = useState<T>(initialValue);

  // Reset draft whenever a new item is opened for editing
  useEffect(() => {
    if (open) setDraft(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValue]);

  const handleChange = (name: string, value: any) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const missingRequired = fields.some((f) => f.required && !String(draft[f.name] ?? "").trim());

  const handleSubmit = async () => {
    if (missingRequired) return;
    await onSubmit(draft);
  };

  // Fields hidden because a checkbox controls them (e.g. isCurrent hides endDate)
  const hiddenFieldNames = new Set(
    fields
      .filter((f) => f.type === "checkbox" && draft[f.name])
      .flatMap((f) => f.hidesFields ?? []),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-4 py-2">
          {fields.map((field) => (
            <ProfileFieldInput
              key={field.name}
              field={field}
              value={draft[field.name]}
              onChange={handleChange}
              hidden={hiddenFieldNames.has(field.name)}
            />
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || missingRequired}>
            {submitting && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}