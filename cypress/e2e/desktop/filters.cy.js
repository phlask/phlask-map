describe('filters', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for the page to load and filter button to be available
    cy.get('[data-cy=button-filter-type-menu]', { timeout: 10000 }).should('exist');
    // Load the filter menu
    cy.get('[data-cy=button-filter-type-menu]').click();
  });

  // Helper function to extract resource count from text
  const getResourceCount = (text) => {
    if (!text.includes('Resources: ')) {
      throw new Error(`Expected text to contain "Resources: " but got: ${text}`);
    }
    return parseInt(text.split('Resources: ')[1]);
  };

  it('should apply water filters and reduce resource count, then restore original count on Clear All', () => {
    // Switch to water resource type to ensure known starting state
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-WATER-data-selector]').click();
    
    // Re-open filter menu after resource switch and store initial count
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    // Store initial resource count
    cy.contains('Resources:').should('exist').then(($el) => {
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
      
      // Close the filter menu and verify filters are applied
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered results
      cy.contains('Resources:').should('exist').then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        cy.get('[data-cy=button-filter-type-menu]').click();
        cy.get('[data-cy="button-clear-all-desktop"]').click();
        cy.get('[data-cy=button-filter-type-menu]').click();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains('Resources:').should('exist').then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it('should apply food filters and reduce resource count, then restore original count on Clear All', () => {
    // Switch to food resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-FOOD-data-selector]').click();
    
    // Re-open filter menu after resource switch and store initial count
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    cy.contains('Resources:').should('exist').then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test food filter options - Food Type
      cy.get('[data-cy="filter-option-Perishable"]').should('exist').click();
      cy.get('[data-cy="filter-option-Non-perishable"]').should('exist').click();
      cy.get('[data-cy="filter-option-Prepared foods and meals"]').should('exist').click();
      
      // Test food filter options - Distribution type
      cy.get('[data-cy="filter-option-Eat on site"]').should('exist').click();
      cy.get('[data-cy="filter-option-Delivery"]').should('exist').click();
      
      // Test organization type filters (exclusive selection)
      cy.get('[data-cy="filter-option-Non-profit"]').should('exist').click();
      
      // Close filter menu and verify
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered results
      cy.contains('Resources:').should('exist').then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        cy.get('[data-cy=button-filter-type-menu]').click();
        cy.get('[data-cy="button-clear-all-desktop"]').click();
        cy.get('[data-cy=button-filter-type-menu]').click();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains('Resources:').should('exist').then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it('should apply foraging filters and reduce resource count, then restore original count on Clear All', () => {
    // Switch to foraging resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-FORAGE-data-selector]').click();
    
    // Re-open filter menu after resource switch and store initial count
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    cy.contains('Resources:').should('exist').then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test foraging filter options - Forage type
      cy.get('[data-cy="filter-option-Nut"]').should('exist').click();
      cy.get('[data-cy="filter-option-Fruit"]').should('exist').click();
      cy.get('[data-cy="filter-option-Leaves"]').should('exist').click();
      cy.get('[data-cy="filter-option-Bark"]').should('exist').click();
      cy.get('[data-cy="filter-option-Flowers"]').should('exist').click();
      
      // Test foraging filter options - Features
      cy.get('[data-cy="filter-option-Medicinal"]').should('exist').click();
      cy.get('[data-cy="filter-option-In season"]').should('exist').click();
      
      // Test Entry Type filters
      cy.get('[data-cy="filter-option-Open Access"]').should('exist').click();
      
      // Close filter menu and verify
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered results
      cy.contains('Resources:').should('exist').then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        cy.get('[data-cy=button-filter-type-menu]').click();
        cy.get('[data-cy="button-clear-all-desktop"]').click();
        cy.get('[data-cy=button-filter-type-menu]').click();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains('Resources:').should('exist').then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });

  it('should apply bathroom filters and reduce resource count, then restore original count on Clear All', () => {
    // Switch to bathroom resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('[data-cy=button-BATHROOM-data-selector]').click();
    
    // Re-open filter menu after resource switch and store initial count
    cy.get('[data-cy=button-filter-type-menu]').click();
    
    cy.contains('Resources:').should('exist').then(($el) => {
      const initialText = $el.text();
      const initialCount = getResourceCount(initialText);
      
      // Test bathroom filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').should('exist').click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should('exist').click();
      cy.get('[data-cy="filter-option-Changing table"]').should('exist').click();
      cy.get('[data-cy="filter-option-Single occupancy"]').should('exist').click();
      cy.get('[data-cy="filter-option-Family bathroom"]').should('exist').click();
      cy.get('[data-cy="filter-option-Has water fountain"]').should('exist').click();
      
      // Test Entry Type filter (exclusive selection)
      cy.get('[data-cy="filter-option-Open Access"]').should('exist').click();
      
      // Close filter menu and verify
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered results
      cy.contains('Resources:').should('exist').then(($filteredEl) => {
        const filteredText = $filteredEl.text();
        const filteredCount = getResourceCount(filteredText);
        
        // Should show fewer or equal resources when filters are applied
        expect(filteredCount).to.be.lte(initialCount);
        
        // Test clearing filters using Clear All button
        cy.get('[data-cy=button-filter-type-menu]').click();
        cy.get('[data-cy="button-clear-all-desktop"]').click();
        cy.get('[data-cy=button-filter-type-menu]').click();
        
        // Verify count returns to initial (should be >= filtered count)
        cy.contains('Resources:').should('exist').then(($clearedEl) => {
          const clearedText = $clearedEl.text();
          const clearedCount = getResourceCount(clearedText);
          expect(clearedCount).to.be.gte(filteredCount);
          expect(clearedCount).to.equal(initialCount);
        });
      });
    });
  });
});
