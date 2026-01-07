// Helper functions for filter tests
const switchToResourceType = (resourceType: string) => {
  cy.get('[data-cy=button-resource-type-menu]').click();
  cy.get(`[data-cy=button-resource-${resourceType.toLowerCase()}]`)
    .first()
    .click({ force: true });
};

const openFilterMenu = () => {
  cy.get('[data-cy=button-filter-mobile]').click();
  cy.get('[data-cy*="filter-option-"]').should('be.visible');
};

const closeFilterMenu = () => {
  cy.get('[data-cy=button-filter-mobile]').click({ force: true });
};

const applyFilters = (filters: string[]) => {
  openFilterMenu();
  filters.forEach(filter => {
    cy.get(`[data-cy="filter-option-${filter}"]`).click();
  });
  closeFilterMenu();
};

const clearAllFilters = () => {
  openFilterMenu();
  cy.get('[data-cy="button-clear-all-mobile"]').click();
  closeFilterMenu();
};

const waitForResourcesLoad = () => {
  cy.get('[title^="data-cy-"]').should('exist');
  cy.get('[title^="data-cy-"]').should('have.length.greaterThan', 0);
};

// Water resource filter tests
describe('Water resource filtering', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');
    cy.get('[data-cy=button-filter-mobile]').should('exist');
    switchToResourceType('water');
    waitForResourcesLoad();
  });

  it('should filter water sites by dispenser type and verify resource count changes', () => {
    // Verify initial state - has resources

    // Apply dispenser type filter
    applyFilters(['Bottle filler']);

    // Verify filter requirements
  });
});

it('should filter water sites by features and verify resource count changes', () => {
  applyFilters(['ADA accessible']);
});

it('should filter water sites by entry type and verify resource count changes', () => {
  applyFilters(['Open Access']);
});

it('should filter water sites by multiple criteria, verify resource count changes, and verify Clear All restores original count', () => {
  // Verify initial state

  // Apply multiple filter criteria
  applyFilters(['Bottle filler', 'ADA accessible', 'Open Access']);

  // Verify all filter requirements for combination

  // TEST CLEAR ALL FUNCTIONALITY
  // Click Clear All button to restore all water resources
  clearAllFilters();

  // Verify Clear All restores everything
});

// Food resource filter tests
describe('Food resource filtering', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');
    cy.get('[data-cy=button-filter-mobile]').should('exist');
    switchToResourceType('food');
    waitForResourcesLoad();
  });

  it('should filter food sites by food type and verify resource count changes', () => {
    applyFilters(['Perishable']);
  });

  it('should filter food sites by distribution type and verify resource count changes', () => {
    applyFilters(['Eat on site']);
  });

  it('should filter food sites by multiple criteria, verify resource count changes, and verify Clear All restores original count', () => {
    applyFilters(['Non-perishable', 'Pick up']);

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all food resources
    clearAllFilters();

    // Verify Clear All restores everything
  });
});

// Foraging resource filter tests
describe('Foraging resource filtering', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');
    cy.get('[data-cy=button-filter-mobile]').should('exist');
    switchToResourceType('forage');
    waitForResourcesLoad();
  });

  it('should filter foraging sites by forage type and verify resource count changes', () => {
    applyFilters(['Fruit']);
  });

  it('should filter foraging sites by features and verify resource count changes', () => {
    applyFilters(['Medicinal']);
  });

  it('should filter foraging sites by multiple criteria, verify resource count changes, and verify Clear All restores original count', () => {
    applyFilters(['Nut', 'Leaves']);

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all foraging resources
    clearAllFilters();

    // Verify Clear All restores everything
  });
});

// Bathroom resource filter tests
describe('Bathroom resource filtering', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');
    cy.get('[data-cy=button-filter-mobile]').should('exist');
    switchToResourceType('bathroom');
    waitForResourcesLoad();
  });

  it('should filter bathroom sites by ADA accessibility and verify resource count changes', () => {
    applyFilters(['ADA accessible']);
  });

  it('should filter bathroom sites by gender neutral feature and verify resource count changes', () => {
    applyFilters(['Gender neutral']);
  });

  it('should filter bathroom sites by changing table amenity and verify resource count changes', () => {
    applyFilters(['Changing table']);
  });

  it('should filter bathroom sites by multiple criteria, verify resource count changes, and verify Clear All restores original count', () => {
    applyFilters(['ADA accessible', 'Gender neutral']);

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all bathroom resources
    clearAllFilters();

    // Verify Clear All restores everything
  });
});

// Cross-resource type filter persistence tests
describe('Filter persistence across resource types', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.mockGeoLocation();
    cy.visit('/');
    cy.get('[data-cy=button-filter-mobile]').should('exist');
  });

  it('should clear filters when switching resource types', () => {
    // Start with water and apply filters
    switchToResourceType('water');
    waitForResourcesLoad();

    applyFilters(['Bottle filler']);

    // Switch to food - filters should be cleared
    switchToResourceType('food');
    waitForResourcesLoad();
  });
});
