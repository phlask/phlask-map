describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully show a search result and center the map at the search location', () => {
    // Use a query that should not move or cease to exist for a long time for consistent test results (ex- Philly City Hall)
    // Load the search bar
    cy.get('[data-cy=button-search-type-menu]').click();

    cy.get('input[placeholder="Search for Resources near..."]').type(
      'Logan Square, North 19th Street, Philadelphia, PA, USA'
    );
    cy.get('li')
      .contains('Logan Square, North 19th Street, Philadelphia, PA, USA')
      .click();

    cy.get('gmp-advanced-marker[position="39.9580333,-75.1709604"]').should(
      'exist'
    );
  });
});
