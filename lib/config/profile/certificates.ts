import { CollectionConfig, ProfileFieldConfig } from "./types";

export const CERTIFICATE_FIELDS: ProfileFieldConfig[] = [
  { name: "name", label: "Certificate Name", type: "text", required: true },
  { name: "issuingOrganization", label: "Issuing Organization", type: "text" },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "expiryDate", label: "Expiry Date", type: "date" },
  { name: "credentialId", label: "Credential ID", type: "text" },
  { name: "credentialUrl", label: "Credential URL", type: "url" },
];

const formatRange = (start?: string, end?: string) => {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "";
  if (!start && !end) return "";
  return `${fmt(start)} — ${fmt(end) || "No Expiry"}`;
};

import { Certificate } from "@/lib/types/profile.type";

export const CERTIFICATES_CONFIG: CollectionConfig = {
  key: "certificates",
  title: "Certificates",
  description: "Licenses and certifications.",
  addLabel: "Add Certificate",
  emptyMessage: "No certificates added yet.",
  fields: CERTIFICATE_FIELDS,
  getTitle: (item) => {
    const cert = item as unknown as Certificate;
    return cert.name;
  },
  getSubtitle: (item) => {
    const cert = item as unknown as Certificate;
    return [cert.issuingOrganization, formatRange(cert.issueDate, cert.expiryDate)]
      .filter(Boolean)
      .join(" — ");
  },
};
