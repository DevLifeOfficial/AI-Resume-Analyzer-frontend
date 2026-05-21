"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

import type { AuthPageConfig, AuthFieldConfig, OAuthProviderConfig } from "@/lib/config/auth.config";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { PasswordStrength } from "./PasswordStrength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ── Google Icon 
export function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ── Password field with toggle + strength meter 
function PasswordInput({
  field,
  registration,
  error,
  watch,
}: {
  field: AuthFieldConfig;
  registration: Record<string, any>;
  error?: string;
  watch?: string; // current password value for strength meter (register mode)
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...registration}
          id={field.name}
          type={show ? "text" : "password"}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={cn(
            "auth-input rounded-md pr-10 bg-white",
            error && "border-red-500/60 focus:border-red-500"
          )}
        />
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black transition-colors z-20"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {/* Show strength meter only in register mode (when watch value is provided) */}
      <AnimatePresence>
        {watch !== undefined && <PasswordStrength password={watch} />}
      </AnimatePresence>
    </div>
  );
}

// ── Single field renderer 
function AuthField({
  field,
  register,
  errors,
  watchPassword,
  isRegister,
}: {
  field: AuthFieldConfig;
  register: any;
  errors: Record<string, any>;
  watchPassword?: string;
  isRegister?: boolean;
}) {
  const error = errors[field.name]?.message as string | undefined;
  // Pass validation rules from the config into register()
  const registration = register(field.name, field.validation ?? {});

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={field.name}
        className="text-xs font-semibold text-white/50 uppercase tracking-wider"
      >
        {field.label}
      </Label>

      {field.type === "password" ? (
        <PasswordInput
          field={field}
          registration={registration}
          error={error}
          // Only pass watchPassword (enabling strength meter) on register page
          watch={isRegister ? watchPassword : undefined}
        />
      ) : (
        <Input
          {...registration}
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={cn("auth-input rounded-md bg-white", error && "border-red-500/60 focus:border-red-500")}
        />
      )}

      {field.description && !error && (
        <p className="text-[11px] text-white/25">{field.description}</p>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 text-[11px] text-red-400 mt-1 overflow-hidden"
          >
            <AlertCircle size={11} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── OAuth button 
function OAuthButton({
  provider,
  handler,
  loading,
}: {
  provider: OAuthProviderConfig;
  handler: () => void;
  loading: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={handler}
      disabled={loading}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl",
        "bg-white/[0.03] border border-white/8 text-white/70 text-sm font-medium",
        "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        provider.hoverClass
      )}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : provider.icon === "Google" ? (
        <GoogleIcon />
      ) : (
        <LinkedInLogoIcon className="w-4 h-4 text-[#0A66C2]" />
      )}

      <span className="hidden md:inline">
        {provider.label}
      </span>
    </motion.button>
  );
}

// ── Main AuthCard
export interface AuthCardProps {
  config: AuthPageConfig;
}

// Tighter, more intentional stagger timing
const STAGGER = {
  heading:   0.05,
  subheading:0.10,
  oauth:     0.15, // base; each button adds i * 0.05
  divider:   0.28,
  fields:    0.32, // base; each field adds i * 0.05
  forgot:    0.46,
  submit:    0.50,
  switch:    0.55,
};

export function AuthCard({ config }: AuthCardProps) {
  const { form, loading, oauthLoading, onSubmit, oauthHandlers } = useAuthForm(config);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const passwordValue = watch("password");
  const isRegister = config.mode === "register";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* ── Header ── */}
      <div className="mb-7">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER.heading, duration: 0.35 }}
          className="text-[28px] font-bold text-center text-white mb-1.5 auth-heading tracking-tight"
        >
          {config.heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: STAGGER.subheading, duration: 0.35 }}
          className="text-white/40 text-sm leading-relaxed text-center"
        >
          {config.subheading}
        </motion.p>
      </div>

      {/* ── OAuth Buttons ── */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {config.oauthProviders.map((provider, i) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: STAGGER.oauth + i * 0.05, duration: 0.3 }}
          >
            <OAuthButton
              provider={provider}
              handler={oauthHandlers[provider.id]}
              loading={oauthLoading === provider.id}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: STAGGER.divider, duration: 0.3 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-white/20 text-[11px] font-medium uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </motion.div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4" noValidate>
        {config.fields.map((field, i) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: STAGGER.fields + i * 0.05, duration: 0.3 }}
          >
            <AuthField
              field={field}
              register={register}
              errors={errors}
              watchPassword={passwordValue}
              isRegister={isRegister}
            />
          </motion.div>
        ))}

        {/* ── Forgot password ── */}
        {config.showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: STAGGER.forgot, duration: 0.25 }}
            className="flex justify-end -mt-1"
          >
            <Link
              href="/forgot-password"
              className="text-xs text-[var(--teal)]/70 hover:text-[var(--teal)] transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>
        )}

        {/* ── Submit ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STAGGER.submit, duration: 0.3 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 rounded-xl font-bold text-sm bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] transition-all duration-200 btn-glow disabled:opacity-60 mt-1"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={15} className="animate-spin" />
                {config.loadingLabel}
              </span>
            ) : (
              config.submitLabel
            )}
          </Button>
        </motion.div>
      </form>

      {/* ── Switch mode ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: STAGGER.switch, duration: 0.3 }}
        className="text-center text-white/30 text-sm mt-6"
      >
        {config.switchText}{" "}
        <Link
          href={config.switchHref}
          className="text-[var(--teal)] hover:text-white font-semibold transition-colors"
        >
          {config.switchLinkLabel}
        </Link>
      </motion.p>
    </motion.div>
  );
}