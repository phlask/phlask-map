describe('filters', () => {
  beforeEach(() => {
    cy.visit('/');
    // Load the filter menu
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each water site filter permutation', () => {
    // Test water filter options
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Open Access"]').click();
    
    // Close the filter menu and verify filters are applied
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify water tap markers are visible on the map
    cy.get('[title*="data-cy"]').should('exist');
    
    // Test clearing filters
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Open Access"]').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each food site filter permutation', () => {
    // Switch to food resource type
    cy.get('[data-cy=button-resource-food]').click();
    
    // Test food filter options
    cy.get('[data-cy="filter-option-Perishable goods"]').should('exist').click();
    cy.get('[data-cy="filter-option-Non-perishable goods"]').should('exist').click();
    cy.get('[data-cy="filter-option-Prepared foods and meals"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify food site markers are visible
    cy.get('[title*="data-cy"]').should('exist');
    
    // Test organization type filters
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Perishable goods"]').click();
    cy.get('[data-cy="filter-option-School"]').should('exist').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each foraging site filter permutation', () => {
    // Switch to foraging resource type
    cy.get('[data-cy=button-resource-foraging]').click();
    
    // Test foraging filter options
    cy.get('[data-cy="filter-option-Nuts"]').should('exist').click();
    cy.get('[data-cy="filter-option-Fruit"]').should('exist').click();
    cy.get('[data-cy="filter-option-Vegetables"]').should('exist').click();
    cy.get('[data-cy="filter-option-Mushrooms"]').should('exist').click();
    cy.get('[data-cy="filter-option-Herbs"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify foraging site markers are visible
    cy.get('[title*="data-cy"]').should('exist');
    
    // Test clearing some filters
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-Nuts"]').click();
    cy.get('[data-cy="filter-option-Fruit"]').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  it('should successfully show a result for each bathroom site filter permutation', () => {
    // Switch to bathroom resource type
    cy.get('[data-cy=button-resource-bathroom]').click();
    
    // Test bathroom filter options
    cy.get('[data-cy="filter-option-ADA accessible"]').should('exist').click();
    cy.get('[data-cy="filter-option-Changing table"]').should('exist').click();
    cy.get('[data-cy="filter-option-Gender neutral"]').should('exist').click();
    cy.get('[data-cy="filter-option-Single occupancy"]').should('exist').click();
    
    // Close filter menu and verify
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Verify bathroom site markers are visible
    cy.get('[title*="data-cy"]').should('exist');
    
    // Test with public filter only
    cy.get('[data-cy=button-filter-type-menu]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Changing table"]').click();
    cy.get('[data-cy="filter-option-Gender neutral"]').click();
    cy.get('[data-cy="filter-option-Public"]').should('exist').click();
    cy.get('[data-cy=button-filter-type-menu]').click();
  });
});
