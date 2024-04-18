const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    "watchForFileChanges": false,
    "specPattern": "cypress/e2e/mobile/*.cy.{js,jsx,ts,tsx}",
    "baseUrl": "http://localhost:3000",
    "video": true,
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
  },
  // reporter: 'junit',
  // reporterOptions: {
  //   mochaFile: 'results/my-test-output.xml',
  //   toConsole: true,
  // },
})
