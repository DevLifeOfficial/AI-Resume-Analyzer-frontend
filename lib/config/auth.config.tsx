"use client"

export interface AuthFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  description?: string;
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}

export interface OAuthProviderConfig {
  id: string;
  label: string;
  icon: "Google" | "LinkedIn";
  hoverClass: string;
}

export interface AuthPageConfig {
  heading: string;
  subheading: string;

  submitLabel: string;
  loadingLabel: string;

  switchText: string;
  switchLinkLabel: string;
  switchHref: string;

  showForgotPassword?: boolean;
  mode: "login" | "register";

  bullets: string[];
  fields: AuthFieldConfig[];
  oauthProviders: OAuthProviderConfig[];
}

export const LOGIN_CONFIG: AuthPageConfig = {
  heading: "Welcome Back",
  subheading: "Continue optimizing your resume with AI",

  submitLabel: "Sign In",
  loadingLabel: "Signing in...",

  switchText: "Don't have an account?",
  switchLinkLabel: "Create account",
  switchHref: "/Register", 
  mode: "login",
  showForgotPassword: true,

  bullets: [
    "AI-powered resume scoring in seconds",
    "Beat ATS filters with keyword matching",
    "Land 3× more interviews",
  ],

  fields: [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Enter a valid email address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      autoComplete: "current-password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
  ],

  oauthProviders: [
    {
      id: "google",
      label: "Google",
      icon: "Google",
      hoverClass: "hover:bg-white/8",
    },
  ],
};

export const REGISTER_CONFIG: AuthPageConfig = {
  heading: "Create Account",
  subheading: "Start your AI-powered career journey",

  submitLabel: "Create Account",
  loadingLabel: "Creating account...",

  switchText: "Already have an account?",
  switchLinkLabel: "Sign in",
  switchHref: "/Authentication",  
  mode: "register",

  bullets: [
    "Join 200k+ job seekers worldwide",
    "AI resume analysis in 8 seconds",
    "94% ATS pass rate on average",
  ],

  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      autoComplete: "name",
      validation: {
        required: "Full name is required",
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Enter a valid email address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create a strong password",
      autoComplete: "new-password",
      description: "Minimum 8 characters",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
  ],

  oauthProviders: [
    {
      id: "google",
      label: "Google",
      icon: "Google",
      hoverClass: "hover:bg-white/8",
    },
  ],
};

