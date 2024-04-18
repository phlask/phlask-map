// TODO
// Add expected fail cases

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe("site info", () => {
  // beforeEach(() => {
  //   cy.visit("/");
  //   // NOTE: This line currently uses components that are due to be updated.
  //   // Close the tutorial modal
  //   cy.get('[aria-label=Close]').click()
  // });

  it("should successfully display a water site", () => {
    cy.visit("/");
    // NOTE: This line currently uses components that are due to be updated.
    // Close the tutorial modal
    cy.get('[aria-label=Close]').click()

    // Load a sample water site. 
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-272]').click()
    cy.get('[data-cy=tap-organization-name]').should('have.text', 'La Colombe')
  });

  it("should successfully display a food site", () => {
    // Temporarily mocking location
    // This can be removed as soon as we have the ability to load the site with test data
    cy.mockGeolocation({latitude: 39.939701888715035, longitude: -75.16603343588964})
    cy.visit("/");
    // NOTE: This line currently uses components that are due to be updated.
    // Close the tutorial modal
    cy.get('[aria-label=Close]').click()
    // Switch to food view
    cy.get('[data-cy=button-resource-type-menu]').click()
    cy.get('[data-cy=button-food-data-selector').click()
    cy.get('[data-cy=button-resource-type-menu]').click()

    // Load a sample food site
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-46]').click()

    cy.get('[data-cy=tap-organization-name]').should('have.text', 'CAPA Philadelphia H.S. for Creative and Performing Arts')
  });

  it("should successfully display a foraging site", () => {
    // TODO
  });

  it("should successfully display a bathroom site", () => {
    // TODO
  });
});