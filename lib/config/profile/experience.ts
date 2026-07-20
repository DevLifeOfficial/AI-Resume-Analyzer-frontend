import { CollectionConfig, ProfileFieldConfig } from "./types";

export const EXPERIENCE_FIELDS: ProfileFieldConfig[] = [
  { name: "title", label: "Job Title", type: "text", required: true, placeholder: "Senior Data Scientist" },
  { name: "company", label: "Company", type: "text", required: true, placeholder: "Stripe" },
  { name: "location", label: "Location", type: "text", placeholder: "Remote · San Francisco, CA" },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date", hidesFields: [] },
  { name: "isCurrent", label: "I currently work here", type: "checkbox", hidesFields: ["endDate"] },
  { name: "description", label: "Description", type: "textarea", placeholder: "Impact, scope, key metrics..." },
  { name: "skillsUsed", label: "Skills Used", type: "tags" },
];

const formatRange = (start?: string, end?: string, isCurrent?: boolean) => {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  if (!start && !end && !isCurrent) return "";
  return `${fmt(start)} — ${isCurrent ? "Present" : fmt(end)}`;
};

import { Experience } from "@/lib/types/profile.type";

export const EXPERIENCE_CONFIG: CollectionConfig = {
  key: "experience",
  title: "Experience",
  description: "Your work history — most relevant for tailored ATS scoring.",
  addLabel: "Add Experience",
  emptyMessage: "No experience added yet.",
  fields: EXPERIENCE_FIELDS,
  getTitle: (item) => {
    const exp = item as unknown as Experience;
    return `${exp.title} · ${exp.company}`;
  },
  getSubtitle: (item) => {
    const exp = item as unknown as Experience;
    return [exp.location, formatRange(exp.startDate, exp.endDate, exp.isCurrent)]
      .filter(Boolean)
      .join(" — ");
  },
};
