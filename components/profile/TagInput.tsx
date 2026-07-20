import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  recommendations?: string[];
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  recommendations = [],
}: TagInputProps) {
  const [inputVal, setInputVal] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputVal("");
  };

  const removeTag = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
  };

  return (
    <div className="space-y-3 w-full">
      <div
        className="flex flex-wrap gap-2 p-2 rounded-xl border transition-all bg-white/2 border-white/5 focus-within:border-white/10"
      >
        <AnimatePresence>
          {value.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg text-white/70 bg-white/5 border border-white/5"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="text-white/30 hover:text-white/60 p-0.5 rounded-md transition-colors"
              >
                <X size={10} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputVal)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none border-none text-[12px] text-white/80 placeholder-white/20 p-1"
        />
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-white/20 font-medium">
            Recommendations
          </p>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {recommendations.map((rec) => {
              const selected = value.includes(rec);
              return (
                <button
                  key={rec}
                  type="button"
                  onClick={() => (selected ? onChange(value.filter((v) => v !== rec)) : addTag(rec))}
                  className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg transition-all border"
                  style={{
                    background: selected ? "rgba(5,200,200,0.1)" : "rgba(255,255,255,0.02)",
                    borderColor: selected ? "rgba(5,200,200,0.22)" : "rgba(255,255,255,0.05)",
                    color: selected ? "#05C8C8" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {!selected && <Plus size={8} />}
                  {rec}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
