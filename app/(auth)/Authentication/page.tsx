import type { Metadata } from "next";
import { LOGIN_CONFIG } from "@/lib/config/auth.config";import { AuthLayout } from "./Components/AuthLayout";
import { AuthCard } from "./Components/AuthCard";
;

export const metadata: Metadata = {
  title: "Sign In — ResumeAI",
  description: "Sign in to your ResumeAI account and continue optimizing your resume.",
};

export default function LoginPage() {
  return (
    <AuthLayout config={LOGIN_CONFIG}>
      <AuthCard config={LOGIN_CONFIG} />
    </AuthLayout>
  );    
}