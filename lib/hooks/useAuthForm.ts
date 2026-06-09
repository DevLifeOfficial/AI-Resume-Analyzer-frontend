"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AuthPageConfig } from "@/lib/config/auth.config";
import { useMutation } from "@apollo/client/react";
import { LOGIN, REGISTER } from "@/GraphQL/graphql";

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
    mode: "onBlur",
  });

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

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

      const [loginMutation] = useMutation(LOGIN);
      const [registerMutation] = useMutation(REGISTER);

      const result = config.mode === "login" ? 
        await loginMutation({ variables: { input: data } })
      :  await registerMutation({ variables: { input: data } });

      console.log("Auth result:", result);

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