const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    "watchForFileChanges": false,
    "specPattern": "cypress/e2e/desktop/*.cy.{js,jsx,ts,tsx}",
    "baseUrl": "http://localhost:3000",
    "video": true
  },
})
