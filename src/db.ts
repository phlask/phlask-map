import { createClient } from '@supabase/supabase-js';
import type { ResourceEntry } from 'types/ResourceEntry';

// Need access to the database? Message us in the #phlask-data channel on Slack
const databaseUrl =
  import.meta.env.VITE_DB_URL || 'https://wantycfbnzzocsbthqzs.supabase.co';
const resourceDatabaseName = import.meta.env.VITE_DB_NAME || 'resources';
const databaseApiKey =
  import.meta.env.VITE_DB_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbnR5Y2Zibnp6b2NzYnRocXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDY2OTgsImV4cCI6MjA1MjYyMjY5OH0.yczsMOx3Y-zsWu-GjYEajIb0yw9fYWEIUglmmfM1zCY';
const contributorDatabaseName = 'contributors';

const supabase = createClient(databaseUrl, databaseApiKey);

export const getResources = async () => {
  const { data, error } = await supabase.from(resourceDatabaseName).select('*');
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

export const addResource = {
  render: async (resource: ResourceEntry) => {
    const { data, error } = await supabase
      .from(resourceDatabaseName)
      .insert(resource);
    if (error) {
      throw error;
    }
    return data;
  }
};

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
