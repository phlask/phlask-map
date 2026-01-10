// For each resource type, load a site's half modal and full modal
// for each site modal, confirm the required modal mode buttons work and that the relevant information is displayed
describe('modals', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    cy.get('[data-cy=button-WATER-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a food site', () => {
    cy.get('[data-cy=button-FOOD-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a foraging site', () => {
    cy.get('[data-cy=button-FORAGE-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a bathroom site', () => {
    cy.get('[data-cy=button-BATHROOM-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });
});
