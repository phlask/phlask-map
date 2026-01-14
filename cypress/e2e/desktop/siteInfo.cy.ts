import { waitForResourceModal } from '../../utils/siteInfo.ts';

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe('site info', () => {
  beforeEach(() => {
    cy.mockGeoLocation();
    cy.visit('/');

    cy.intercept({
      method: 'GET',
      url: '/rest/v1/resources?select=id*'
    }).as('resourceRequest');

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    cy.get('[data-cy=button-WATER-data-selector-desktop]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a food site', () => {
    cy.get('[data-cy=button-FOOD-data-selector-desktop]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a foraging site', () => {
    cy.get('[data-cy=button-FORAGE-data-selector-desktop]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a bathroom site', () => {
    cy.get('[data-cy=button-BATHROOM-data-selector-desktop]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });
});
