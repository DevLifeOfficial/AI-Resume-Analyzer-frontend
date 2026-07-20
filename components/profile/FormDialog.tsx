import { useMemo } from "react";
import { ProfileFieldConfig } from "../../lib/config/profile/types";
import { FormField } from "./FormField";
import { DateRangePicker } from "./DateRangePicker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: ProfileFieldConfig[];
  values: Record<string, unknown>;
  errors: Record<string, string>;
  onValueChange: (name: string, value: unknown) => void;
  onSave: () => void;
  saving?: boolean;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  values,
  errors,
  onValueChange,
  onSave,
  saving = false,
}: FormDialogProps) {
  // Determine if we have start/end dates in this config to group them into a DateRangePicker
  const hasDateRange = useMemo(() => {
    return fields.some((f) => f.name === "startDate") && fields.some((f) => f.name === "endDate");
  }, [fields]);

  // Determine hidden fields based on configuration values (e.g. isCurrent hides endDate)
  const hiddenFields = useMemo(() => {
    const list: string[] = [];
    fields.forEach((field) => {
      if (field.type === "checkbox" && values[field.name] && field.hidesFields) {
        list.push(...field.hidesFields);
      }
    });
    return list;
  }, [fields, values]);

  // Render a field if it's not hidden and not part of the date range picker (we group them)
  const fieldsToRender = useMemo(() => {
    return fields.filter((f) => {
      if (hiddenFields.includes(f.name)) return false;
      if (hasDateRange && (f.name === "startDate" || f.name === "endDate" || f.name === "isCurrent")) {
        return false;
      }
      return true;
    });
  }, [fields, hiddenFields, hasDateRange]);

  // Dynamic recommendations lookup - we can pass generic presets for tags
  const getFieldRecommendations = (fieldName: string) => {
    if (fieldName === "skillsUsed" || fieldName === "techStack") {
      return [
        "React", "TypeScript", "Node.js", "GraphQL", "Python",
        "Docker", "AWS", "Next.js", "TailwindCSS", "PostgreSQL"
      ];
    }
    return [];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-white/5 bg-[#0d1624]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <style>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar { display: none; }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <DialogHeader>
          <DialogTitle className="text-[16px] font-bold text-white tracking-tight">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-5 mt-4"
        >
          {/* Custom DateRangePicker if start/end dates exist in fields */}
          {hasDateRange && (
            <DateRangePicker
              startDate={values.startDate}
              endDate={values.endDate}
              isCurrent={values.isCurrent}
              onStartChange={(val) => onValueChange("startDate", val)}
              onEndChange={(val) => onValueChange("endDate", val)}
              onCurrentChange={(val) => onValueChange("isCurrent", val)}
              showCurrentCheckbox={fields.some((f) => f.name === "isCurrent")}
            />
          )}

          {/* Render remaining form fields */}
          {fieldsToRender.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={(val) => onValueChange(field.name, val)}
              error={errors[field.name]}
              recommendations={getFieldRecommendations(field.name)}
            />
          ))}

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-[12px] font-semibold rounded-xl text-white/55 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-[12px] font-semibold rounded-xl text-[#0d1624] bg-[#05C8C8] hover:bg-[#04b0b0] transition-all shadow-lg shadow-[#05C8C8]/10 flex items-center gap-1.5"
            >
              {saving ? (
                <span className="w-3.5 h-3.5 border-2 border-[#0d1624] border-t-transparent rounded-full animate-spin" />
              ) : null}
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
