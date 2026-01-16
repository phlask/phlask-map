import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/desktop/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    video: true,
    retries: {
      openMode: 1,
      runMode: 2
    },
    defaultBrowser: 'chrome'
  }
});
