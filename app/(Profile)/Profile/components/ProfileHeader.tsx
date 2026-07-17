"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Pencil, ShieldCheck, Loader2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "@/lib/hooks/useUpdateProfile";
import { ProfileUser } from "@/lib/types/profile.type";

interface ProfileHeaderProps {
  user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(user.name);
  const { updateProfile, saving } = useUpdateProfile();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const saveName = async () => {
    const trimmed = nameDraft.trim();
    if (!trimmed || trimmed === user.name) {
      setEditingName(false);
      return;
    }
    await updateProfile({ name: trimmed });
    setEditingName(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl border border-white/5 bg-[var(--navy-light)] overflow-hidden"
    >
      {/* Cover strip */}
      <div
        className="h-16 sm:h-20 w-full"
        style={{
          background:
            "radial-gradient(ellipse 120% 160% at 20% 0%, rgba(5,200,200,0.28) 0%, transparent 60%), linear-gradient(120deg, rgba(5,200,200,0.12), rgba(14,165,233,0.08))",
        }}
      />

      <div className="px-5 sm:px-7 pb-6 -mt-8 sm:-mt-9 flex flex-col sm:flex-row sm:items-end gap-4">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-4 border-[var(--navy-light)] shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[rgba(5,200,200,0.12)] border-4 border-[var(--navy-light)] shadow-lg flex items-center justify-center flex-shrink-0 text-[var(--teal)] font-display font-semibold text-xl">
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0 sm:pb-0.5">
          {editingName ? (
            <div className="flex items-center gap-2 max-w-xs">
              <Input
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                autoFocus
                className="h-8"
              />
              <Button size="icon" className="h-8 w-8 shrink-0" onClick={saveName} disabled={saving}>
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => {
                  setNameDraft(user.name);
                  setEditingName(false);
                }}
                disabled={saving}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 group">
              <p className="text-white font-display font-semibold text-lg sm:text-xl truncate">
                {user.name}
              </p>
              {user.plan === "PRO" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--teal)] bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] px-2 py-0.5 rounded-full flex-shrink-0">
                  <ShieldCheck className="w-2.5 h-2.5" /> Pro
                </span>
              )}
              <button
                onClick={() => setEditingName(true)}
                aria-label="Edit name"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity text-white/30 hover:text-white/70"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          )}
          <p className="text-white/40 text-xs flex items-center gap-1 truncate mt-1.5">
            <Mail className="w-3 h-3 flex-shrink-0" /> {user.email}
          </p>
        </div>
      </div>
    </motion.div>
  );
}