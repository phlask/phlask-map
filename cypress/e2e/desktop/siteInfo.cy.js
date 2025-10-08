// TODO
// Add expected fail cases

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe('site info', () => {
  beforeEach(() => {
    cy.mockGeolocationToCityHall();
    cy.visit('/');
  });

  it('should successfully display a water site', () => {
    // Load a sample water site.
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click();
    cy.get('[data-cy=tap-organization-name]').should(
      'have.text',
      'Test Organization'
    );
  });

  it('should successfully display a food site', () => {
    // Switch to food view
    cy.get('[data-cy=button-resource-type-menu]').click()
    cy.get('[data-cy=button-FOOD-data-selector]').click()
    cy.get('[data-cy=button-resource-type-menu]').click()

    // Load a sample food site
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click();

    cy.get('[data-cy=tap-organization-name]').should(
      'have.text',
      'Test Organization'
    );
  });

  it('should successfully display a foraging site', () => {
    // Switch to foraging view
    cy.get('[data-cy=button-resource-type-menu]').click()
    cy.get('[data-cy=button-FORAGE-data-selector]').click()
    cy.get('[data-cy=button-resource-type-menu]').click()

    // Wait for specific foraging marker to be visible
    cy.get('[title^="data-cy-"]').should('be.visible').first().click();

    // Verify that the info window appears with location name
    cy.get('[data-cy=tap-organization-name]').should('exist');
    cy.get('[data-cy=tap-organization-name]').invoke('text').should('not.be.empty');
  });

  it('should successfully display a bathroom site', () => {
    // TODO
  });
});
