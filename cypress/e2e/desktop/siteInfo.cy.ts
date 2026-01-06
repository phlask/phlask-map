// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe('site info', () => {
  beforeEach(() => {
    cy.mockGeoLocation();
    cy.visit('/');

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    cy.get('[data-cy=button-WATER-data-selector]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=resource-icon-WATER]');
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a food site', () => {
    cy.get('[data-cy=button-FOOD-data-selector]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=resource-icon-FOOD]');
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a foraging site', () => {
    cy.get('[data-cy=button-FORAGE-data-selector]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=resource-icon-FORAGE]');
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });

  it('should successfully display a bathroom site', () => {
    cy.get('[data-cy=button-BATHROOM-data-selector]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    cy.get('[data-cy=resource-icon-BATHROOM]');
    cy.get('[data-cy=tap-organization-name]').should('exist');
  });
});
