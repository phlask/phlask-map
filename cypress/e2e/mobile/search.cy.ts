describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully show a search result and center the map at the search location', () => {
    cy.get('[data-cy=mobile-head-search-button]').click({ force: true });

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
