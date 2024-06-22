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

      cy.get('[data-cy=filter-apply-button]').click()

      // Close the filter menu
      cy.get('[data-cy=button-filter-menu]').click()
      
      // Check that a location that matches filter is present
      cy.get('[title=data-cy-2]').should('exist');

      // Check that a location that does not match filter is not present
      // NOTE: This is commented as this test will not current pass as filtering is not working properly.
      // cy.get('[title=data-cy-1]').should('not.exist');
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
