"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Calendar, CheckCircle2, Loader2, Mail, User } from "lucide-react";
import { BookDemoFormValues, Bookvalidate, initialValues } from "@/lib/validation";
import { ErrorState } from "@/layout/errorState";

const fieldClass =
  "w-full bg-[var(--navy)] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)]/50 disabled:opacity-60";

const labelClass = "text-xs text-white/40 font-medium mb-1.5 uppercase tracking-wider block";

export function BookDemoForm() {
  const [values, setValues] = useState<BookDemoFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof BookDemoFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (field: keyof BookDemoFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = Bookvalidate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setServerError(null);

    try {
      // TODO(Ram): point this at your real mutation/endpoint, e.g.
      // await bookDemoMutation({ variables: { input: values } });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Couldn't submit your request. Please try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--navy-light)] border border-[rgba(5,200,200,0.15)] rounded-3xl p-8 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-[rgba(5,200,200,0.1)] border border-[rgba(5,200,200,0.2)] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-[var(--teal)]" />
        </div>
        <p className="text-white font-semibold mb-1">You're booked in</p>
        <p className="text-white/40 text-sm">
          We'll email {values.email} a calendar invite within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--navy-light)] border border-white/5 rounded-3xl p-6 space-y-4"
    >
      <div>
        <h3 className="text-white font-semibold text-lg mb-1">Book a live demo</h3>
        <p className="text-white/40 text-sm">
          15 minutes with our team — see the analyzer on your own resumes and hiring pipeline.
        </p>
      </div>

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <ErrorState compact message={serverError} onRetry={() => setStatus("idle")} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full name</label>
          <div className="relative">
            <User className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className={fieldClass}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={status === "submitting"}
              placeholder="Jane Cooper"
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Work email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className={fieldClass}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={status === "submitting"}
              placeholder="jane@company.com"
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>Company</label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              className={fieldClass}
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              disabled={status === "submitting"}
              placeholder="Acme Inc."
            />
          </div>
          {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className={labelClass}>Preferred date</label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              title="Select a date"
              type="date"
              className={fieldClass}
              value={values.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              disabled={status === "submitting"}
            />
          </div>
          {errors.preferredDate && (
            <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>What would you like to cover? (optional)</label>
        <textarea
          className="w-full bg-[var(--navy)] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-[var(--teal)]/50 min-h-[80px] resize-y disabled:opacity-60"
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
          disabled={status === "submitting"}
          placeholder="e.g. bulk resume screening for our hiring pipeline"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[var(--teal)] hover:bg-[var(--teal-dim)] text-[var(--navy)] font-bold py-3 rounded-2xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Booking…
          </>
        ) : (
          "Book my demo"
        )}
      </button>
    </form>
  );
}