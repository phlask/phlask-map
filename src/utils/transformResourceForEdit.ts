import type { ResourceEntry } from 'types/ResourceEntry';

const DATE_FIELDS = new Set(['date_created', 'last_modified']);

// DB stores legacy entry_type values that don't match the current enum.
const ENTRY_TYPE_MAP: Record<string, string> = {
  'Open access': 'OPEN',
  'Restricted': 'RESTRICTED',
  'Unsure': 'UNSURE'
};

/**
 * Normalizes a Postgres timestamp to ISO 8601 format that zod accepts.
 * Supabase returns formats like "2025-08-14T00:00:00+00:00" but zod's
 * z.iso.datetime() expects the "Z" suffix.
 */
function normalizeDate(value: unknown): string {
  if (typeof value !== 'string') return new Date().toISOString();
  try {
    return new Date(value).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Transforms a ResourceEntry from the database into a shape that zod form
 * schemas can parse. The DB returns nullable fields and extra fields (id, hours)
 * that the form schemas don't expect.
 *
 * - Strips DB-only fields (id, hours)
 * - Removes null entries so schema defaults apply
 * - Normalizes date fields to ISO 8601 with Z suffix
 * - Normalizes nested verification dates
 */
export function transformResourceForEdit(
  resource: ResourceEntry
): Record<string, unknown> {
  const {
    id: _id,
    hours: _hours,
    providers: _providers,
    source: _source,
    ...rest
  } = resource;

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rest)) {
    if (value === null || value === undefined) continue;

    if (key === 'entry_type' && typeof value === 'string') {
      const mapped = ENTRY_TYPE_MAP[value] ?? value;
      result[key] = mapped;
    } else if (DATE_FIELDS.has(key)) {
      result[key] = normalizeDate(value);
    } else if (key === 'verification' && typeof value === 'object') {
      const verification = value as Record<string, unknown>;
      result[key] = {
        ...verification,
        last_modified: normalizeDate(verification.last_modified)
      };
    } else {
      result[key] = value;
    }
  }

  return result;
}
