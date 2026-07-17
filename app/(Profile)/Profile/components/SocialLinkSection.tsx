"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/lib/types/profile.type";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { SectionCard } from "./SectionCard";

interface SocialLinksSectionProps {
  socialLinks?: SocialLinks;
}

const LINK_FIELDS: { key: keyof SocialLinks; label: string; icon: typeof GitHubLogoIcon; placeholder: string }[] = [
  { key: "github", label: "GitHub", icon: GitHubLogoIcon, placeholder: "https://github.com/username" },
  { key: "portfolio", label: "Portfolio", icon: Globe, placeholder: "https://yourname.dev" },
  { key: "twitter", label: "Twitter / X", icon: TwitterLogoIcon, placeholder: "https://x.com/username" },
  { key: "website", label: "Website", icon: LinkIcon, placeholder: "https://example.com" },
];

export function SocialLinksSection({ socialLinks }: SocialLinksSectionProps) {
  const [draft, setDraft] = useState<SocialLinks>(socialLinks ?? {});
  const { updateProfile, saving } = useUpdateProfile();

  const filledLinks = LINK_FIELDS.filter((f) => socialLinks?.[f.key]);

  return (
    <SectionCard
      title="Social Links"
      description="Where recruiters can find more of your work."
      renderView={() =>
        filledLinks.length > 0 ? (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {filledLinks.map(({ key, label, icon: Icon }) => (
              <motion.a
                key={key}
                whileHover={{ y: -1 }}
                href={socialLinks![key]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm rounded-xl border border-border p-3 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No links added yet.</p>
        )
      }
      renderEdit={() => (
        <div className="grid sm:grid-cols-2 gap-4">
          {LINK_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={`social-${key}`}>{label}</Label>
              <Input
                id={`social-${key}`}
                type="url"
                value={draft[key] ?? ""}
                placeholder={placeholder}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      )}
      saving={saving}
      onCancel={() => setDraft(socialLinks ?? {})}
      onSave={async () => {
        // Drop empty strings so we don't fail the backend's @IsUrl() on ""
        const cleaned = Object.fromEntries(
          Object.entries(draft).filter(([, v]) => v && v.trim() !== ""),
        );
        await updateProfile({ socialLinks: cleaned });
      }}
    />
  );
}