// For each resource type, load a site's half modal and full modal

const waitForResourcesToLoad = () => {
  cy.wait('@getResourcesRequest', { timeout: 6000, responseTimeout: 6000 });
};

const selectResourceFromMenu = (
  type: 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM'
) => {
  cy.get(`[data-cy="button-${type}-data-selector-mobile"]`).click();
};

const selectMarker = () => {
  cy.get('[data-cy="marker-1"]').click({
    force: true,
    waitForAnimations: true,
    timeout: 4000
  });
  cy.location('search').should('contain', 'r=');
  cy.wait('@resourceByIdRequest', { timeout: 6000 });
};

const verifyResourceIsShown = () => {
  cy.location('search').should('contain', 'r=');
  cy.get('[data-cy="tap-organization-name"]', { timeout: 6000 }).should(
    'exist'
  );
};

describe('site info', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
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

    cy.get('[data-cy="button-resource-type-menu"]').click();
  });

  it('should successfully display a water site', () => {
    selectResourceFromMenu('WATER');
    selectMarker();
    verifyResourceIsShown();
  });

  it('should successfully display a food site', () => {
    selectResourceFromMenu('FOOD');
    waitForResourcesToLoad();
    selectMarker();
    verifyResourceIsShown();
  });

  it('should successfully display a foraging site', () => {
    selectResourceFromMenu('FORAGE');
    waitForResourcesToLoad();
    selectMarker();
    verifyResourceIsShown();
  });

  it('should successfully display a bathroom site', () => {
    selectResourceFromMenu('BATHROOM');
    waitForResourcesToLoad();
    selectMarker();
    verifyResourceIsShown();
  });
});
