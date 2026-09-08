import type { ResourceType, Viewport } from 'types/types.ts';
import {
  FILTER_CLEAR_ALL_BUTTON,
  FILTER_MENU_BUTTON,
  FILTER_SUBMIT_BUTTON,
  getInputByValue,
  getResourceMarkerByType,
  RESOURCE_MENU_BUTTON
} from 'utils/selectors.ts';
import { selectResourceFromMenu } from './shared.ts';

export const switchToResourceType = (resourceType: ResourceType) => {
  cy.location().then(locationBeforeSelectResource => {
    cy.get(RESOURCE_MENU_BUTTON).click();
    selectResourceFromMenu(resourceType);
    const isRequestCached =
      (resourceType === 'WATER' && !locationBeforeSelectResource.search) ||
      locationBeforeSelectResource.search.includes(
        `resource-type=${resourceType}`
      );
    if (isRequestCached) {
      return;
    }

    cy.wait('@resourceRequest', { timeout: 6000 });
  });
};

export const openFilterMenu = () => {
  cy.get(FILTER_MENU_BUTTON).click();
};

export const submit = () => {
  cy.get(FILTER_SUBMIT_BUTTON).click();
};

export const applyFilters = (filters: string[]) => {
  openFilterMenu();
  filters.forEach(filter => {
    cy.get(getInputByValue(filter)).parent().click();
  });
  submit();
};

export const includeQueryParams = (
  params: { key: string; value: string }[] = []
) => {
  params.forEach(param => {
    cy.location('search').should('include', `${param.key}=${param.value}`);
  });
};

export const isOnlyFilteringByResource = (resource: ResourceType) => {
  cy.location('search').should('equal', `?resource-type=${resource}`);
};

export const filterByEntryType = () => {
  applyFilters(['OPEN']);
  includeQueryParams([{ key: 'entry_type', value: 'OPEN' }]);
  requestIncludeQueryParams([{ key: 'entry_type', value: 'OPEN' }]);
};

export const requestIncludeQueryParams = (
  params: { key: string; value: string | string[] }[]
) => {
  cy.wait('@resourceRequest', { timeout: 10000 }).then(
    ({ request, response }) => {
      params.forEach(param => {
        assert.equal(request.query[param.key], `eq.${param.value}`);
      });
      assert.isArray(response?.body);
    }
  );
};

export const clearAllFilters = () => {
  openFilterMenu();
  cy.get(FILTER_CLEAR_ALL_BUTTON).click();
  submit();
};

export const waitForResourcesLoad = (type: ResourceType) => {
  cy.get(getResourceMarkerByType(type)).should('exist');
};

export const prepareResource = (
  type: ResourceType,
  viewport: Viewport = 'desktop'
) => {
  if (viewport === 'mobile') {
    cy.viewport('iphone-x');
  }
  cy.intercept({
    method: 'GET',
    url: '/rest/v1/resources?*'
  }).as('resourceRequest');

  cy.visit('/');
  cy.wait('@resourceRequest', { timeout: 6000 });

  switchToResourceType(type);

  waitForResourcesLoad(type);
};
