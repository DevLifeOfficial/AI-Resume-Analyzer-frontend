"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, CheckCircle } from "lucide-react";
import { LinkedInLogoIcon, GitHubLogoIcon, TwitterLogoIcon, } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE, FOOTER_LINKS } from "@/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[var(--navy)] border-t border-[rgba(5,200,200,0.1)]">
      {/* Newsletter Banner */}
      <div className="border-b border-[rgba(5,200,200,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--navy-light)] to-[var(--navy-mid)] border border-[rgba(5,200,200,0.15)] p-8 md:p-12">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--teal)]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] mb-4">
                  <Mail className="w-3.5 h-3.5 text-[var(--teal)]" />
                  <span className="text-xs font-medium text-[var(--teal)]">Career Intelligence Newsletter</span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Level up your job search
                </h3>
                <p className="text-white/50 text-sm max-w-md">
                  Weekly AI tips, resume templates, insider hiring intel, and early access to new features.
                  Join 40,000+ ambitious job seekers.
                </p>
              </div>

              <div className="w-full md:w-auto min-w-[340px]">
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-3 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-xl px-5 py-4"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm">You're in!</p>
                      <p className="text-white/50 text-xs">Check your inbox for a welcome gift 🎁</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[var(--teal)] focus:ring-[var(--teal)]/20 rounded-xl flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-semibold rounded-xl px-5 whitespace-nowrap group"
                    >
                      Subscribe
                      <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </form>
                )}
                <p className="text-white/30 text-xs mt-2 text-center">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-(--teal) flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-(--navy)" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Resume<span className="text-(--teal)">AI</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: TwitterLogoIcon, href: "#" },
                { icon: GitHubLogoIcon, href: "#" },
                { icon: LinkedInLogoIcon, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[rgba(5,200,200,0.1)] border border-white/10 hover:border-[rgba(5,200,200,0.3)] flex items-center justify-center text-white/40 hover:text-(--teal) transition-all"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/50 hover:text-[var(--teal)] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with ❤️ to help every job seeker succeed
          </p>
        </div>
      </div>
    </footer>
  );
}