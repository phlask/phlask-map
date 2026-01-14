export const waitForResourceModal = () => {
  cy.wait('@resourceRequest', { timeout: 6000 }).then(() => {
    cy.get('[data-cy="tap-organization-name"]', { timeout: 6000 }).should(
      'exist'
    );
  });
};

export const waitForMarker = () => {
  cy.wait('@resourcesRequest', { timeout: 4000 })
    .get('[data-cy="marker-1"]')
    .parent()
    .click({ force: true });
};

export const clickOnFirstMarker = () => {
  cy.get('[data-cy="marker-1"]').parent().scrollIntoView();
  cy.get('[data-cy="marker-1"]').parent().click({ force: true });
};
