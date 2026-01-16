import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import fs from 'node:fs/promises';

export default defineConfig({
  e2e: {
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/mobile/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    video: true,
    viewportWidth: 375,
    viewportHeight: 667,
    videosFolder: 'cypress/videos/mobile',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    retries: {
      openMode: 1,
      runMode: 2
    },
    defaultBrowser: 'chrome',
    setupNodeEvents: on => {
      on('file:preprocessor', vitePreprocessor());
      on('after:spec', (_spec, results) => {
        if (!results || !results.video) {
          return;
        }

        const failures = results.tests.filter(test =>
          test.attempts.some(attempt => attempt.state === 'failed')
        );

        if (failures) {
          return;
        }
        fs.rm(results.video);
      });
    }
  }
});
