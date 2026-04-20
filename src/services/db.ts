import { createClient } from '@supabase/supabase-js';
import type { Provider, ResourceEntry } from 'types/ResourceEntry';
import type { ResourceTypeOption } from 'hooks/useResourceType';
import type { Contributor } from 'types/Contributor';
import type { FeedbackForm } from 'types/FeedbackEntry';
import { env } from 'config.ts';

// Need access to the database? Please refer to .example.env and message us in the #phlask-data channel on Slack
const databaseUrl = 'https://wantycfbnzzocsbthqzs.supabase.co';
const databaseApiKey = env.VITE_DB_API_KEY;
const resourceDatabaseName = 'resources';
const contributorDatabaseName = 'airtable_contributors';
const feedbackDatabaseName = 'user_feedbacks';
const providersDatabaseName = 'providers';
const bathroom_part1 = 'bathroom_part1';
const bathroom_part2 = 'bathroom_part2';
const bathroom_part3 = 'bathroom_part3';

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
    .select(`id,name,latitude,longitude,resource_type,entry_type,gp_id`, {
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

export const addFeedback = async (feedback: FeedbackForm) => {
  const { data, error } = await supabase
    .from(feedbackDatabaseName)
    .insert(feedback)
    .select();

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

export const getResourceProviders = async (
  resourceId: string
): Promise<Provider[]> => {
  const { data, error } = await supabase
    .from(providersDatabaseName)
    .select(
      'name, logo_url, url:website_url, resource_providers!inner(resource_id)'
    )
    .eq('resource_providers.resource_id', resourceId);
  if (error) {
    throw error;
  }
  return data;
};

export const getBathroomData = async () => {
  const [part1Res, part2Res, part3Res] = await Promise.all([
    supabase.from(bathroom_part1).select('*'),
    supabase.from(bathroom_part2).select('*'),
    supabase.from(bathroom_part3).select('*')
  ]);

  if (part1Res.error || part2Res.error || part3Res.error) {
    throw new Error(
      `Failed to fetch water data: ${
        part1Res.error?.message ||
        part2Res.error?.message ||
        part3Res.error?.message
      }`
    );
  }

  return {
    part1: part1Res.data || [],
    part2: part2Res.data || [],
    part3: part3Res.data || []
  };
};

const data = await getBathroomData();

console.log(`Part 1 has ${data.part1.length} items`);
console.log(`Part 2 has ${data.part2.length} items`);
console.log(`Part 3 has ${data.part3.length} items`);

export { supabase };
export default {};
