/**
 * Mapper utility to convert data between UI models and GraphQL DTO inputs,
 * stripping metadata (like `_id` and `__typename`) that are disallowed in
 * GraphQL Input types, and sanitizing fields according to their configuration.
 */

import { ProfileFieldConfig } from "../config/profile/types";

export const stripMetadata = (obj: unknown): unknown => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => stripMetadata(item));
  }
  if (typeof obj === "object") {
    const rawObj = obj as Record<string, unknown>;
    const clean: Record<string, unknown> = {};
    for (const key in rawObj) {
      if (Object.prototype.hasOwnProperty.call(rawObj, key)) {
        if (key !== "__typename" && key !== "_id") {
          clean[key] = stripMetadata(rawObj[key]);
        }
      }
    }
    return clean;
  }
  return obj;
};

/**
 * Maps a single UI form state item to a valid GraphQL input by:
 * 1. Filtering fields that are defined in the configuration.
 * 2. Mapping tags arrays and stripping metadata.
 * 3. Cleaning empty values.
 */
export const toGraphQLInput = (
  item: Record<string, unknown>,
  fields: ProfileFieldConfig[]
): Record<string, unknown> | null => {
  if (!item) return null;
  const input: Record<string, unknown> = {};

  fields.forEach((field) => {
    const val = item[field.name];

    // Ensure array for tags type
    if (field.type === "tags") {
      input[field.name] = Array.isArray(val) ? val.filter(Boolean) : [];
      return;
    }

    // Ensure boolean for checkbox
    if (field.type === "checkbox") {
      input[field.name] = Boolean(val);
      return;
    }

    // Treat empty string as undefined/null for fields
    if (val === "" || val === undefined || val === null) {
      return;
    }

    input[field.name] = val;
  });

  return input;
};

/**
 * Maps a list of items to a list of GraphQL inputs.
 */
export const toGraphQLInputList = (
  items: Record<string, unknown>[],
  fields: ProfileFieldConfig[]
): Record<string, unknown>[] => {
  return (items ?? [])
    .map((item) => toGraphQLInput(item, fields))
    .filter((input): input is Record<string, unknown> => input !== null);
};

