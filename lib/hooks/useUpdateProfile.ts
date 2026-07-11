"use client";

import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "@/GraphQL/graphql";
import { useAuth } from "@/lib/context/AuthContext";
import type { ProfileUser, UpdateProfileInput } from "@/lib/types/profile.type";

/**
 * Every profile section (summary, skills, experience, ...) shares this one
 * hook. Each caller sends only the slice of UpdateProfileInput it owns —
 * the backend does a partial $set, so unrelated fields are left untouched.
 *
 * After a successful save we re-run getCurrentUser via AuthContext so the
 * whole app re-renders from one source of truth instead of juggling
 * separate local + cache copies of the user.
 */
export function useUpdateProfile() {
  const { refreshUser } = useAuth();
  const [mutate, { loading, error }] = useMutation<{
    updateProfile: ProfileUser;
  }>(UPDATE_PROFILE);

  const updateProfile = async (input: UpdateProfileInput) => {
    const result = await mutate({ variables: { input } });
    await refreshUser();
    return result.data?.updateProfile ?? null;
  };

  return { updateProfile, saving: loading, error };
}