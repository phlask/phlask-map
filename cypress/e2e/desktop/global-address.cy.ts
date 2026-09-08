import { getTestId, SEARCH_BAR } from 'utils/selectors.ts';

const EIFFEL_TOWER_MARKER = 'gmp-advanced-marker[position^="48.85837"]';

describe('global address search', () => {
  it('shows an international search result and centers the map on it', () => {
    cy.visit('/');
    cy.get(getTestId('button-search-type-menu')).click();

    cy.get(SEARCH_BAR).type('Eiffel Tower');
    cy.contains(
      'li',
      'Eiffel Tower, Avenue Gustave Eiffel, Paris, France'
    ).click();

    cy.get(EIFFEL_TOWER_MARKER).should('exist');
  });
});
