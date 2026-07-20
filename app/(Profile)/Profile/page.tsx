"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/context/AuthContext";
import { ErrorState } from "@/layout/errorState";
import { ProfileSkeleton } from "@/layout/skeleton";
import { Sidebar } from "./Sidebar/Sidebar";
import {
  Hero,
  InsightsPanel,
  OverviewTab,
  ExperienceTab,
  EducationTab,
  ProjectsTab,
  SkillsTab,
  CertificatesTab,
  ResumeTab,
  SettingsTab,
} from "./components";
import type { NavSection } from "@/data";

export default function ProfilePage() {
  const { user, loading, error } = useAuth();
  const [active, setActive] = useState<NavSection>("overview");

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

  const content: Record<NavSection, React.ReactNode> = {
    overview: <OverviewTab user={user} onNavigate={setActive} />,
    experience: <ExperienceTab user={user} />,
    education: <EducationTab user={user} />,
    projects: <ProjectsTab user={user} />,
    skills: <SkillsTab user={user} />,
    certificates: <CertificatesTab user={user} />,
    resume: <ResumeTab />,
    settings: <SettingsTab user={user} />,
  };


  return (
    <div className="flex h-screen overflow-hidden bg-(--background)">
      <style>{`
        #main-scroll::-webkit-scrollbar { width: 3px; }
        #main-scroll::-webkit-scrollbar-track { background: transparent; }
        #main-scroll::-webkit-scrollbar-thumb { background: rgba(5,200,200,0.18); border-radius: 2px; }
        #main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(5,200,200,0.35); }
      `}</style>

      {/* Sidebar */}
      <Sidebar active={active} onChange={setActive} user={user} />

      {/* Main */}
      <main id="main-scroll" className="flex-1 overflow-y-auto min-w-0">
        <div className="mx-auto px-6 py-6">
          <Hero user={user} />

          <div className="flex gap-5 mt-5">
            {/* Content area */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {content[active]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Insights panel */}
            <div className="hidden xl:block w-72 flex-shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pb-6">
              <style>{`
                .insights-scroll::-webkit-scrollbar { display: none; }
              `}</style>
              <div className="insights-scroll">
                <InsightsPanel user={user} onNavigate={setActive} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}