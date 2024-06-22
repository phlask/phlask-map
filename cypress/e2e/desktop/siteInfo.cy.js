// TODO
// Add expected fail cases

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe("site info", () => {
  beforeEach(() => {
    cy.visit("/");
    // NOTE: This line currently uses components that are due to be updated.
    // Close the tutorial modal
    cy.get('[aria-label=Close]').click()
  });

  it("should successfully display a water site", () => {
    // Load a sample water site. 
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click()
    cy.get('[data-cy=tap-organization-name]').should('have.text', 'Test Organization')
  });

  it("should successfully display a food site", () => {
    // Switch to food view
    cy.get('[data-cy=button-resource-type-menu]').click()
    cy.get('[data-cy=button-food-data-selector').click()
    cy.get('[data-cy=button-resource-type-menu]').click()

    // Load a sample food site
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click()
    cy.get('[title=data-cy-2]').click()

    cy.get('[data-cy=tap-organization-name]').should('have.text', 'Test Organization')
  });

  it("should successfully display a foraging site", () => {
    // TODO
  });

  it("should successfully display a bathroom site", () => {
    // TODO
  });
});