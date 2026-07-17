"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import { User, FileText, Settings } from "lucide-react";

export type ProfileSection = "profile" | "resume" | "settings";

interface ProfileSidebarProps {
  active: ProfileSection;
  onChange: (section: ProfileSection) => void;
}

const NAV_ITEMS: {
  key: ProfileSection;
  label: string;
  icon: typeof User;
  description: string;
}[] = [
  { key: "profile", label: "Profile", icon: User, description: "Your details & experience" },
  { key: "resume", label: "Resume", icon: FileText, description: "Upload & manage your resume" },
  { key: "settings", label: "Settings", icon: Settings, description: "Account preferences" },
];

export function ProfileSidebar({ active, onChange }: ProfileSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeItem = NAV_ITEMS.find((i) => i.key === active);

  const select = (key: ProfileSection) => {
    onChange(key);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-56 lg:w-64 shrink-0 flex-col gap-1 border-r border-white/5 bg-[var(--navy-light)] px-3 py-8">
        <p className="px-3 pb-3 text-xs font-medium uppercase tracking-wider text-white/30">
          Account
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              aria-current={isActive ? "page" : undefined}
              className="group relative flex items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="profile-sidebar-active"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-2xl bg-[rgba(5,200,200,0.12)]"
                />
              )}
              <Icon
                className={`relative w-4 h-4 mt-0.5 shrink-0 transition-colors ${
                  isActive
                    ? "text-[var(--teal)]"
                    : "text-white/40 group-hover:text-white/60"
                }`}
              />
              <span className="relative min-w-0">
                <span
                  className={`block text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                  }`}
                >
                  {item.label}
                </span>
                <span className="block text-xs text-white/30 truncate">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </aside>

      {/* Mobile top bar: hamburger + current section */}
      <div className="md:hidden flex items-center justify-between px-4 sm:px-6 pt-4 pb-2">
        <div className="flex items-center gap-2 text-white/80">
          {activeItem && <activeItem.icon className="w-4 h-4 text-[var(--teal)]" />}
          <span className="text-sm font-medium">{activeItem?.label}</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open account menu"
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <HamburgerMenuIcon width={18} height={18} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="sidebar-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 left-0 z-50 h-full w-72 max-w-[80vw] bg-[var(--navy-mid)]/98 backdrop-blur-xl border-r border-[rgba(5,200,200,0.12)] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
                <p className="text-xs font-medium uppercase tracking-wider text-white/30">
                  Account
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -mr-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Cross2Icon width={18} height={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-3 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = item.key === active;
                  return (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => select(item.key)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                        isActive
                          ? "bg-[rgba(5,200,200,0.12)] text-white"
                          : "text-white/50 hover:bg-white/5 hover:text-white/80"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isActive ? "text-[var(--teal)]" : "text-white/40"
                        }`}
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{item.label}</span>
                        <span className="block text-xs text-white/30 truncate">
                          {item.description}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}