import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/mobile/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    video: true,
    viewportWidth: 375,
    viewportHeight: 812,
    env: {
      VITE_CYPRESS_TEST: true
    }
  }
});