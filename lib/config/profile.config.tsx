// Field configs for the profile "collection" sections (experience, education,
// projects, certificates). Follows the same config-driven pattern as
// auth.config.tsx so add/edit forms are generated from data, not hand-built
// per section — add a field here and the dialog picks it up automatically.

export type ProfileFieldType =
  | "text"
  | "textarea"
  | "date"
  | "checkbox"
  | "url"
  | "tags";

export interface ProfileFieldConfig {
  name: string;
  label: string;
  type: ProfileFieldType;
  placeholder?: string;
  required?: boolean;
  /** For "checkbox" fields that should hide date fields when checked, e.g. isCurrent hides endDate */
  hidesFields?: string[];
}

export interface CollectionConfig {
  key: "experience" | "education" | "projects" | "certificates";
  title: string;
  description: string;
  addLabel: string;
  emptyMessage: string;
  fields: ProfileFieldConfig[];
  /** Primary/secondary line shown in the collapsed list view */
  getTitle: (item: any) => string;
  getSubtitle: (item: any) => string;
}

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

export const EDUCATION_FIELDS: ProfileFieldConfig[] = [
  { name: "institution", label: "Institution", type: "text", required: true, placeholder: "University of..." },
  { name: "degree", label: "Degree", type: "text", required: true, placeholder: "B.S. Computer Science" },
  { name: "fieldOfStudy", label: "Field of Study", type: "text" },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
  { name: "grade", label: "Grade / GPA", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

export const PROJECT_FIELDS: ProfileFieldConfig[] = [
  { name: "title", label: "Project Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "techStack", label: "Tech Stack", type: "tags" },
  { name: "projectUrl", label: "Live URL", type: "url", placeholder: "https://..." },
  { name: "repoUrl", label: "Repository URL", type: "url", placeholder: "https://github.com/..." },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
];

export const CERTIFICATE_FIELDS: ProfileFieldConfig[] = [
  { name: "name", label: "Certificate Name", type: "text", required: true },
  { name: "issuingOrganization", label: "Issuing Organization", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "credentialId", label: "Credential ID", type: "text" },
  { name: "credentialUrl", label: "Credential URL", type: "url" },
];

const formatRange = (start?: string, end?: string, isCurrent?: boolean) => {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  if (!start && !end && !isCurrent) return "";
  return `${fmt(start)} — ${isCurrent ? "Present" : fmt(end)}`;
};

export const EXPERIENCE_CONFIG: CollectionConfig = {
  key: "experience",
  title: "Experience",
  description: "Your work history — most relevant for tailored ATS scoring.",
  addLabel: "Add Experience",
  emptyMessage: "No experience added yet.",
  fields: EXPERIENCE_FIELDS,
  getTitle: (item) => `${item.title} · ${item.company}`,
  getSubtitle: (item) =>
    [item.location, formatRange(item.startDate, item.endDate, item.isCurrent)]
      .filter(Boolean)
      .join(" — "),
};

export const EDUCATION_CONFIG: CollectionConfig = {
  key: "education",
  title: "Education",
  description: "Degrees, certifications programs, and coursework.",
  addLabel: "Add Education",
  emptyMessage: "No education added yet.",
  fields: EDUCATION_FIELDS,
  getTitle: (item) => `${item.degree} · ${item.institution}`,
  getSubtitle: (item) =>
    [item.fieldOfStudy, formatRange(item.startDate, item.endDate)].filter(Boolean).join(" — "),
};

export const PROJECTS_CONFIG: CollectionConfig = {
  key: "projects",
  title: "Projects",
  description: "Side projects, portfolio pieces, and case studies.",
  addLabel: "Add Project",
  emptyMessage: "No projects added yet.",
  fields: PROJECT_FIELDS,
  getTitle: (item) => item.title,
  getSubtitle: (item) => (item.techStack ?? []).join(", "),
};

export const CERTIFICATES_CONFIG: CollectionConfig = {
  key: "certificates",
  title: "Certificates",
  description: "Licenses and certifications.",
  addLabel: "Add Certificate",
  emptyMessage: "No certificates added yet.",
  fields: CERTIFICATE_FIELDS,
  getTitle: (item) => item.name,
  getSubtitle: (item) =>
    [item.issuingOrganization, formatRange(item.issueDate, item.expiryDate)]
      .filter(Boolean)
      .join(" — "),
};