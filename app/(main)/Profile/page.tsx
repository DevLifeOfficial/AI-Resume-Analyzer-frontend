"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";
import { ErrorState } from "@/layout/errorState";
import { ProfileSkeleton } from "@/layout/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollectionSection, ProfileHeader, SocialLinksSection, SummarySection, TagSection } from "./components";
import { CERTIFICATES_CONFIG, EDUCATION_CONFIG, EXPERIENCE_CONFIG, PROJECTS_CONFIG } from "@/lib/config/profile.config";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education" },
  { value: "more", label: "Projects & More" },
] as const;

export default function ProfilePage() {
  const { user, loading, error } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return <ErrorState message="Couldn't load your profile. Please refresh or sign in again." />;
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <p className="text-white/40 text-sm">You're not signed in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--navy-mid)]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-6 sm:space-y-8">
        <ProfileHeader user={user} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="flex w-full justify-start sm:justify-center gap-1 overflow-x-auto sm:grid sm:grid-cols-4 [&::-webkit-scrollbar]:hidden rounded-none"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="shrink-0 whitespace-nowrap px-4">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <SummarySection profileSummary={user.profileSummary} />

                  <div className="grid gap-6 lg:grid-cols-2 items-start">
                    <TagSection
                      title="Skills"
                      description="Used to match your resume against job descriptions."
                      emptyMessage="No skills added yet."
                      placeholder="e.g. Python, SQL, Figma"
                      values={user.skills ?? []}
                      fieldKey="skills"
                      maxTags={50}
                    />
                    <TagSection
                      title="Interests"
                      emptyMessage="No interests added yet."
                      placeholder="e.g. Open source, Mentorship"
                      values={user.interests ?? []}
                      fieldKey="interests"
                      maxTags={30}
                    />
                  </div>

                  <SocialLinksSection socialLinks={user.socialLinks} />
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <CollectionSection config={EXPERIENCE_CONFIG} items={user.experience ?? []} />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <CollectionSection config={EDUCATION_CONFIG} items={user.education ?? []} />
                </TabsContent>

                <TabsContent value="more" className="mt-0 space-y-6">
                  <CollectionSection config={PROJECTS_CONFIG} items={user.projects ?? []} />
                  <CollectionSection config={CERTIFICATES_CONFIG} items={user.certificates ?? []} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  );
}