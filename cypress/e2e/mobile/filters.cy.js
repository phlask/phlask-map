describe("filters", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
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

  // Helper function to setup resource type and open filter drawer
  const setupResourceType = (resourceType) => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]", { timeout: 10000 }).should("exist");
    
    // Switch to specific resource type
    switchResourceType(resourceType);
    
    // Open filter drawer
    openFilterDrawer();
  };

  describe("Water filters", () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('water');
      
      // Store initial resource count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it("should reduce resource count when water filters are applied", () => {
      // Apply water filter options - Dispenser Type
      cy.get('[data-cy="filter-option-Drinking fountain"]').click();
      cy.get('[data-cy="filter-option-Bottle filler"]').click();
      
      // Apply water filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').click();
      cy.get('[data-cy="filter-option-Filtered water"]').click();
      
      // Apply water filter options - Entry Type
      cy.get('[data-cy="filter-option-Open Access"]').click();
      
      closeFilterDrawer();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it("should restore original count when Clear All is clicked", () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Drinking fountain"]').click();
      cy.get('[data-cy="filter-option-ADA accessible"]').click();
      closeFilterDrawer();
      
      // Click Clear All
      openFilterDrawer();
      cy.get('[data-cy="button-clear-all-mobile"]').click();
      closeFilterDrawer();
      
      // Verify count returns to initial
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe("Food filters", () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('food');
      
      // Store initial resource count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it("should reduce resource count when food filters are applied", () => {
      // Apply food filter options - Food Type
      cy.get('[data-cy="filter-option-Perishable"]').should("exist").click();
      cy.get('[data-cy="filter-option-Non-perishable"]').should("exist").click();
      cy.get('[data-cy="filter-option-Prepared foods and meals"]').should("exist").click();
      
      // Apply food filter options - Distribution type
      cy.get('[data-cy="filter-option-Eat on site"]').should("exist").click();
      cy.get('[data-cy="filter-option-Delivery"]').should("exist").click();
      
      // Apply organization type filters
      cy.get('[data-cy="filter-option-Non-profit"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it("should restore original count when Clear All is clicked", () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Perishable"]').should("exist").click();
      cy.get('[data-cy="filter-option-Non-profit"]').should("exist").click();
      closeFilterDrawer();
      
      // Click Clear All
      openFilterDrawer();
      cy.get('[data-cy="button-clear-all-mobile"]').click();
      closeFilterDrawer();
      
      // Verify count returns to initial
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe("Foraging filters", () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('forage');
      
      // Store initial resource count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it("should reduce resource count when foraging filters are applied", () => {
      // Apply foraging filter options - Forage type
      cy.get('[data-cy="filter-option-Nut"]').should("exist").click();
      cy.get('[data-cy="filter-option-Fruit"]').should("exist").click();
      cy.get('[data-cy="filter-option-Leaves"]').should("exist").click();
      cy.get('[data-cy="filter-option-Bark"]').should("exist").click();
      cy.get('[data-cy="filter-option-Flowers"]').should("exist").click();
      
      // Apply foraging filter options - Features
      cy.get('[data-cy="filter-option-Medicinal"]').should("exist").click();
      cy.get('[data-cy="filter-option-In season"]').should("exist").click();
      
      // Apply Entry Type filters
      cy.get('[data-cy="filter-option-Open Access"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it("should restore original count when Clear All is clicked", () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-Nut"]').should("exist").click();
      cy.get('[data-cy="filter-option-Medicinal"]').should("exist").click();
      closeFilterDrawer();
      
      // Click Clear All
      openFilterDrawer();
      cy.get('[data-cy="button-clear-all-mobile"]').click();
      closeFilterDrawer();
      
      // Verify count returns to initial
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });

  describe("Bathroom filters", () => {
    let initialCount;

    beforeEach(() => {
      setupResourceType('bathroom');
      
      // Store initial resource count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const initialText = $el.text();
        initialCount = getResourceCount(initialText);
      });
    });

    it("should reduce resource count when bathroom filters are applied", () => {
      // Apply bathroom filter options - Features
      cy.get('[data-cy="filter-option-ADA accessible"]').should("exist").click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should("exist").click();
      cy.get('[data-cy="filter-option-Changing table"]').should("exist").click();
      cy.get('[data-cy="filter-option-Single occupancy"]').should("exist").click();
      cy.get('[data-cy="filter-option-Family bathroom"]').should("exist").click();
      cy.get('[data-cy="filter-option-Has water fountain"]').should("exist").click();
      
      // Apply Entry Type filter
      cy.get('[data-cy="filter-option-Open Access"]').should("exist").click();
      
      closeFilterDrawer();
      
      // Verify filtered count is less than or equal to initial count
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const filteredText = $el.text();
        const filteredCount = getResourceCount(filteredText);
        expect(filteredCount).to.be.lte(initialCount);
      });
    });

    it("should restore original count when Clear All is clicked", () => {
      // First apply some filters
      cy.get('[data-cy="filter-option-ADA accessible"]').should("exist").click();
      cy.get('[data-cy="filter-option-Gender neutral"]').should("exist").click();
      closeFilterDrawer();
      
      // Click Clear All
      openFilterDrawer();
      cy.get('[data-cy="button-clear-all-mobile"]').click();
      closeFilterDrawer();
      
      // Verify count returns to initial
      cy.contains("Resources:", { timeout: 5000 }).should("exist").then(($el) => {
        const clearedText = $el.text();
        const clearedCount = getResourceCount(clearedText);
        expect(clearedCount).to.equal(initialCount);
      });
    });
  });
});