import { CollectionConfig, ProfileFieldConfig } from "./types";

export const EDUCATION_FIELDS: ProfileFieldConfig[] = [
  { name: "institution", label: "Institution", type: "text", required: true, placeholder: "University of..." },
  { name: "degree", label: "Degree", type: "text", required: true, placeholder: "B.S. Computer Science" },
  { name: "fieldOfStudy", label: "Field of Study", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "grade", label: "Grade / GPA", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

const formatRange = (start?: string, end?: string) => {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  if (!start && !end) return "";
  return `${fmt(start)} — ${fmt(end) || "Present"}`;
};

import { Education } from "@/lib/types/profile.type";

export const EDUCATION_CONFIG: CollectionConfig = {
  key: "education",
  title: "Education",
  description: "Degrees, certifications programs, and coursework.",
  addLabel: "Add Education",
  emptyMessage: "No education added yet.",
  fields: EDUCATION_FIELDS,
  getTitle: (item) => {
    const edu = item as unknown as Education;
    return `${edu.degree} · ${edu.institution}`;
  },
  getSubtitle: (item) => {
    const edu = item as unknown as Education;
    return [edu.fieldOfStudy, formatRange(edu.startDate, edu.endDate)].filter(Boolean).join(" — ");
  },
};
