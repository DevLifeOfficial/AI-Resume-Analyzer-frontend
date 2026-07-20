import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../../../GraphQL/graphql";
import { useAuth } from "../../context/AuthContext";


export function useProfileMutation() {
  const [mutate, { loading, error }] = useMutation(UPDATE_PROFILE);
  const { refreshUser } = useAuth();

  const updateProfileSection = async (sectionKey: string, updatedList: Record<string, unknown>[]) => {
    try {
      const result = await mutate({
        variables: {
          input: {
            [sectionKey]: updatedList,
          },
        },
        // We can do an optimistic response if needed, but since we refresh user or rely on Apollo caching,
        // we can also update the Apollo cache or refetch the current user. Let's run refreshUser to keep
        // local AuthContext state synced!
      });

      if (refreshUser) {
        await refreshUser();
      }

      return (result.data as { updateProfile?: unknown })?.updateProfile;
    } catch (err) {
      console.error(`Mutation failed for section ${sectionKey}:`, err);
      throw err;
    }
  };

  return {
    updateProfileSection,
    loading,
    error,
  };
}
