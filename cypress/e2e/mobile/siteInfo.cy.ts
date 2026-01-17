import { RESOURCE_MENU_BUTTON } from 'utils/selectors.ts';
import { selectResourceFromMenu } from 'utils/shared.ts';
import {
  waitForResourcesToLoad,
  selectMarker,
  verifyResourceIsShown
} from 'utils/siteInfo.ts';

describe('site info', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');

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

    cy.get(RESOURCE_MENU_BUTTON).click();
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
