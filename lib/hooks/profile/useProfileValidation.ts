import { useState, useCallback } from "react";
import { ProfileFieldConfig } from "../../config/profile/types";

export function useProfileValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((values: Record<string, unknown>, fields: ProfileFieldConfig[]) => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const val = values[field.name];

      // Check required
      if (field.required && (!val || (typeof val === "string" && !val.trim()))) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Check URLs
      if (field.type === "url" && val && typeof val === "string" && val.trim()) {
        try {
          if (!val.startsWith("http://") && !val.startsWith("https://")) {
            newErrors[field.name] = "URL must start with http:// or https://";
          } else {
            new URL(val);
          }
        } catch {
          newErrors[field.name] = "Please enter a valid URL";
        }
      }
    });

    // Cross-field validation (e.g. startDate and endDate chronological check)
    const startDate = values.startDate as string | number | Date | undefined;
    const endDate = values.endDate as string | number | Date | undefined;
    const isCurrent = values.isCurrent as boolean | undefined;

    if (
      startDate &&
      endDate &&
      !isCurrent &&
      (typeof startDate === "string" || typeof startDate === "number" || startDate instanceof Date) &&
      (typeof endDate === "string" || typeof endDate === "number" || endDate instanceof Date)
    ) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validate,
    clearErrors,
    setErrors,
  };
}
