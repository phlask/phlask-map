import { createClient } from '@supabase/supabase-js';

// Need access to the database? Message us in the #phlask-data channel on Slack
const databaseUrl =
  import.meta.env.VITE_DB_URL || 'https://wantycfbnzzocsbthqzs.supabase.co';
const resourceDatabaseName = import.meta.env.VITE_DB_NAME || 'resources';
const databaseApiKey =
  import.meta.env.VITE_DB_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbnR5Y2Zibnp6b2NzYnRocXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDY2OTgsImV4cCI6MjA1MjYyMjY5OH0.yczsMOx3Y-zsWu-GjYEajIb0yw9fYWEIUglmmfM1zCY';
const contributorDatabaseName = 'contributors';

const supabase = createClient(databaseUrl, databaseApiKey);

/**
 * Get all resources from the database
 * TODO: With supabase, we can easily filter via SQL statements. We should eventually do that instead
 *       of filtering on the frontend.
 * @returns {Promise<Array<ResourceEntry>>} - An array of resources
 */
export const getResources = async () => {
  const { data, error } = await supabase.from(resourceDatabaseName).select('*');
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Update a resource in the database
 * @param {ResourceEntry} resource The resource to update
 * @returns {Promise<ResourceEntry>} The updated resource
 */
export const updateResource = async resource => {
  const { data, error } = await supabase
    .from(resourceDatabaseName)
    .upsert(resource);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Add a resource to the database
 * @param {ResourceEntry} resource The resource to add
 * @returns {Promise<ResourceEntry>} The added resource
 */
export const addResource = async resource => {
  const { data, error } = await supabase
    .from(resourceDatabaseName)
    .insert(resource);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Get all contributors from the database
 * @returns {Promise<Array<import('types/Contributor').Contributor>>} - An array of contributors
 */
export const getContributors = async () => {
  const { data, error } = await supabase
    .from(contributorDatabaseName)
    .select('*');
  if (error) {
    throw error;
  }
  return data;
};

export default {};
