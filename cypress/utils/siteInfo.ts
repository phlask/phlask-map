export const waitForResourceModal = () => {
  cy.wait('@resourceRequest', { timeout: 6000 });
  cy.location('search').should('contain', 'r=');
  cy.get('[data-cy="tap-organization-name"]', { timeout: 6000 }).should(
    'exist'
  );
};

export const waitForMarker = () => {
  cy.wait('@resourcesRequest', { timeout: 6000 });
  cy.get('[data-cy="marker-1"]', { timeout: 6000 }).should('exist');
  cy.get('[data-cy="marker-1"]').click({ force: true });
};

export const clickOnFirstMarker = () => {
  cy.get('[data-cy="marker-1"]').click({ force: true });
  cy.location('search').should('contain', 'r=');
};
