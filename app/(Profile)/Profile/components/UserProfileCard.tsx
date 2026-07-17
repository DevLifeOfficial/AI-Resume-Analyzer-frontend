"use client";

import { ErrorState } from "@/layout/errorState";
import { ProfileSkeleton } from "@/layout/skeleton";
import { useAuth } from "@/lib/context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, Mail, ShieldCheck } from "lucide-react";


export function UserProfileCard() {
  const { user, loading, error, logout } = useAuth();

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <ErrorState
        compact
        message="Couldn't load your profile. Please refresh or sign in again."
      />
    );
  }

  if (!user) {
    return (
      <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-6 text-center">
        <p className="text-white/40 text-sm">You're not signed in.</p>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-(--cream) border border-white/5 rounded-3xl p-6 flex items-center gap-4"
    >
      {user.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-white/10"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center flex-shrink-0 text-[var(--teal)] font-semibold">
          {initials}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-white font-semibold truncate">{user.name}</p>
          {user.plan === "pro" && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--teal)] bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] px-2 py-0.5 rounded-full flex-shrink-0">
              <ShieldCheck className="w-2.5 h-2.5" /> Pro
            </span>
          )}
        </div>
        <p className="text-white/40 text-xs flex items-center gap-1 truncate">
          <Mail className="w-3 h-3 flex-shrink-0" /> {user.email}
        </p>
      </div>

      {logout && (
        <button
          onClick={logout}
          aria-label="Sign out"
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-white/50" />
        </button>
      )}
    </motion.div>
  );
}