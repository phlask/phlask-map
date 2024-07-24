describe("search", () => {
    beforeEach(() => {
      cy.visit("/");

      // Close the tutorial modal
      cy.get('[aria-label=Close]').click()
    });
  
    it("should successfully show a search result and center the map at the search location", () => {
        // Use a query that should not move or cease to exist for a long time for consistent test results (ex- Philly City Hall)
        // Load the search bar
        cy.get('[data-cy=button-search]').click()

        cy.get('input[placeholder="Search for Resources near..."]').type('30th Street Station, Market Street, Philadelphia, PA')
        cy.get('span:contains("30th Street Station, Market Street, Philadelphia, PA, USA")').click()
        // Not a perfect approach since it assumes the use of GMaps creating a link tied to the updated map center
        cy.get('a[href*="39\\.956837\\,\\-75\\.182233"]').should('exist')
    });
});
