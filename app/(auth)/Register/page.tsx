import type { Metadata } from "next";
import { REGISTER_CONFIG } from "@/lib/config/auth.config";
import { AuthLayout } from "../Authentication/Components/AuthLayout";
import { AuthCard } from "../Authentication/Components/AuthCard";


export const metadata: Metadata = {
  title: "Create Account — ResumeAI",
  description: "Create your free ResumeAI account. No credit card required.",
};

export default function RegisterPage() {
  return (
    <AuthLayout config={REGISTER_CONFIG}>
      <AuthCard config={REGISTER_CONFIG} />
    </AuthLayout>
  );
}