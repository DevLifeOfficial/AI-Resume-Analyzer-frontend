// Shared profile types — mirrors the backend's user.graphql types 1:1 so the
// frontend and API never drift silently.

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string[];
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description?: string;
  techStack?: string[];
  projectUrl?: string;
  repoUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certificate {
  _id?: string;
  name: string;
  issuingOrganization?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SocialLinks {
  github?: string;
  portfolio?: string;
  twitter?: string;
  website?: string;
}

// Full profile-bearing user, as returned by getCurrentUser / updateProfile
export interface ProfileUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  plan: string;
  linkedInUrl?: string;
  profileSummary?: string;
  skills?: string[];
  interests?: string[];
  experience?: Experience[];
  education?: Education[];
  projects?: Project[];
  certificates?: Certificate[];
  socialLinks?: SocialLinks;
}

// Matches UpdateProfileInput in user.graphql — every field optional since
// each section sends only the slice of the profile it owns.
export interface UpdateProfileInput {
  name?: string;
  avatarUrl?: string;
  profileSummary?: string;
  skills?: string[];
  interests?: string[];
  experience?: Experience[];
  education?: Education[];
  projects?: Project[];
  certificates?: Certificate[];
  socialLinks?: SocialLinks;
  linkedInUrl?: string;
}

// Keys of UpdateProfileInput whose value is an array of records — used to
// type the generic CollectionSection component.
export type ProfileCollectionKey =
  | "experience"
  | "education"
  | "projects"
  | "certificates";