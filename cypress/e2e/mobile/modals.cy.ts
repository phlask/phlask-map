// For each resource type, load a site's half modal and full modal

import { waitForResourceModal } from '../../utils/siteInfo.ts';

// for each site modal, confirm the required modal mode buttons work and that the relevant information is displayed
describe('modals', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');

    cy.intercept({
      method: 'GET',
      url: '/rest/v1/resources?select=id*'
    }).as('resourcesRequest');

    cy.intercept({
      method: 'GET',
      url: '/rest/v1/resources?select=*'
    }).as('resourceRequest');

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    cy.get('[data-cy=button-WATER-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a food site', () => {
    cy.get('[data-cy=button-FOOD-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a foraging site', () => {
    cy.get('[data-cy=button-FORAGE-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });

  it('should successfully display a bathroom site', () => {
    cy.get('[data-cy=button-BATHROOM-data-selector-mobile]').click();

    cy.get('[data-cy=marker-1]').click({ force: true });
    waitForResourceModal();
  });
});
