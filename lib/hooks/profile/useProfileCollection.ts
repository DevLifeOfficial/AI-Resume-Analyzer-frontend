import { useCallback } from "react";
import { CollectionConfig } from "../../config/profile/types";
import { useProfileCollectionState } from "./useProfileCollectionState";
import { useProfileValidation } from "./useProfileValidation";
import { useProfileMutation } from "./useProfileMutation";
import { toGraphQLInputList } from "../../utils/profile.mapper";

interface UseProfileCollectionProps {
  config: CollectionConfig;
  items: Record<string, unknown>[];
}

export function useProfileCollection({ config, items }: UseProfileCollectionProps) {
  const state = useProfileCollectionState();
  const validation = useProfileValidation();
  const mutation = useProfileMutation();

  const handleSave = useCallback(async () => {
    // Validate
    const isValid = validation.validate(state.formValues, config.fields);
    if (!isValid) return false;

    // Create a copy of the current list
    const updatedList = [...(items ?? [])];

    // Map UI values back to pure data (excluding React state items if any)
    const cleanFormValues = { ...state.formValues };

    if (state.editingIndex !== null) {
      // Edit mode: replace the item at the specific index
      // Retain the existing Mongoose ID if present
      const originalItem = items[state.editingIndex];
      updatedList[state.editingIndex] = {
        ...originalItem,
        ...cleanFormValues,
      };
    } else {
      // Add mode: append
      updatedList.push(cleanFormValues);
    }

    // Convert UI models to GraphQL inputs
    const graphQLInputList = toGraphQLInputList(updatedList, config.fields);

    try {
      await mutation.updateProfileSection(config.key, graphQLInputList);
      state.closeDialogs();
      validation.clearErrors();
      return true;
    } catch (err) {
      console.error(`Failed to save ${config.title}:`, err);
      return false;
    }
  }, [state, items, config, validation, mutation]);

  const handleDelete = useCallback(async () => {
    if (state.deleteIndex === null) return false;

    const updatedList = [...(items ?? [])];
    updatedList.splice(state.deleteIndex, 1);

    const graphQLInputList = toGraphQLInputList(updatedList, config.fields);

    try {
      await mutation.updateProfileSection(config.key, graphQLInputList);
      state.closeDialogs();
      return true;
    } catch (err) {
      console.error(`Failed to delete ${config.title}:`, err);
      return false;
    }
  }, [state, items, config, mutation]);

  return {
    // States
    formOpen: state.formOpen,
    editingIndex: state.editingIndex,
    editingItem: state.editingItem,
    deleteIndex: state.deleteIndex,
    formValues: state.formValues,
    errors: validation.errors,
    saving: mutation.loading,
    saveError: mutation.error,

    // Methods
    openAdd: state.openAdd,
    openEdit: state.openEdit,
    openDelete: state.openDelete,
    closeDialogs: () => {
      state.closeDialogs();
      validation.clearErrors();
    },
    updateFormValue: state.updateFormValue,
    onSave: handleSave,
    onDelete: handleDelete,
  };
}
