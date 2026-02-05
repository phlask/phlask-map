import type { ResourceEntry } from 'types/ResourceEntry';

/**
 * Transforms a ResourceEntry from the database into a shape that zod form
 * schemas can parse. The DB returns nullable fields and extra fields (id, hours)
 * that the form schemas don't expect.
 *
 * Strips unknown fields and converts null → undefined so that schema defaults
 * apply for missing values while preserving existing data.
 */
export function transformResourceForEdit(
  resource: ResourceEntry
): Record<string, unknown> {
  const { id: _id, hours: _hours, ...rest } = resource;

  return Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [
      key,
      value === null ? undefined : value
    ])
  );
}
