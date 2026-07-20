"use client";

import { ProfileUser } from "@/lib/types/profile.type";
import { EXPERIENCE_CONFIG } from "@/lib/config/profile";
import { ProfileCollectionSection } from "@/components/profile";
import { Briefcase } from "lucide-react";

export function ExperienceTab({ user }: { user: ProfileUser }) {
  return (
    <ProfileCollectionSection
      config={EXPERIENCE_CONFIG}
      items={user.experience ?? []}
      icon={<Briefcase size={20} />}
    />
  );
}