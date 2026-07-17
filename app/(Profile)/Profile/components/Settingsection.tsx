"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, ShieldCheck } from "lucide-react";

export function SettingsSection() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-display font-semibold text-lg">Settings</h2>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences.</p>
      </div>

      <div className="rounded-3xl border border-white/5 bg-[var(--navy-light)] p-5 space-y-4">
        <div className="min-w-0">
          <p className="text-xs text-white/30 uppercase tracking-wide">Email</p>
          <p className="text-sm text-white truncate mt-0.5">{user?.email}</p>
        </div>
        <div className="min-w-0 pt-4 border-t border-white/5">
          <p className="text-xs text-white/30 uppercase tracking-wide">Plan</p>
          <p className="text-sm text-white mt-0.5 flex items-center gap-1.5">
            {user?.plan === "PRO" ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--teal)]" /> Pro
              </>
            ) : (
              "Free"
            )}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-[var(--navy-light)] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white font-medium">Sign out</p>
          <p className="text-xs text-white/40 mt-0.5">You&apos;ll need to sign back in to access your profile.</p>
        </div>
        <Button variant="outline" className="gap-1.5 shrink-0 w-full sm:w-auto" onClick={logout}>
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </Button>
      </div>
    </div>
  );
}