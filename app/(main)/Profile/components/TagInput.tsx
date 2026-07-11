"use client";

import { useState, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
}

export function TagInput({
  values,
  onChange,
  placeholder = "Type and press Enter",
  maxTags = 50,
  disabled,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const trimmed = draft.trim();
    setDraft("");
    if (!trimmed) return;
    if (values.some((v) => v.toLowerCase() === trimmed.toLowerCase())) return;
    if (values.length >= maxTags) return;
    onChange([...values, trimmed]);
  };

  const remove = (tag: string) => onChange(values.filter((v) => v !== tag));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && draft === "" && values.length > 0) {
      remove(values[values.length - 1]);
    }
  };

  return (
    <div className="space-y-2.5">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence initial={false}>
            {values.map((tag) => (
              <motion.span
                key={tag}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="tag-pill gap-1 pr-1.5"
              >
                {tag}
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => remove(tag)}
                    aria-label={`Remove ${tag}`}
                    className="ml-0.5 rounded-full hover:bg-[rgba(5,200,200,0.25)] p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}
      {!disabled && (
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={values.length >= maxTags ? `Max ${maxTags} reached` : placeholder}
          disabled={values.length >= maxTags}
        />
      )}
    </div>
  );
}