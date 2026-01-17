import { createClient } from '@supabase/supabase-js';
import type { ResourceEntry } from 'types/ResourceEntry';
import type { ResourceTypeOption } from 'hooks/useResourceType';
import type { Contributor } from 'types/Contributor';

// Need access to the database? Message us in the #phlask-data channel on Slack
const databaseUrl =
  import.meta.env.VITE_DB_URL || 'https://wantycfbnzzocsbthqzs.supabase.co';
const resourceDatabaseName = 'resources';
const databaseApiKey =
  import.meta.env.VITE_DB_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbnR5Y2Zibnp6b2NzYnRocXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDY2OTgsImV4cCI6MjA1MjYyMjY5OH0.yczsMOx3Y-zsWu-GjYEajIb0yw9fYWEIUglmmfM1zCY';
const contributorDatabaseName = 'contributors';

const supabase = createClient(databaseUrl, databaseApiKey);

export type FetchResourcesOptions = {
  /** The number of resources to fetch per page (default: 50) */
  limit?: number;
  /** The offset for pagination (default: 0) */
  offset?: number;
  /** Filter by resource type */
  resourceType?: ResourceTypeOption;
  /** Filter by status */
  status?:
    | 'OPERATIONAL'
    | 'TEMPORARILY_CLOSED'
    | 'PERMANENTLY_CLOSED'
    | 'HIDDEN';
  filters?: { name: string; value: string | string[] }[];
};

export async function getResources(
  options: FetchResourcesOptions = {}
): Promise<ResourceEntry[]> {
  const { limit, offset, resourceType, status, filters = [] } = options;

  // Build the query with filters
  let query = supabase
    .from(resourceDatabaseName)
    .select(`id,name,latitude,longitude,resource_type,entry_type`, {
      count: 'exact'
    });

  if (typeof limit === 'number' && typeof offset === 'number') {
    query = query.range(offset, offset + limit - 1);
  }

  // Apply filters if provided
  if (resourceType) {
    query = query.eq('resource_type', resourceType);
  }

  if (status) {
    query = query.eq('status', status);
  }

  if (filters.length) {
    filters
      .filter(({ value }) => {
        if (Array.isArray(value)) {
          return Boolean(value.length);
        }
        return Boolean(value);
      })
      .forEach(({ name, value }) => {
        query = query.filter(
          name,
          'eq',
          Array.isArray(value) ? JSON.stringify(value) : value
        );
      });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch resources: ${error.message}`);
  }

  return (data || []) as ResourceEntry[];
}

export const getResourceById = async (id: string): Promise<ResourceEntry> => {
  const { data, error } = await supabase
    .from(resourceDatabaseName)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateResource = {
  render: async (resource: ResourceEntry) => {
    const { data, error } = await supabase
      .from(resourceDatabaseName)
      .upsert(resource);
    if (error) {
      throw error;
    }
    return data;
  }
};

export const addResource = async (resource: ResourceEntry) => {
  const { data, error } = await supabase
    .from(resourceDatabaseName)
    .insert<ResourceEntry>(resource);
  if (error) {
    throw error;
  }
  return data;
};

export const getContributors = async (): Promise<Contributor[]> => {
  const { data, error } = await supabase
    .from(contributorDatabaseName)
    .select('*');
  if (error) {
    throw error;
  }
  return data;
};

export default {};
