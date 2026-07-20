import { CollectionConfig, ProfileFieldConfig } from "./types";

export const PROJECT_FIELDS: ProfileFieldConfig[] = [
  { name: "title", label: "Project Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "techStack", label: "Tech Stack", type: "tags" },
  { name: "projectUrl", label: "Live URL", type: "url", placeholder: "https://..." },
  { name: "repoUrl", label: "Repository URL", type: "url", placeholder: "https://github.com/..." },
  { name: "startDate", label: "Start Date", type: "date" },
  { name: "endDate", label: "End Date", type: "date" },
];

import { Project } from "@/lib/types/profile.type";

export const PROJECTS_CONFIG: CollectionConfig = {
  key: "projects",
  title: "Projects",
  description: "Side projects, portfolio pieces, and case studies.",
  addLabel: "Add Project",
  emptyMessage: "No projects added yet.",
  fields: PROJECT_FIELDS,
  getTitle: (item) => {
    const proj = item as unknown as Project;
    return proj.title;
  },
  getSubtitle: (item) => {
    const proj = item as unknown as Project;
    return (proj.techStack ?? []).join(", ");
  },
};
