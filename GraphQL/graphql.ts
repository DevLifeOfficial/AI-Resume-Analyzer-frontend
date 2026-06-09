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

// ── User
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      _id name email avatarUrl role plan
      usage { totalScans monthlyScans dailyScans lastScanDate }
      settings { darkMode notificationOnAnalysisComplete emailNotifications language }
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