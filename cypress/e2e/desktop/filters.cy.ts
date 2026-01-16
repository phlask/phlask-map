import {
  prepareResource,
  applyFilters,
  includeQueryParams,
  filterByEntryType,
  clearAllFilters,
  isOnlyFilteringByResource,
  switchToResourceType,
  waitForResourcesLoad,
  requestIncludeQueryParams
} from 'utils/filters.ts';

// Water resource filter tests
describe('Water resource filtering', () => {
  beforeEach(() => {
    prepareResource('WATER');
  });

  it('should filter water sites by dispenser type and verify query params and network request', () => {
    // Apply dispenser type filter
    applyFilters(['BOTTLE_FILLER']);
    includeQueryParams([
      { key: 'water.dispenser_type', value: 'BOTTLE_FILLER' }
    ]);
    requestIncludeQueryParams([
      { key: 'water->>dispenser_type', value: '["BOTTLE_FILLER"]' }
    ]);
  });

  it('should filter water sites by features and verify query params and network request', () => {
    applyFilters(['WHEELCHAIR_ACCESSIBLE']);
    includeQueryParams([{ key: 'water.tags', value: 'WHEELCHAIR_ACCESSIBLE' }]);
    requestIncludeQueryParams([
      { key: 'water->>tags', value: '["WHEELCHAIR_ACCESSIBLE"]' }
    ]);
  });

  it('should filter water sites by entry type and verify query params and network request', () => {
    filterByEntryType();
  });

  it('should filter water sites by multiple criteria, verify query params and network request, and verify Clear All restores query params', () => {
    // Apply multiple filter criteria
    applyFilters(['BOTTLE_FILLER', 'WHEELCHAIR_ACCESSIBLE', 'OPEN']);
    includeQueryParams([
      { key: 'water.dispenser_type', value: 'BOTTLE_FILLER' },
      { key: 'water.tags', value: 'WHEELCHAIR_ACCESSIBLE' },
      { key: 'entry_type', value: 'OPEN' }
    ]);
    requestIncludeQueryParams([
      { key: 'water->>dispenser_type', value: '["BOTTLE_FILLER"]' },
      { key: 'water->>tags', value: '["WHEELCHAIR_ACCESSIBLE"]' },
      { key: 'entry_type', value: 'OPEN' }
    ]);

    // TEST CLEAR ALL FUNCTIONALITY
    clearAllFilters();
    isOnlyFilteringByResource('WATER');
  });
});

// Food resource filter tests
describe('Food resource filtering', () => {
  beforeEach(() => {
    prepareResource('FOOD');
  });

  it('should filter food sites by food type and verify query params and network request', () => {
    applyFilters(['PERISHABLE']);
    includeQueryParams([{ key: 'food.food_type', value: 'PERISHABLE' }]);
    requestIncludeQueryParams([
      { key: 'food->>food_type', value: '["PERISHABLE"]' }
    ]);
  });

  it('should filter food sites by distribution type and verify query params and network request', () => {
    applyFilters(['EAT_ON_SITE']);
    includeQueryParams([
      { key: 'food.distribution_type', value: 'EAT_ON_SITE' }
    ]);
    requestIncludeQueryParams([
      { key: 'food->>distribution_type', value: '["EAT_ON_SITE"]' }
    ]);
  });

  it('should filter food sites by organization type and verify query params and network request', () => {
    applyFilters(['GOVERNMENT']);
    includeQueryParams([
      { key: 'food.organization_type', value: 'GOVERNMENT' }
    ]);
    requestIncludeQueryParams([
      { key: 'food->>organization_type', value: 'GOVERNMENT' }
    ]);
  });

  it('should filter food sites by multiple criteria, verify query params and network request, and verify Clear All restores query params', () => {
    applyFilters(['PERISHABLE', 'EAT_ON_SITE', 'GOVERNMENT']);

    includeQueryParams([
      { key: 'food.food_type', value: 'PERISHABLE' },
      { key: 'food.distribution_type', value: 'EAT_ON_SITE' },
      { key: 'food.organization_type', value: 'GOVERNMENT' }
    ]);
    requestIncludeQueryParams([
      { key: 'food->>food_type', value: '["PERISHABLE"]' },
      { key: 'food->>distribution_type', value: '["EAT_ON_SITE"]' },
      { key: 'food->>organization_type', value: 'GOVERNMENT' }
    ]);

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all food resources
    clearAllFilters();
    isOnlyFilteringByResource('FOOD');
  });
});

// Foraging resource filter tests
describe('Foraging resource filtering', () => {
  beforeEach(() => {
    prepareResource('FORAGE');
  });

  it('should filter foraging sites by forage type and verify resource count changes', () => {
    applyFilters(['FRUIT']);
    includeQueryParams([{ key: 'forage.forage_type', value: 'FRUIT' }]);
    requestIncludeQueryParams([
      { key: 'forage->>forage_type', value: '["FRUIT"]' }
    ]);
  });

  it('should filter foraging sites by features and verify resource count changes', () => {
    applyFilters(['MEDICINAL']);
    includeQueryParams([{ key: 'forage.tags', value: 'MEDICINAL' }]);
    requestIncludeQueryParams([
      { key: 'forage->>tags', value: '["MEDICINAL"]' }
    ]);
  });

  it('should filter foraging sites by entry type and verify query params and network request', () => {
    filterByEntryType();
  });

  it('should filter foraging sites by multiple criteria, verify query params and network request, and verify Clear All restores query params', () => {
    applyFilters(['NUT', 'MEDICINAL', 'OPEN']);

    includeQueryParams([
      { key: 'forage.forage_type', value: 'NUT' },
      { key: 'forage.tags', value: 'MEDICINAL' },
      { key: 'entry_type', value: 'OPEN' }
    ]);
    requestIncludeQueryParams([
      { key: 'forage->>forage_type', value: '["NUT"]' },
      { key: 'forage->>tags', value: '["MEDICINAL"]' },
      { key: 'entry_type', value: 'OPEN' }
    ]);

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all foraging resources
    clearAllFilters();
    isOnlyFilteringByResource('FORAGE');
  });
});

// Bathroom resource filter tests
describe('Bathroom resource filtering', () => {
  beforeEach(() => {
    prepareResource('BATHROOM');
  });

  it('should filter bathroom sites by features and verify query params and network request', () => {
    applyFilters(['WHEELCHAIR_ACCESSIBLE']);
    includeQueryParams([
      { key: 'bathroom.tags', value: 'WHEELCHAIR_ACCESSIBLE' }
    ]);
    requestIncludeQueryParams([
      { key: 'bathroom->>tags', value: '["WHEELCHAIR_ACCESSIBLE"]' }
    ]);
  });

  it('should filter bathroom sites by entry type and verify query params and network request', () => {
    filterByEntryType();
  });

  it('should filter bathroom sites by multiple criteria, verify query params and network request, and verify Clear All restores query params', () => {
    applyFilters(['WHEELCHAIR_ACCESSIBLE', 'GENDER_NEUTRAL', 'OPEN']);
    includeQueryParams([
      { key: 'bathroom.tags', value: 'WHEELCHAIR_ACCESSIBLE' },
      { key: 'bathroom.tags', value: 'GENDER_NEUTRAL' },
      { key: 'entry_type', value: 'OPEN' }
    ]);
    requestIncludeQueryParams([
      {
        key: 'bathroom->>tags',
        value: '["WHEELCHAIR_ACCESSIBLE","GENDER_NEUTRAL"]'
      },
      {
        key: 'entry_type',
        value: 'OPEN'
      }
    ]);
    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all bathroom resources
    clearAllFilters();
    isOnlyFilteringByResource('BATHROOM');
  });
});

// Cross-resource type filter persistence tests
describe('Filter persistence across resource types', () => {
  beforeEach(() => {
    prepareResource('WATER');
  });

  it('should clear filters when switching resource types', () => {
    // Start with water and apply filters
    applyFilters(['BOTTLE_FILLER']);

    // Switch to food - filters should be cleared
    switchToResourceType('FOOD');
    isOnlyFilteringByResource('FOOD');
    waitForResourcesLoad('FOOD');
  });
});
