import { defineConfig } from 'cypress';
import { createClient } from '@supabase/supabase-js';

const databaseUrl = 'https://wantycfbnzzocsbthqzs.supabase.co';
const resourceDatabaseName = 'resources';
const databaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbnR5Y2Zibnp6b2NzYnRocXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNDY2OTgsImV4cCI6MjA1MjYyMjY5OH0.yczsMOx3Y-zsWu-GjYEajIb0yw9fYWEIUglmmfM1zCY';

const supabase = createClient(databaseUrl, databaseApiKey);

async function getResources() {
  const { data, error } = await supabase.from(resourceDatabaseName).select('*');
  if (error) {
    throw error;
  }
  return data;
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        getResources,
        log(message) {
          console.log(message)

          return null
        }
      })
    },
    watchForFileChanges: false,
    specPattern: 'cypress/integration/desktop/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    video: true
  }
});
