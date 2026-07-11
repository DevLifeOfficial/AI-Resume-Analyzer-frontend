"use client";

import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import { useState } from "react";
import { SectionCard } from "./SectionCard";
import { TagInput } from "./TagInput";
import { UpdateProfileInput } from "@/lib/types/profile.type";


interface TagSectionProps {
  title: string;
  description?: string;
  emptyMessage: string;
  placeholder?: string;
  values: string[];
  /** Which UpdateProfileInput key this section owns — "skills" | "interests" */
  fieldKey: "skills" | "interests";
  maxTags?: number;
}

export function TagSection({
  title,
  description,
  emptyMessage,
  placeholder,
  values,
  fieldKey,
  maxTags,
}: TagSectionProps) {
  const [draft, setDraft] = useState<string[]>(values);
  const { updateProfile, saving } = useUpdateProfile();

  return (
    <SectionCard
      title={title}
      description={description}
      renderView={() =>
        values.length > 0 ? (
          <TagInput values={values} onChange={() => {}} disabled />
        ) : (
          <p className="text-sm text-muted-foreground italic">{emptyMessage}</p>
        )
      }
      renderEdit={() => (
        <TagInput
          values={draft}
          onChange={setDraft}
          placeholder={placeholder}
          maxTags={maxTags}
        />
      )}
      saving={saving}
      onCancel={() => setDraft(values)}
      onSave={async () => {
        const input: UpdateProfileInput = { [fieldKey]: draft };
        await updateProfile(input);
      }}
    />
  );
}