import { getTestId, LOGAN_SQUARE_MARKER, SEARCH_BAR } from 'utils/selectors.ts';

describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully show a search result and center the map at the search location', () => {
    cy.get(getTestId('button-search-type-menu')).click();

    cy.get(SEARCH_BAR).type(
      'Logan Square, North 19th Street, Philadelphia, PA, USA'
    );
    cy.get('li')
      .contains('Logan Square, North 19th Street, Philadelphia, PA, USA')
      .click();

    cy.get(LOGAN_SQUARE_MARKER).should('exist');
  });
});
