export const waitForResourceModal = () =>
  cy
    .wait('@resourceRequest', { timeout: 6000 })
    .get('[data-cy=tap-organization-name]')
    .should('exist');
