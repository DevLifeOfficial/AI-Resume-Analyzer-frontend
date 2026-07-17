"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import { BRAND_LABEL, COUNTRIES, PLAN_DETAILS } from "@/data";
import { formatCardNumber, formatExpiry } from "@/utils/utils";
import { CardFormErrors, CardValidate } from "@/lib/validation";

type Status = "form" | "processing" | "success";

function getCardBrand(digits: string): "visa" | "mastercard" | "amex" | "discover" | null {
  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6(?:011|5)/.test(digits)) return "discover";
  return null;
}

function inputClass(hasError: boolean, extra = "") {
  return `w-full bg-[var(--navy)] border rounded-xl px-3 py-2.5 text-sm text-white/80 focus:outline-none disabled:opacity-60 ${
    hasError ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-[var(--teal)]/50"
  } ${extra}`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs text-white/40 font-medium mb-1.5 uppercase tracking-wider block">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function StepPill({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <span
      className={`px-3 py-1 rounded-full font-medium transition-colors ${
        done
          ? "bg-[var(--teal)] text-[var(--navy)]"
          : active
          ? "bg-[rgba(5,200,200,0.1)] text-[var(--teal)] border border-[rgba(5,200,200,0.3)]"
          : "bg-white/5 text-white/30"
      }`}
    >
      {label}
    </span>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "pro";
  const plan = PLAN_DETAILS[planKey] ?? PLAN_DETAILS.pro;

  const [status, setStatus] = useState<Status>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [zip, setZip] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [errors, setErrors] = useState<CardFormErrors>({});
  const [countdown, setCountdown] = useState(6);

  const brand = useMemo(() => getCardBrand(cardNumber.replace(/\s/g, "")), [cardNumber]);

  const clearError = (field: keyof CardFormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "WELCOME10") setCouponApplied(true);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = CardValidate({ name, email, cardNumber, expiry, cvv, zip });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("processing");
    // Demo only — no payment provider is called. Wire up Stripe/Paddle/etc. here for real checkout.
    setTimeout(() => setStatus("success"), 1800);
  };

  // Auto-redirect countdown after a successful demo payment
  useEffect(() => {
    if (status !== "success") return;
    if (countdown <= 0) {
      router.push("/Analyzer");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, router]);

  return (
    <main className="min-h-screen bg-[var(--navy-mid)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/#pricing")}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Change plan
          </button>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> Demo checkout — no real charge
          </span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10 text-xs">
          <StepPill label="Plan" done />
          <ChevronRight className="w-3.5 h-3.5 text-white/15" />
          <StepPill label="Payment" active={status !== "success"} done={status === "success"} />
          <ChevronRight className="w-3.5 h-3.5 text-white/15" />
          <StepPill label="Confirmation" active={status === "success"} done={status === "success"} />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-3xl mx-auto">
          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-6 lg:sticky lg:top-8">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Order summary</p>
              <p className="text-white text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {plan.name} plan
              </p>
              <p className="text-[var(--teal)] text-sm font-medium mb-5">{plan.price}</p>

              <div className="space-y-2.5 mb-5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-white/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 mb-4">
                <label className="text-xs text-white/40 font-medium mb-1.5 uppercase tracking-wider block">
                  Coupon code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      className="w-full bg-[var(--navy)] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white/80 focus:outline-none focus:border-[var(--teal)]/50"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="WELCOME10"
                      disabled={couponApplied}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!coupon || couponApplied}
                    className="text-xs font-medium text-[var(--teal)] border border-[var(--teal)]/30 rounded-xl px-3 disabled:opacity-40"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-400 text-[11px] mt-1.5 flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> 10% off applied
                  </p>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                <span className="text-white/40 text-xs">Due today</span>
                <span className="text-white font-semibold">
                  {plan.price}
                  {couponApplied && <span className="text-green-400 text-xs ml-1">(−10%)</span>}
                </span>
              </div>
            </div>
          </div>

          {/* Payment form */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[var(--teal)]" />
                    </div>
                    <p className="text-white font-semibold text-lg mb-1">You're all set</p>
                    <p className="text-white/40 text-sm mb-6 max-w-xs mx-auto">
                      This was a demo checkout — no card was charged. In production this step would confirm
                      your {plan.name} subscription{email ? ` and email a receipt to ${email}` : ""}.
                    </p>

                    <div className="bg-[var(--navy)] border border-white/5 rounded-2xl p-4 text-left max-w-xs mx-auto mb-6">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-white/40">Plan</span>
                        <span className="text-white font-medium">{plan.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/40">Amount</span>
                        <span className="text-white font-medium">
                          {plan.price}
                          {couponApplied && " (−10%)"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push("/Analyzer")}
                      className="text-xs text-[var(--teal)] hover:underline font-medium"
                    >
                      Redirecting to your dashboard in {countdown}s — go now →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handlePay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-3.5 h-3.5 text-white/30" />
                      <p className="text-white/40 text-xs">Payment details (demo — do not enter real card info)</p>
                    </div>

                    <Field label="Email for receipt" error={errors.email}>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          className={inputClass(!!errors.email, "pl-10")}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearError("email");
                          }}
                          placeholder="jane@company.com"
                          disabled={status === "processing"}
                        />
                      </div>
                    </Field>

                    <Field label="Name on card" error={errors.name}>
                      <input
                        className={inputClass(!!errors.name)}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          clearError("name");
                        }}
                        placeholder="Jane Cooper"
                        disabled={status === "processing"}
                      />
                    </Field>

                    <Field label="Card number" error={errors.cardNumber}>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          className={inputClass(!!errors.cardNumber, `pl-10 font-mono tracking-wider ${brand ? "pr-20" : ""}`)}
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(formatCardNumber(e.target.value));
                            clearError("cardNumber");
                          }}
                          placeholder="4242 4242 4242 4242"
                          disabled={status === "processing"}
                        />
                        {brand && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--teal)] bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] px-2 py-0.5 rounded-full">
                            {BRAND_LABEL[brand]}
                          </span>
                        )}
                      </div>
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Expiry" error={errors.expiry}>
                        <input
                          className={inputClass(!!errors.expiry, "font-mono")}
                          value={expiry}
                          onChange={(e) => {
                            setExpiry(formatExpiry(e.target.value));
                            clearError("expiry");
                          }}
                          placeholder="MM/YY"
                          disabled={status === "processing"}
                        />
                      </Field>
                      <Field label="CVV" error={errors.cvv}>
                        <input
                          className={inputClass(!!errors.cvv, "font-mono")}
                          value={cvv}
                          onChange={(e) => {
                            setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
                            clearError("cvv");
                          }}
                          placeholder="123"
                          disabled={status === "processing"}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Country">
                        <select
                          title="Select a country"
                          className={inputClass(false)}
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          disabled={status === "processing"}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Postal code" error={errors.zip}>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            className={inputClass(!!errors.zip, "pl-10")}
                            value={zip}
                            onChange={(e) => {
                              setZip(e.target.value);
                              clearError("zip");
                            }}
                            placeholder="94103"
                            disabled={status === "processing"}
                          />
                        </div>
                      </Field>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "processing"}
                      className="w-full bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold py-3 rounded-2xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                    >
                      {status === "processing" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-[var(--navy)]/40 border-t-[var(--navy)] rounded-full"
                          />
                          Processing…
                        </>
                      ) : (
                        `Pay ${plan.price}${couponApplied ? " (−10%)" : ""}`
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 pt-1">
                      <span className="flex items-center gap-1.5 text-white/25 text-[11px]">
                        <ShieldCheck className="w-3 h-3" /> 256-bit encrypted
                      </span>
                      <span className="flex items-center gap-1.5 text-white/25 text-[11px]">
                        <Lock className="w-3 h-3" /> PCI-compliant checkout
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}