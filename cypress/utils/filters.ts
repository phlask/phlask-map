type ResourceType = 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM';
// Helper functions for filter tests
export const switchToResourceType = (
  resourceType: ResourceType,
  viewport: 'mobile' | 'desktop' = 'desktop'
) => {
  cy.get('[data-cy=button-resource-type-menu]').click();
  cy.get(`[data-cy=button-${resourceType}-data-selector-${viewport}]`).click();
};

export const openFilterMenu = () => {
  cy.get('[data-cy=button-filter-type-menu]').click();
};

export const submit = () => {
  cy.get('[data-cy=filter-submit-button]').click();
};

export const applyFilters = (filters: string[]) => {
  openFilterMenu();
  filters.forEach(filter => {
    cy.get(`input[value="${filter}"]`).parent().click();
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
  cy.wait('@resourceRequest').then(({ request, response }) => {
    params.forEach(param => {
      assert.equal(request.query[param.key], `eq.${param.value}`);
    });
    assert.isArray(response?.body);
  });
};

export const clearAllFilters = () => {
  openFilterMenu();
  cy.get('[data-cy="filter-clear-all"]').click();
  submit();
};

export const waitForResourcesLoad = () => {
  cy.get('[data-cy=marker-1]').should('exist');
};

export const prepareResource = (
  type: ResourceType,
  viewport: 'mobile' | 'desktop' = 'desktop'
) => {
  if (viewport === 'mobile') {
    cy.viewport('iphone-x');
  }
  cy.intercept({
    method: 'GET',
    url: '/rest/v1/resources?select=id*'
  }).as('resourceRequest');

  cy.visit('/');
  switchToResourceType(type, viewport);

  waitForResourcesLoad();
};
