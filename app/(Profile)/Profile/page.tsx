"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import { ErrorState } from "@/layout/errorState";
import { ProfileSkeleton } from "@/layout/skeleton";
import { Button } from "@/components/ui/button";
import {
  CollectionSection,
  ProfileHeader,
  SocialLinksSection,
  SummarySection,
  TagSection,
  ProfileSidebar,
  ResumeSection,
  SettingsSection,
} from "./components";
import type { ProfileSection } from "./components/ProfileSidebar";
import { CERTIFICATES_CONFIG, EDUCATION_CONFIG, EXPERIENCE_CONFIG, PROJECTS_CONFIG } from "@/lib/config/profile.config";

const STEPS = [
  { value: "overview", label: "Overview" },
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education" },
  { value: "more", label: "Projects & More" },
] as const;

export default function ProfilePage() {
  const { user, loading, error } = useAuth();
  const [activeSection, setActiveSection] = useState<ProfileSection>("profile");
  const [currentStep, setCurrentStep] = useState(0);

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

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const handleSectionChange = (section: ProfileSection) => {
    setActiveSection(section);
    setCurrentStep(0);
  };

  const goNext = () => {
    if (isLastStep) {
      setActiveSection("resume");
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => setCurrentStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-(--backkground)">
      <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row">
        <ProfileSidebar active={activeSection} onChange={handleSectionChange} />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
          <ProfileHeader user={user} />

          {activeSection === "profile" && (
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-2 sm:gap-3">
                {STEPS.map((s, i) => (
                  <div key={s.value} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
                    <button onClick={() => setCurrentStep(i)} className="flex items-center gap-2 shrink-0">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium border transition-colors ${
                          i === currentStep
                            ? "bg-[var(--teal)] text-[var(--navy-mid)] border-[var(--teal)]"
                            : i < currentStep
                            ? "bg-[rgba(5,200,200,0.15)] text-[var(--teal)] border-[rgba(5,200,200,0.3)]"
                            : "bg-transparent text-white/30 border-white/10"
                        }`}
                      >
                        {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </span>
                      <span
                        className={`hidden sm:inline text-sm ${
                          i === currentStep ? "text-white font-medium" : "text-white/40"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className={`h-px flex-1 ${i < currentStep ? "bg-[rgba(5,200,200,0.3)]" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.value}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {step.value === "overview" && (
                    <>
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
                    </>
                  )}

                  {step.value === "experience" && (
                    <CollectionSection config={EXPERIENCE_CONFIG} items={user.experience ?? []} />
                  )}

                  {step.value === "education" && (
                    <CollectionSection config={EDUCATION_CONFIG} items={user.education ?? []} />
                  )}

                  {step.value === "more" && (
                    <>
                      <CollectionSection config={PROJECTS_CONFIG} items={user.projects ?? []} />
                      <CollectionSection config={CERTIFICATES_CONFIG} items={user.certificates ?? []} />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Step navigation */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
                <Button variant="ghost" onClick={goBack} disabled={currentStep === 0} className="gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </Button>
                <Button onClick={goNext} className="gap-1.5">
                  {isLastStep ? "Done" : "Save & Continue"}
                  {!isLastStep && <ArrowRight className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>
          )}

          {activeSection === "resume" && <ResumeSection />}
          {activeSection === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}