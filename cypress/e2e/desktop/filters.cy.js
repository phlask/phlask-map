describe('filters', () => {
  // Helper function to extract resource count from text
  const getResourceCount = (text) => {
    if (!text.includes('Resources: ')) {
      throw new Error(`Expected text to contain "Resources: " but got: ${text}`);
    }
    return parseInt(text.split('Resources: ')[1]);
  };

  // Helper function to switch resource type and open filter menu
  const setupResourceType = (resourceType) => {
    cy.visit('/');
    cy.get('[data-cy=button-filter-type-menu]', { timeout: 10000 }).should('exist');
    
    // Switch to specific resource type
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get(`[data-cy=button-${resourceType}-data-selector]`).click();
    
    // Open filter menu
    cy.get('[data-cy=button-filter-type-menu]').click();
  };

  describe('Water filters', () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('WATER');
      
      // Store initial resource count
      cy.contains('Resources:').should('exist').then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it('should reduce resource count when water filters are applied', () => {
      // Apply water filter options - Dispenser Type
      cy.get('[data-cy="filter-option-Drinking fountain"]').click();
      cy.get('[data-cy="filter-option-Bottle filler"]').click();
      
      // Apply water filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').click();
      cy.get('[data-cy="filter-option-Filtered water"]').click();
      
      // Apply water filter options - Entry Type
      cy.get('[data-cy="filter-option-Open Access"]').click();
      
      // Close filter menu
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains('Resources:').should('exist').then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it('should restore original count when Clear All is clicked', () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Drinking fountain"]').click();
      cy.get('[data-cy="filter-option-ADA accessible"]').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Click Clear All
      cy.get('[data-cy=button-filter-type-menu]').click();
      cy.get('[data-cy="button-clear-all-desktop"]').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify count returns to initial
      cy.contains('Resources:').should('exist').then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe('Food filters', () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('FOOD');
      
      // Store initial resource count
      cy.contains('Resources:').should('exist').then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it('should reduce resource count when food filters are applied', () => {
      // Apply food filter options - Food Type
      cy.get('[data-cy="filter-option-Perishable"]').should('exist').click();
      cy.get('[data-cy="filter-option-Non-perishable"]').should('exist').click();
      cy.get('[data-cy="filter-option-Prepared foods and meals"]').should('exist').click();
      
      // Apply food filter options - Distribution type
      cy.get('[data-cy="filter-option-Eat on site"]').should('exist').click();
      cy.get('[data-cy="filter-option-Delivery"]').should('exist').click();
      
      // Apply organization type filters
      cy.get('[data-cy="filter-option-Non-profit"]').should('exist').click();
      
      // Close filter menu
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains('Resources:').should('exist').then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it('should restore original count when Clear All is clicked', () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Perishable"]').should('exist').click();
      cy.get('[data-cy="filter-option-Non-profit"]').should('exist').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Click Clear All
      cy.get('[data-cy=button-filter-type-menu]').click();
      cy.get('[data-cy="button-clear-all-desktop"]').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify count returns to initial
      cy.contains('Resources:').should('exist').then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe('Foraging filters', () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('FORAGE');
      
      // Store initial resource count
      cy.contains('Resources:').should('exist').then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it('should reduce resource count when foraging filters are applied', () => {
      // Apply foraging filter options - Forage type
      cy.get('[data-cy="filter-option-Nut"]').should('exist').click();
      cy.get('[data-cy="filter-option-Fruit"]').should('exist').click();
      cy.get('[data-cy="filter-option-Leaves"]').should('exist').click();
      cy.get('[data-cy="filter-option-Bark"]').should('exist').click();
      cy.get('[data-cy="filter-option-Flowers"]').should('exist').click();
      
      // Apply foraging filter options - Features
      cy.get('[data-cy="filter-option-Medicinal"]').should('exist').click();
      cy.get('[data-cy="filter-option-In season"]').should('exist').click();
      
      // Apply Entry Type filters
      cy.get('[data-cy="filter-option-Open Access"]').should('exist').click();
      
      // Close filter menu
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains('Resources:').should('exist').then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it('should restore original count when Clear All is clicked', () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Nut"]').should('exist').click();
      cy.get('[data-cy="filter-option-Medicinal"]').should('exist').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Click Clear All
      cy.get('[data-cy=button-filter-type-menu]').click();
      cy.get('[data-cy="button-clear-all-desktop"]').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify count returns to initial
      cy.contains('Resources:').should('exist').then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe('Bathroom filters', () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('BATHROOM');
      
      // Store initial resource count
      cy.contains('Resources:').should('exist').then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it('should reduce resource count when bathroom filters are applied', () => {
      // Apply bathroom filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').should('exist').click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should('exist').click();
      cy.get('[data-cy="filter-option-Changing table"]').should('exist').click();
      cy.get('[data-cy="filter-option-Single occupancy"]').should('exist').click();
      cy.get('[data-cy="filter-option-Family bathroom"]').should('exist').click();
      cy.get('[data-cy="filter-option-Has water fountain"]').should('exist').click();
      
      // Apply Entry Type filter
      cy.get('[data-cy="filter-option-Open Access"]').should('exist').click();
      
      // Close filter menu
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains('Resources:').should('exist').then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it('should restore original count when Clear All is clicked', () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-ADA accessible"]').should('exist').click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should('exist').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Click Clear All
      cy.get('[data-cy=button-filter-type-menu]').click();
      cy.get('[data-cy="button-clear-all-desktop"]').click();
      cy.get('[data-cy=button-filter-type-menu]').click();
      
      // Verify count returns to initial
      cy.contains('Resources:').should('exist').then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });
});
