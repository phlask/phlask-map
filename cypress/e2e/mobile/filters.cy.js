describe("filters", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    
    // Wait for the page to load and filter button to be available
    cy.get("[data-cy=button-filter-mobile]", { timeout: 10000 }).should("exist");
  });

  // Helper function to extract resource count from text
  const getResourceCount = (text) => {
    if (!text.includes('Resources: ')) {
      throw new Error(`Expected text to contain "Resources: " but got: ${text}`);
    }
    return parseInt(text.split('Resources: ')[1]);
  };

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

  it("should apply water filters and reduce resource count, then restore original count on Clear All", () => {
    // Switch to water resource type to ensure known starting state
    switchResourceType('water');
    
    openFilterDrawer();
    
    // Store initial resource count before applying any filters
    cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test water filter options - Dispenser Type
      cy.get('[data-cy="filter-option-Drinking fountain"]').click();
      cy.get('[data-cy="filter-option-Bottle filler"]').click();
      
      // Test water filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').click();
      cy.get('[data-cy="filter-option-Filtered water"]').click();
      
      // Test water filter options - Entry Type (exclusive selection)
      cy.get('[data-cy="filter-option-Open Access"]').click();
      
      closeFilterDrawer();
      
      // Verify filtered results (should show fewer or equal resources)
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        openFilterDrawer();
        cy.get('[data-cy="button-clear-all-mobile"]').click();
        closeFilterDrawer();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it("should apply food filters and reduce resource count, then restore original count on Clear All", () => {
    // Switch to food resource type
    switchResourceType('food');
    
    openFilterDrawer();
    
    // Store initial resource count
    cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test food filter options - Food Type
      cy.get('[data-cy="filter-option-Perishable"]').should("exist").click();
      cy.get('[data-cy="filter-option-Non-perishable"]').should("exist").click();
      cy.get('[data-cy="filter-option-Prepared foods and meals"]').should("exist").click();
      
      // Test food filter options - Distribution type
      cy.get('[data-cy="filter-option-Eat on site"]').should("exist").click();
      cy.get('[data-cy="filter-option-Delivery"]').should("exist").click();
      
      // Test organization type filters (exclusive selection)
      cy.get('[data-cy="filter-option-Non-profit"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered results
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        openFilterDrawer();
        cy.get('[data-cy="button-clear-all-mobile"]').click();
        closeFilterDrawer();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it("should apply foraging filters and reduce resource count, then restore original count on Clear All", () => {
    // Switch to foraging resource type
    switchResourceType('forage');
    
    openFilterDrawer();
    
    // Store initial resource count
    cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test foraging filter options - Forage type
      cy.get('[data-cy="filter-option-Nut"]').should("exist").click();
      cy.get('[data-cy="filter-option-Fruit"]').should("exist").click();
      cy.get('[data-cy="filter-option-Leaves"]').should("exist").click();
      cy.get('[data-cy="filter-option-Bark"]').should("exist").click();
      cy.get('[data-cy="filter-option-Flowers"]').should("exist").click();
      
      // Test foraging filter options - Features
      cy.get('[data-cy="filter-option-Medicinal"]').should("exist").click();
      cy.get('[data-cy="filter-option-In season"]').should("exist").click();
      
      // Test Entry Type filters
      cy.get('[data-cy="filter-option-Open Access"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered results
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        openFilterDrawer();
        cy.get('[data-cy="button-clear-all-mobile"]').click();
        closeFilterDrawer();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it("should apply bathroom filters and reduce resource count, then restore original count on Clear All", () => {
    // Switch to bathroom resource type
    switchResourceType('bathroom');
    
    openFilterDrawer();
    
    // Store initial resource count
    cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test bathroom filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').should("exist").click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should("exist").click();
      cy.get('[data-cy="filter-option-Changing table"]').should("exist").click();
      cy.get('[data-cy="filter-option-Single occupancy"]').should("exist").click();
      cy.get('[data-cy="filter-option-Family bathroom"]').should("exist").click();
      cy.get('[data-cy="filter-option-Has water fountain"]').should("exist").click();
      
      // Test Entry Type filter (exclusive selection)
      cy.get('[data-cy="filter-option-Open Access"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered results
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        openFilterDrawer();
        cy.get('[data-cy="button-clear-all-mobile"]').click();
        closeFilterDrawer();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });
});