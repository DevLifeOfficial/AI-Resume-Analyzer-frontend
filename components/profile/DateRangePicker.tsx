import { useMemo } from "react";

interface DateRangePickerProps {
  startDate?: string; // Format: YYYY-MM
  endDate?: string;   // Format: YYYY-MM
  isCurrent?: boolean;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onCurrentChange?: (value: boolean) => void;
  showCurrentCheckbox?: boolean;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function DateRangePicker({
  startDate = "",
  endDate = "",
  isCurrent = false,
  onStartChange,
  onEndChange,
  onCurrentChange,
  showCurrentCheckbox = true,
}: DateRangePickerProps) {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = currentYear; y >= currentYear - 50; y--) {
      list.push(y);
    }
    return list;
  }, []);

  // Parse YYYY-MM helper
  const parseDate = (d?: string) => {
    if (!d) return { year: "", month: "" };
    const parts = d.split("-");
    return {
      year: parts[0] || "",
      month: parts[1] || "",
    };
  };

  const startParsed = useMemo(() => parseDate(startDate), [startDate]);
  const endParsed = useMemo(() => parseDate(endDate), [endDate]);

  const handleStartUpdate = (month: string, year: string) => {
    if (month && year) {
      onStartChange(`${year}-${month}`);
    } else if (year) {
      onStartChange(`${year}-01`);
    } else {
      onStartChange("");
    }
  };

  const handleEndUpdate = (month: string, year: string) => {
    if (month && year) {
      onEndChange(`${year}-${month}`);
    } else if (year) {
      onEndChange(`${year}-01`);
    } else {
      onEndChange("");
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-white/50">Start Date</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={startParsed.month}
              onChange={(e) => handleStartUpdate(e.target.value, startParsed.year)}
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
              value={startParsed.year}
              onChange={(e) => handleStartUpdate(startParsed.month, e.target.value)}
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
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-white/50">End Date</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              disabled={isCurrent}
              value={isCurrent ? "" : endParsed.month}
              onChange={(e) => handleEndUpdate(e.target.value, endParsed.year)}
              className="p-2 text-[12px] bg-[#0c1626]/60 border border-white/5 text-white/80 rounded-xl outline-none focus:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <option value="">Month</option>
              {MONTHS.map((m, idx) => (
                <option key={m} value={String(idx + 1).padStart(2, "0")}>
                  {m}
                </option>
              ))}
            </select>
            <select
              disabled={isCurrent}
              value={isCurrent ? "" : endParsed.year}
              onChange={(e) => handleEndUpdate(endParsed.month, e.target.value)}
              className="p-2 text-[12px] bg-[#0c1626]/60 border border-white/5 text-white/80 rounded-xl outline-none focus:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {showCurrentCheckbox && onCurrentChange && (
        <label className="flex items-center gap-2 text-[12px] text-white/70 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(e) => {
              onCurrentChange(e.target.checked);
              if (e.target.checked) {
                onEndChange("");
              }
            }}
            className="w-3.5 h-3.5 rounded border-white/10 bg-white/2 accent-[#05C8C8]"
          />
          I currently work/study here
        </label>
      )}
    </div>
  );
}
