"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import type { AuthPageConfig } from "@/lib/config/auth.config";
import { LOGIN, REGISTER } from "@/GraphQL/graphql";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export function useAuthForm(config: AuthPageConfig) {
  const router = useRouter();
  const form = useForm<AuthFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);
  const  { refreshUser } = useAuth();
  function getRegisterOptions(fieldName: string) {
    const fieldConfig = config.fields.find((f) => f.name === fieldName);

    if (!fieldConfig?.validation) return {};

    const { required, minLength, pattern } = fieldConfig.validation;

    return {
      ...(required ? { required } : {}),
      ...(minLength ? { minLength } : {}),
      ...(pattern ? { pattern } : {}),
    };
  }

  const onSubmit = async (data: AuthFormData) => {
    try {
      setLoading(true);

      console.log("AUTH SUBMIT:", config.mode, data);

      const result =
        config.mode === "login"
          ? await loginMutation({
              variables: {
                input: {
                  email: data.email,
                  password: data.password,
                },
              },
            })
          : await registerMutation({
              variables: {
                input: {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                },
              },
            });

      if (!result.data) return;
      refreshUser(); // Refresh the user context after successful login or registration
      router.push(config.mode === "login" ? "/Home" : "/Authentication");
    } catch (error: any) {
      console.error("Authentication failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const oauthHandlers: Record<string, () => Promise<void>> = {
    google: async () => {
      try {
        setOauthLoading("google");

        window.location.href = `${process.env.NEXT_PUBLIC_OAUTH_API_URL}/auth/google`;
      } finally {
        setOauthLoading(null);
      }
    },
  };

  return {
    form,
    loading,
    oauthLoading,
    onSubmit,
    oauthHandlers,
    getRegisterOptions,
  };
}
