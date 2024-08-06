// TODO
// Add expected fail cases

// For each resource type, test each filter permutation and confirm only the expected number of taps appear.
describe("filters", () => {
  beforeEach(() => {
    cy.visit("/");
    // Load the form

    // NOTE: This line currently uses components that are due to be updated.
    // Close the tutorial modal
    cy.get('[aria-label=Close]').click()
    // Load the filter menu
    cy.get('[data-cy=button-filter-menu]').click()
  });

  it("should successfully show a result for each water site filter permutation", () => {
    // TODO Add an approach to test all possible filter permutations
    // Currently limiting this test to a single filtering permutation as a starting point

    cy.get('[data-cy="filter-option-Drinking fountain"]').click()
    cy.get('[data-cy="filter-option-ADA accessible"]').click()
    cy.get('[data-cy="filter-option-Open Access"]').click()
    // Close the filter menu
    cy.get('[data-cy=button-filter-menu]').click()
  });

  it("should successfully show a result for each food site filter permutation", () => {
    // TODO
  });

  it("should successfully show a result for each foraging site filter permutation", () => {
    // TODO
  });

  it("should successfully show a result for each bathroom site filter permutation", () => {
    // TODO
  });
});
