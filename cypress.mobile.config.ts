import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/mobile/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    video: true,
    viewportWidth: 375,
    viewportHeight: 667,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
  }
});
