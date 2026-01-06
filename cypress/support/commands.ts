// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Mock geolocation to City Hall coordinates to ensure consistent test behavior
// regardless of tester's physical location
Cypress.Commands.add('mockGeoLocation', () => {
  cy.window().then(win => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake(
      success => {
        success({
          coords: {
            latitude: 39.952744,
            longitude: -75.1635,
            accuracy: 10
          }
        });
      }
    );
  });
});
