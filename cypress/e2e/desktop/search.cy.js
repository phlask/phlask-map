describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully show a search result and center the map at the search location', () => {
    // Use a query that should not move or cease to exist for a long time for consistent test results (ex- Philly City Hall)
    // Load the search bar
    cy.get('[data-cy=button-search]').click();

    cy.get('input[placeholder="Search for Resources near..."]').type(
      'Logan Square, North 19th Street, Philadelphia, PA, USA'
    );
    cy.get(
      'span:contains("Logan Square, North 19th Street, Philadelphia, PA, USA")'
    ).click();
    // Not a perfect approach since it assumes the use of GMaps creating a link tied to the updated map center
    cy.get('a[href*="39\\.958033\\,\\-75\\.17096"]').should('exist');
  });
});
