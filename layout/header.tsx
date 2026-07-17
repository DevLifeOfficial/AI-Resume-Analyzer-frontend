"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronRight,
  LogOut,
  Bell,
  Settings,
  User as UserIcon,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

// Adjust this if your AuthContext exposes a differently-shaped user object.
type AuthedUser = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

function getInitials(name?: string, email?: string) {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

const menuItemClass =
  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/70 outline-none transition-colors " +
  "hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white cursor-pointer";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // wire up to real notification state
  const { isAuthenticated, logout, user } = useAuth() as {
    isAuthenticated: boolean;
    logout: () => void;
    user?: AuthedUser;
  };
  const navigate = useRouter();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate.push("/Authentication");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer if the viewport grows back to desktop size.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-[var(--navy)]/95 backdrop-blur-xl border-b border-[rgba(5,200,200,0.12)] shadow-[0_4px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/logo.jpg"
                alt="ResumeAI Logo"
                className="w-8 h-8 rounded-full group-hover:scale-105 transition-transform"
              />
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Resume<span className="text-[var(--teal)]">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={`/Home${link.href}`}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-[var(--teal)] transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Button
                  onClick={() => navigate.push("/Authentication")}
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 text-sm cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate.push("/Authentication")}
                  className="bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-semibold text-sm px-5 rounded-xl group cursor-pointer"
                >
                  Get Started Free
                  <ChevronRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                {/* Notifications */}
                <button
                  aria-label="Notifications"
                  onClick={() => setHasUnread(false)}
                  className="relative p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Bell className="w-[18px] h-[18px]" />
                  {hasUnread && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--teal)] ring-2 ring-[var(--navy)]" />
                  )}
                </button>

                {/* Settings */}
                <button
                  aria-label="Settings"
                  onClick={() => navigate.push("/Home/profile?section=settings")}
                  className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Settings className="w-[18px] h-[18px]" />
                </button>

                <div className="w-px h-6 bg-white/10 mx-1.5" />

                {/* Profile dropdown */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      aria-label="Account menu"
                      className="flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user?.name ?? "Profile"}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[rgba(5,200,200,0.4)] transition-all"
                        />
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(5,200,200,0.14)] text-[var(--teal)] text-xs font-semibold ring-2 ring-transparent group-hover:ring-[rgba(5,200,200,0.4)] transition-all">
                          {getInitials(user?.name, user?.email)}
                        </span>
                      )}
                      <span className="max-w-[110px] truncate text-sm text-white/70 group-hover:text-white">
                        {user?.name ?? "Account"}
                      </span>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="end"
                      sideOffset={10}
                      className="z-[60] w-60 rounded-2xl border border-[rgba(5,200,200,0.12)] bg-[var(--navy-mid)]/98 backdrop-blur-xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.4)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                    >
                      <div className="px-3 py-2.5 mb-1 border-b border-white/5">
                        <p className="text-sm font-medium text-white truncate">
                          {user?.name ?? "Your account"}
                        </p>
                        {user?.email && (
                          <p className="text-xs text-white/40 truncate">{user.email}</p>
                        )}
                      </div>

                      <DropdownMenu.Item
                        className={menuItemClass}
                        onSelect={() => navigate.push("/Home/profile?section=profile")}
                      >
                        <UserIcon className="w-4 h-4 text-white/40" />
                        Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className={menuItemClass}
                        onSelect={() => navigate.push("/Home/profile?section=resume")}
                      >
                        <FileText className="w-4 h-4 text-white/40" />
                        Resume
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className={menuItemClass}
                        onSelect={() => navigate.push("/Home/profile?section=settings")}
                      >
                        <Settings className="w-4 h-4 text-white/40" />
                        Settings
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="my-1.5 h-px bg-white/5" />

                      <DropdownMenu.Item
                        className={`${menuItemClass} text-red-400 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400`}
                        onSelect={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden relative w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <Cross2Icon width={20} height={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute"
                  >
                    <HamburgerMenuIcon width={20} height={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 inset-x-0 z-40 bg-[var(--navy-mid)]/98 backdrop-blur-xl border-b border-[rgba(5,200,200,0.12)] md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              {isAuthenticated && (
                <div className="flex items-center gap-3 px-4 sm:px-6 pt-5 pb-4 border-b border-white/5">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user?.name ?? "Profile"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(5,200,200,0.14)] text-[var(--teal)] text-sm font-semibold">
                      {getInitials(user?.name, user?.email)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.name ?? "Your account"}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-white/40 truncate">{user.email}</p>
                    )}
                  </div>
                  <button
                    aria-label="Notifications"
                    onClick={() => setHasUnread(false)}
                    className="relative ml-auto p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Bell className="w-[18px] h-[18px]" />
                    {hasUnread && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--teal)] ring-2 ring-[var(--navy-mid)]" />
                    )}
                  </button>
                </div>
              )}

              <div className="px-4 sm:px-6 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/Home${link.href}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-white/70 hover:text-[var(--teal)] rounded-xl hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {isAuthenticated && (
                  <>
                    <Link
                      href="/Home/profile?section=profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-[var(--teal)] rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-white/40" /> Profile
                    </Link>
                    <Link
                      href="/Home/profile?section=settings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-[var(--teal)] rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-white/40" /> Settings
                    </Link>
                  </>
                )}

                <div className="pt-3 flex flex-col gap-2">
                  {!isAuthenticated ? (
                    <>
                      <Button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate.push("/Authentication");
                        }}
                        variant="ghost"
                        className="w-full text-white/70 justify-start"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileOpen(false);
                          navigate.push("/Authentication");
                        }}
                        className="w-full bg-[var(--teal)] text-[var(--navy)] font-semibold"
                      >
                        Get Started Free
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}