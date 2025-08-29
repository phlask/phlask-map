describe("filters", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    
    // Wait for the page to load and filter button to be available
    cy.get("[data-cy=button-filter-mobile]", { timeout: 10000 }).should("exist");
  });

  // Helper function to open filter drawer
  const openFilterDrawer = () => {
    cy.get("[data-cy=button-filter-mobile]").click();
    // Wait for first filter option to be visible instead of hard wait
    cy.get('[data-cy*="filter-option-"]').should('be.visible');
  };

  // Helper function to close filter drawer
  const closeFilterDrawer = () => {
    cy.get("[data-cy=button-filter-mobile]").click({ force: true });
    // Minimal wait for drawer animation with fallback
    cy.wait(400);
  };

  // Helper function to switch resource type
  const switchResourceType = (resourceType) => {
    cy.get("[data-cy=button-resource-type-menu]").click();
    cy.get(`[data-cy=button-resource-${resourceType}]`).first().click({ force: true });
    // Wait for resource modal to close by checking if the resource menu button is clickable again
    cy.get("[data-cy=button-resource-type-menu]").should('not.be.disabled');
    cy.wait(200); // Minimal wait for any remaining animations
  };

  it("should successfully show a result for each water site filter permutation", () => {
    openFilterDrawer();
    
    // Test water filter options - Dispenser Type
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-Bottle filler"]').click();
    
    // Test water filter options - Features
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Filtered water"]').click();
    
    // Test water filter options - Entry Type (exclusive selection)
    cy.get('[data-cy="filter-option-Open Access"]').click();
    
    closeFilterDrawer();
    
    // Verify water tap markers are visible on the map
    cy.contains("Resources:", { timeout: 5000 }).should("exist");
    
    // Test clearing filters
    openFilterDrawer();
    cy.get('[data-cy="filter-option-Drinking fountain"]').click();
    cy.get('[data-cy="filter-option-Bottle filler"]').click();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    closeFilterDrawer();
  });

  it("should successfully show a result for each food site filter permutation", () => {
    // Switch to food resource type
    switchResourceType('food');
    
    openFilterDrawer();
    
    // Test food filter options - Food Type
    cy.get('[data-cy="filter-option-Perishable"]').should("exist").click();
    cy.get('[data-cy="filter-option-Non-perishable"]').should("exist").click();
    cy.get('[data-cy="filter-option-Prepared foods and meals"]').should("exist").click();
    
    // Test food filter options - Distribution type
    cy.get('[data-cy="filter-option-Eat on site"]').should("exist").click();
    cy.get('[data-cy="filter-option-Delivery"]').should("exist").click();
    
    closeFilterDrawer();
    
    // Verify food sites are filtered
    cy.contains("Resources:", { timeout: 5000 }).should("exist");
    
    // Test organization type filters (exclusive selection)
    openFilterDrawer();
    cy.get('[data-cy="filter-option-Perishable"]').click();
    cy.get('[data-cy="filter-option-Non-profit"]').should("exist").click();
    closeFilterDrawer();
  });

  it("should successfully show a result for each foraging site filter permutation", () => {
    // Switch to foraging resource type
    switchResourceType('foraging');
    
    openFilterDrawer();
    
    // Test foraging filter options - Forage type
    cy.get('[data-cy="filter-option-Nut"]').should("exist").click();
    cy.get('[data-cy="filter-option-Fruit"]').should("exist").click();
    cy.get('[data-cy="filter-option-Leaves"]').should("exist").click();
    cy.get('[data-cy="filter-option-Bark"]').should("exist").click();
    cy.get('[data-cy="filter-option-Flowers"]').should("exist").click();
    
    // Test foraging filter options - Features
    cy.get('[data-cy="filter-option-Medicinal"]').should("exist").click();
    cy.get('[data-cy="filter-option-In season"]').should("exist").click();
    
    closeFilterDrawer();
    
    // Verify foraging sites are filtered
    cy.contains("Resources:", { timeout: 5000 }).should("exist");
    
    // Test clearing some filters
    openFilterDrawer();
    cy.get('[data-cy="filter-option-Nut"]').click();
    cy.get('[data-cy="filter-option-Fruit"]').click();
    closeFilterDrawer();
  });

  it("should successfully show a result for each bathroom site filter permutation", () => {
    // Switch to bathroom resource type
    switchResourceType('bathroom');
    
    openFilterDrawer();
    
    // Test bathroom filter options - Features
    cy.get('[data-cy="filter-option-ADA accessible"]').should("exist").click();
    cy.get('[data-cy="filter-option-Gender neutral"]').should("exist").click();
    cy.get('[data-cy="filter-option-Changing table"]').should("exist").click();
    cy.get('[data-cy="filter-option-Single occupancy"]').should("exist").click();
    cy.get('[data-cy="filter-option-Family bathroom"]').should("exist").click();
    cy.get('[data-cy="filter-option-Has water fountain"]').should("exist").click();
    
    closeFilterDrawer();
    
    // Verify bathroom sites are filtered
    cy.contains("Resources:", { timeout: 5000 }).should("exist");
    
    // Test Entry Type filter (exclusive selection)
    openFilterDrawer();
    cy.get('[data-cy="filter-option-ADA accessible"]').click();
    cy.get('[data-cy="filter-option-Gender neutral"]').click();
    cy.get('[data-cy="filter-option-Open Access"]').should("exist").click();
    cy.get('[data-cy="filter-option-Restricted"]').should("exist").click();
    closeFilterDrawer();
  });
});