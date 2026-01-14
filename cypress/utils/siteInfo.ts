export const waitForResourceModal = () => {
  cy.wait('@resourceRequest', { timeout: 6000 }).then(() => {
    cy.get('[data-cy="tap-organization-name"]', { timeout: 6000 }).should(
      'exist'
    );
  });
};

export const waitForMarker = () => {
  cy.wait('@resourcesRequest', { timeout: 6000 })
    .get('[data-cy="marker-1"]')
    .parent()
    .click({ force: true });
  cy.location('search').should('contain', 'r=');
};

export const clickOnFirstMarker = () => {
  cy.get('[data-cy="marker-1"]').parent().scrollIntoView();
  cy.get('[data-cy="marker-1"]').parent().click({ force: true });
  cy.location('search').should('contain', 'r=');
};
