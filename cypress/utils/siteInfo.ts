export const waitForResourceModal = () =>
  cy.wait('@resourceRequest', { timeout: 6000 }).then(() => {
    cy.get('[data-cy=tap-organization-name]', { timeout: 6000 }).should(
      'exist'
    );
  });
