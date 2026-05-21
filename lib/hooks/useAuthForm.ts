"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AuthPageConfig } from "@/lib/config/auth.config";

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export function useAuthForm(config: AuthPageConfig) {
  const form = useForm<AuthFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    // Build validation rules from the config field definitions
    // so auth.config.ts is the single source of truth for validation.
    // Pass the rules object to each register() call in AuthCard.
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  /**
   * Returns react-hook-form register options derived from an AuthFieldConfig's
   * validation spec. This keeps all validation rules co-located with config.
   */
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

      // TODO: wire up your login/register mutation here
      // e.g. await signIn("credentials", { ...data, redirect: false })
      //      or await registerMutation.mutateAsync(data)

    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const oauthHandlers: Record<string, () => Promise<void>> = {
    google: async () => {
      try {
        setOauthLoading("google");
        console.log("Google OAuth →", config.mode);
        // TODO: await signIn("google")
      } finally {
        setOauthLoading(null);
      }
    },

    linkedin: async () => {
      try {
        setOauthLoading("linkedin");
        console.log("LinkedIn OAuth →", config.mode);
        // TODO: await signIn("linkedin")
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