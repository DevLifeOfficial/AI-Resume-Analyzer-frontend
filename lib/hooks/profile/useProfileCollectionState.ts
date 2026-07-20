import { useState, useCallback } from "react";

export function useProfileCollectionState<T = Record<string, unknown>>() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  const openAdd = useCallback(() => {
    setEditingIndex(null);
    setEditingItem(null);
    setFormValues({});
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((index: number, item: T) => {
    setEditingIndex(index);
    setEditingItem(item);
    setFormValues(item as unknown as Record<string, unknown>);
    setFormOpen(true);
  }, []);

  const openDelete = useCallback((index: number) => {
    setDeleteIndex(index);
  }, []);

  const closeDialogs = useCallback(() => {
    setFormOpen(false);
    setEditingIndex(null);
    setEditingItem(null);
    setDeleteIndex(null);
    setFormValues({});
  }, []);

  const updateFormValue = useCallback((name: string, value: unknown) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return {
    formOpen,
    editingIndex,
    editingItem,
    deleteIndex,
    formValues,
    openAdd,
    openEdit,
    openDelete,
    closeDialogs,
    updateFormValue,
    setFormValues,
  };
}
