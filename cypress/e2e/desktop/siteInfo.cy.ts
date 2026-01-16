type ResourceType = 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM';

const waitForResourcesToLoad = () => {
  cy.wait('@getResourcesRequest', { timeout: 6000, responseTimeout: 6000 });
};

const selectResourceFromMenu = (
  type: 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM'
) => {
  cy.get(`[data-cy="button-${type}-data-selector-desktop"]`).click();
};

const selectMarker = (type: ResourceType) => {
  cy.get(`[data-cy=marker-${type}-1]`).should('exist');
  cy.get(`[data-cy=marker-${type}-1]`, { timeout: 6000 }).click({
    force: true,
    timeout: 6000
  });
  cy.location('search')
    .then(search => {
      if (!search.includes('r=')) {
        cy.get(`[data-cy=marker-${type}-1]`).click({
          force: true,
          timeout: 6000
        });
      }
    })
    .should('include', 'r=');
  cy.wait('@resourceByIdRequest', { timeout: 6000 });
};

const verifyResourceIsShown = () => {
  cy.location('search').should('include', 'r=');
  cy.get('[data-cy="tap-organization-name"]', { timeout: 6000 }).should(
    'exist'
  );
};

describe('site info', () => {
  beforeEach(() => {
    cy.mockGeoLocation();

    cy.intercept({
      method: 'GET',
      url: 'https://wantycfbnzzocsbthqzs.supabase.co/rest/v1/resources?select=id%2Cname%2Clatitude%2Clongitude%2Cresource_type%2Centry_type&resource_type=eq.*'
    }).as('getResourcesRequest');

    cy.intercept({
      method: 'GET',
      hostname: 'wantycfbnzzocsbthqzs.supabase.co',
      pathname: '/rest/v1/resources',
      query: {
        select: '*',
        id: 'eq.*'
      }
    }).as('resourceByIdRequest');

    cy.visit('/');
    waitForResourcesToLoad();

    cy.get('[data-cy=button-resource-type-menu]').click();
  });

  it('should successfully display a water site', () => {
    selectResourceFromMenu('WATER');
    selectMarker('WATER');
    verifyResourceIsShown();
  });

  it('should successfully display a food site', () => {
    selectResourceFromMenu('FOOD');
    waitForResourcesToLoad();
    selectMarker('FOOD');
    verifyResourceIsShown();
  });

  it('should successfully display a foraging site', () => {
    selectResourceFromMenu('FORAGE');
    waitForResourcesToLoad();
    selectMarker('FORAGE');
    verifyResourceIsShown();
  });

  it('should successfully display a bathroom site', () => {
    selectResourceFromMenu('BATHROOM');
    waitForResourcesToLoad();
    selectMarker('BATHROOM');
    verifyResourceIsShown();
  });
});
