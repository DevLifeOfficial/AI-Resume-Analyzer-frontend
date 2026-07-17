"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import { SectionCard } from "./SectionCard";

interface SummarySectionProps {
  profileSummary?: string;
}

const MAX_LENGTH = 2000;

export function SummarySection({ profileSummary }: SummarySectionProps) {
  const [draft, setDraft] = useState(profileSummary ?? "");
  const { updateProfile, saving } = useUpdateProfile();

  return (
    <SectionCard
      title="Profile Summary"
      description="A short bio that gives context to your resume analysis."
      renderView={() =>
        profileSummary ? (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {profileSummary}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No summary added yet.
          </p>
        )
      }
      renderEdit={() => (
        <div className="space-y-1.5">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="E.g. Data scientist with 5 years of experience building ML pipelines..."
            rows={5}
          />
          <p className="text-xs text-muted-foreground text-right">
            {draft.length} / {MAX_LENGTH}
          </p>
        </div>
      )}
      saving={saving}
      onCancel={() => setDraft(profileSummary ?? "")}
      onSave={async () => {
        await updateProfile({ profileSummary: draft });
      }}
    />
  );
}