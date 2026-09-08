import {
  EIFFEL_TOWER_MARKER,
  MOBILE_HEAD_SEARCH_BUTTON,
  SEARCH_BAR
} from 'utils/selectors.ts';

describe('search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show a global search result and center the map at that location', () => {
    cy.get(MOBILE_HEAD_SEARCH_BUTTON).click({ force: true });

    cy.get(SEARCH_BAR).type('Eiffel Tower');
    cy.get('li')
      .contains('Eiffel Tower, Avenue Gustave Eiffel, Paris, France')
      .click();

    cy.get(EIFFEL_TOWER_MARKER).should('exist');
  });
});
