import { gql } from '@apollo/client';

// ── Auth 
export const REGISTER = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      user { id email name role }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      user { id email name role }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

// ── User / Profile
// Fragment shared between getCurrentUser and updateProfile so the two never
// drift out of sync — add a field once, both queries pick it up.
export const PROFILE_FIELDS = gql`
  fragment ProfileFields on User {
    _id
    name
    email
    avatarUrl
    role
    plan
    linkedInUrl
    usage { totalScans monthlyScans dailyScans lastScanDate }
    settings { darkMode notificationOnAnalysisComplete emailNotifications language }
    profileSummary
    skills
    interests
    experience {
      _id title company location startDate endDate isCurrent description skillsUsed
    }
    education {
      _id institution degree fieldOfStudy startDate endDate grade description
    }
    projects {
      _id title description techStack projectUrl repoUrl startDate endDate
    }
    certificates {
      _id name issuingOrganization issueDate expiryDate credentialId credentialUrl
    }
    socialLinks { github portfolio twitter website }
  }
`;
 

// ── User
export const GET_CURRENT_USER = gql`
  ${PROFILE_FIELDS}
  query GetCurrentUser {
    getCurrentUser {
      ...ProfileFields
    }
  }
`;



export const UPDATE_PROFILE = gql`
  ${PROFILE_FIELDS}
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      ...ProfileFields
    }
  }
`;
 

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      _id name email avatarUrl
      settings { darkMode language emailNotifications notificationOnAnalysisComplete }
    }
  }
`;

// ── Resume 
export const UPLOAD_RESUME = gql`
  mutation UploadResume($createResumeInput: CreateResumeInput!) {
    uploadResume(createResumeInput: $createResumeInput) {
      _id filename createdAt
      analyses { analysisId atsScore createdAt }
    }
  }
`;


export const ANALYZE_RESUME = gql`
  mutation AnalyzeResume($analyzeResumeInput: AnalyzeResumeInput!) {
    analyzeResume(analyzeResumeInput: $analyzeResumeInput) {
      atsScore keywords suggestions strengths confidence
    }
  }
`;

export const MY_RESUMES = gql`
  query MyResumes {
    myResumes {
      _id filename createdAt updatedAt
      analyses {
        analysisId atsScore keywords suggestions strengths createdAt
      }
    }
  }
`;

export const GET_RESUME = gql`
  query Resume($id: ID!) {
    resume(id: $id) {
      _id filename rawText createdAt updatedAt
      analyses {
        analysisId atsScore keywords suggestions strengths createdAt
      }
    }
  }
`;

export const DELETE_RESUME = gql`
  mutation DeleteResume($id: ID!) {
    deleteResume(id: $id)
  }
`;