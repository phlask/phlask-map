import {
  clickOnFirstMarker,
  waitForMarker,
  waitForResourceModal
} from '../../utils/siteInfo.ts';

// For each resource type, test each site detail permutation and confirm only the expected number of taps appear.
describe('site info', () => {
  beforeEach(() => {
    cy.mockGeoLocation();

    cy.intercept({
      method: 'GET',
      url: '/rest/v1/resources?select=id*'
    }).as('resourcesRequest');

    cy.intercept({
      method: 'GET',
      url: '/rest/v1/resources?select=*'
    }).as('resourceRequest');

    cy.visit('/');
    cy.wait('@resourcesRequest', { timeout: 6000 });

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    cy.get('[data-cy=button-WATER-data-selector-desktop]').click();

    clickOnFirstMarker();
    waitForResourceModal();
  });

  it('should successfully display a food site', () => {
    cy.get('[data-cy=button-FOOD-data-selector-desktop]').click();

    waitForMarker();
    waitForResourceModal();
  });

  it('should successfully display a foraging site', () => {
    cy.get('[data-cy=button-FORAGE-data-selector-desktop]').click();

    waitForMarker();
    waitForResourceModal();
  });

  it('should successfully display a bathroom site', () => {
    cy.get('[data-cy=button-BATHROOM-data-selector-desktop]').click();

    waitForMarker();
    waitForResourceModal();
  });
});
