import { defineConfig } from 'cypress';
import fs from 'node:fs/promises';

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
    videosFolder: 'cypress/videos/desktop',
    defaultBrowser: 'chrome',
    setupNodeEvents: on => {
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
