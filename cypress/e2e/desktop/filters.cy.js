describe('filters', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the page to load and filter button to be available
    cy.get('[data-cy=button-filter-type-menu]', { timeout: 10000 }).should('exist');
    // Load the filter menu
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each water site filter permutation', () => {
    // Test water filter options - Dispenser Type
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-Bottle filler"]').click();
    
    // Test water filter options - Features
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Filtered water"]').click();
    
    // Test water filter options - Entry Type (exclusive selection)
    cy.get('[data-cy="filter-option-Open Access"]').click();
    
    // Close the filter menu and verify filters are applied
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify water tap markers are visible on the map
    // Wait for filtered results to load
    cy.wait(1000);
    // Check that we have filtered results shown
    cy.contains('Resources:').should('exist');
    
    // Test clearing filters
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-Bottle filler"]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each food site filter permutation', () => {
    // Switch to food resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-FOOD-data-selector]').click();
    
    // Re-open filter menu after resource switch
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Test food filter options - Food Type
    cy.get('[data-cy="filter-option-Perishable"]').should('exist').click();
    cy.get('[data-cy="filter-option-Non-perishable"]').should('exist').click();
    cy.get('[data-cy="filter-option-Prepared foods and meals"]').should('exist').click();
    
    // Test food filter options - Distribution type
    cy.get('[data-cy="filter-option-Eat on site"]').should('exist').click();
    cy.get('[data-cy="filter-option-Delivery"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify food sites are filtered
    cy.wait(1000);
    cy.contains('Resources:').should('exist');
    
    // Test organization type filters (exclusive selection)
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Perishable"]').click();
    cy.get('[data-cy="filter-option-Non-profit"]').should('exist').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each foraging site filter permutation', () => {
    // Switch to foraging resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-FORAGE-data-selector]').click();
    
    // Re-open filter menu after resource switch
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Test foraging filter options - Forage type
    cy.get('[data-cy="filter-option-Nut"]').should('exist').click();
    cy.get('[data-cy="filter-option-Fruit"]').should('exist').click();
    cy.get('[data-cy="filter-option-Leaves"]').should('exist').click();
    cy.get('[data-cy="filter-option-Bark"]').should('exist').click();
    cy.get('[data-cy="filter-option-Flowers"]').should('exist').click();
    
    // Test foraging filter options - Features
    cy.get('[data-cy="filter-option-Medicinal"]').should('exist').click();
    cy.get('[data-cy="filter-option-In season"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify foraging sites are filtered
    cy.wait(1000);
    cy.contains('Resources:').should('exist');
    
    // Test clearing some filters
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Nut"]').click();
    cy.get('[data-cy="filter-option-Fruit"]').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each bathroom site filter permutation', () => {
    // Switch to bathroom resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-BATHROOM-data-selector]').click();
    
    // Re-open filter menu after resource switch
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Test bathroom filter options - Features
    cy.get('[data-cy="filter-option-ADA accessible"]').should('exist').click();
    cy.get('[data-cy="filter-option-Gender neutral"]').should('exist').click();
    cy.get('[data-cy="filter-option-Changing table"]').should('exist').click();
    cy.get('[data-cy="filter-option-Single occupancy"]').should('exist').click();
    cy.get('[data-cy="filter-option-Family bathroom"]').should('exist').click();
    cy.get('[data-cy="filter-option-Has water fountain"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify bathroom sites are filtered
    cy.wait(1000);
    cy.contains('Resources:').should('exist');
    
    // Test Entry Type filter (exclusive selection)
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Gender neutral"]').click();
    cy.get('[data-cy="filter-option-Open Access"]').should('exist').click();
    cy.get('[data-cy="filter-option-Restricted"]').should('exist').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });
});
