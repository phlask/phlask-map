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

Cypress.Commands.add('switchResourceType', (resourceType) => {
    cy.get('[data-cy=button-resource-type-menu]').click()
    cy.get(`[data-cy=button-${resourceType}-data-selector]`).click()
    cy.get('[data-cy=button-resource-type-menu]').click()
})

Cypress.Commands.add('zoomMapOutMax', () => {
    // Zoom out the map to allow all taps to be rendered globally
    for (let n = 0; n < 15; n++) {
        cy.get('div > [title="Zoom out"]').click()
    }
})
