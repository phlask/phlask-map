import {
  LOGAN_SQUARE_MARKER,
  MOBILE_HEAD_SEARCH_BUTTON,
  SEARCH_BAR
} from 'utils/selectors.ts';

describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully show a search result and center the map at the search location', () => {
    cy.get(MOBILE_HEAD_SEARCH_BUTTON).click({ force: true });

    cy.get(SEARCH_BAR).type(
      'Logan Square, North 19th Street, Philadelphia, PA, USA'
    );
    cy.get('li')
      .contains('Logan Square, North 19th Street, Philadelphia, PA, USA')
      .click();

    cy.get(LOGAN_SQUARE_MARKER).should('exist');
  });
});
