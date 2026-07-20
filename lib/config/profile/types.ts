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
  hidesFields?: string[];
}

export interface CollectionConfig {
  key: "experience" | "education" | "projects" | "certificates";
  title: string;
  description: string;
  addLabel: string;
  emptyMessage: string;
  fields: ProfileFieldConfig[];
  getTitle: (item: Record<string, unknown>) => string;
  getSubtitle: (item: Record<string, unknown>) => string;
}
