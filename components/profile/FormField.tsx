import { ProfileFieldConfig } from "../../lib/config/profile/types";
import { TagInput } from "./TagInput";
import { useMemo } from "react";

interface FormFieldProps {
  field: ProfileFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
  recommendations?: string[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function FormField({
  field,
  value,
  onChange,
  error,
  recommendations = [],
}: FormFieldProps) {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = currentYear; y >= currentYear - 50; y--) {
      list.push(y);
    }
    return list;
  }, []);

  const dateValue = useMemo(() => {
    if (!value || typeof value !== "string") return { year: "", month: "" };
    const parts = value.split("-");
    return {
      year: parts[0] || "",
      month: parts[1] || "",
    };
  }, [value]);

  const handleDateUpdate = (month: string, year: string) => {
    if (month && year) {
      onChange(`${year}-${month}`);
    } else if (year) {
      onChange(`${year}-01`);
    } else {
      onChange("");
    }
  };

  const inputClass = `w-full p-2.5 text-[12px] bg-[#0c1626]/60 border rounded-xl outline-none transition-all placeholder-white/20 text-white/80 ${
    error ? "border-red-500 focus:border-red-500" : "border-white/5 focus:border-white/10 focus:bg-[#0c1626]/80"
  }`;

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-[11px] font-semibold text-white/50">{field.label}</label>
        {error && <span className="text-[10px] text-red-400 font-medium">{error}</span>}
      </div>

      {field.type === "textarea" ? (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={inputClass}
        />
      ) : field.type === "tags" ? (
        <TagInput
          value={(value as string[]) ?? []}
          onChange={onChange}
          placeholder={field.placeholder || `Add ${field.label.toLowerCase()}...`}
          recommendations={recommendations}
        />
      ) : field.type === "checkbox" ? (
        <label className="flex items-center gap-2 text-[12px] text-white/70 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-white/10 bg-white/2 accent-[#05C8C8]"
          />
          {field.label}
        </label>
      ) : field.type === "date" ? (
        <div className="grid grid-cols-2 gap-2">
          <select
            value={dateValue.month}
            onChange={(e) => handleDateUpdate(e.target.value, dateValue.year)}
            className="p-2 text-[12px] bg-[#0c1626]/60 border border-white/5 text-white/80 rounded-xl outline-none focus:border-white/10"
          >
            <option value="">Month</option>
            {MONTHS.map((m, idx) => (
              <option key={m} value={String(idx + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={dateValue.year}
            onChange={(e) => handleDateUpdate(dateValue.month, e.target.value)}
            className="p-2 text-[12px] bg-[#0c1626]/60 border border-white/5 text-white/80 rounded-xl outline-none focus:border-white/10"
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
