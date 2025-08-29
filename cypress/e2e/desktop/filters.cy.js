// Helper functions for desktop filter tests
const switchToResourceType = (resourceType) => {
  cy.get("[data-cy=button-resource-type-menu]").click();
  cy.get(`[data-cy=button-${resourceType.toUpperCase()}-data-selector]`).click();
};

const openFilterMenu = () => {
  cy.get("[data-cy=button-filter-type-menu]").click();
  cy.get('[data-cy*="filter-option-"]').should('be.visible');
};

const closeFilterMenu = () => {
  cy.get("[data-cy=button-filter-type-menu]").click();
  cy.wait(500);
};

const applyFilters = (filters) => {
  openFilterMenu();
  filters.forEach(filter => {
    cy.get(`[data-cy="filter-option-${filter}"]`).should('exist').click();
  });
  closeFilterMenu();
};

const clearAllFilters = () => {
  openFilterMenu();
  cy.get('[data-cy="button-clear-all-desktop"]').click();
  closeFilterMenu();
};

const getResourceCount = () => {
  return cy.contains("Resources:").should("exist").then(($el) => {
    return parseInt($el.text().split("Resources: ")[1]);
  });
};

const waitForResourcesLoad = () => {
  cy.get('[title^="data-cy-"]').should("exist");
  cy.get('[title^="data-cy-"]').should("have.length.greaterThan", 0);
};

// Water resource filter tests
describe("Water resource filtering", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-type-menu]").should("exist");
    switchToResourceType("water");
    waitForResourcesLoad();
  });

  it("should filter water sites by dispenser type", () => {
    let initialCount;
    let initialMarkerCount;
    
    // 1. Verify initial state - has resources
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    // Store initial marker count - all should be visible
    cy.get('[title^="data-cy-"]').then($markers => {
      initialMarkerCount = $markers.length;
      expect(initialMarkerCount).to.equal(initialCount);
    });

    // 2. Apply dispenser type filter
    applyFilters(["Bottle filler"]);

    // 3. Verify filter requirements
    getResourceCount().then(filteredCount => {
      // Requirement 1: Filter shows at least one tap
      expect(filteredCount).to.be.greaterThan(0);
      // Some taps must be filtered out (proving some don't match)
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Requirement 2&3: Verify ONLY matching taps shown on map
      cy.get('[title^="data-cy-"]').then($markers => {
        // Exact count match proves matching taps shown, non-matching hidden
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // 4. Clear all filters
    clearAllFilters();

    // 5. Verify Clear All requirements  
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // Requirement 4: Previously hidden taps now visible
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });

  it("should filter water sites by features", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.lessThan(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter water sites by entry type", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Open Access"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.lessThan(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter water sites by multiple criteria", () => {
    let initialCount;
    
    // 1. Verify initial state
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(8); // Ensure adequate test data
    });

    // 2. Apply multiple filter criteria (most restrictive combination)
    applyFilters(["Bottle filler", "ADA accessible", "Open Access"]);

    // 3. Verify all filter requirements for combination
    getResourceCount().then(filteredCount => {
      // Requirement 1: Combination shows at least one tap with ALL criteria
      expect(filteredCount).to.be.greaterThan(0);
      
      // Significant filtering occurred (most resources don't match all 3 criteria)
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Requirement 2&3: Only matching taps visible, non-matching hidden
      cy.get('[title^="data-cy-"]').then($markers => {
        // Exact count proves only resources matching ALL criteria are shown
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // 4. Clear all filters  
    clearAllFilters();

    // 5. Verify Clear All restores everything
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // Requirement 4: All previously hidden taps now visible
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });
});

// Food resource filter tests
describe("Food resource filtering", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-type-menu]").should("exist");
    switchToResourceType("food");
    waitForResourcesLoad();
  });

  it("should filter food sites by food type", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Perishable"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter food sites by distribution type", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Eat on site"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter food sites by multiple criteria", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Non-perishable", "Pick up"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });
});

// Foraging resource filter tests
describe("Foraging resource filtering", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-type-menu]").should("exist");
    switchToResourceType("forage");
    waitForResourcesLoad();
  });

  it("should filter foraging sites by forage type", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Fruit"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter foraging sites by features", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Medicinal"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter foraging sites by multiple criteria", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Nut", "Leaves"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });
});

// Bathroom resource filter tests
describe("Bathroom resource filtering", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-type-menu]").should("exist");
    switchToResourceType("bathroom");
    waitForResourcesLoad();
  });

  it("should filter bathroom sites by ADA accessibility", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter bathroom sites by gender neutral feature", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Gender neutral"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter bathroom sites by changing table amenity", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Changing table"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });

  it("should filter bathroom sites by multiple criteria", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible", "Gender neutral"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
    });

    // Verify markers on map match the filtered count
    cy.get('[title^="data-cy-"]').then($markers => {
      cy.contains("Resources:").should("exist").then(($el) => {
        const displayedCount = parseInt($el.text().split("Resources: ")[1]);
        expect($markers.length).to.equal(displayedCount);
      });
    });

    clearAllFilters();

    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
    });

    // Verify all markers are visible again  
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(initialCount);
    });
  });
});

// Cross-resource type filter persistence tests
describe("Filter persistence across resource types", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=button-filter-type-menu]").should("exist");
  });

  it("should clear filters when switching resource types", () => {
    // Start with water and apply filters
    switchToResourceType("water");
    waitForResourcesLoad();
    
    let waterInitialCount;
    getResourceCount().then(count => {
      waterInitialCount = count;
    });

    applyFilters(["Bottle filler"]);
    
    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.lessThan(waterInitialCount);
    });

    // Switch to food - filters should be cleared
    switchToResourceType("food");
    waitForResourcesLoad();
    
    let foodInitialCount;
    getResourceCount().then(count => {
      foodInitialCount = count;
      expect(foodInitialCount).to.be.greaterThan(0);
    });

    // Switch back to water - filters should still be cleared
    switchToResourceType("water");
    waitForResourcesLoad();
    
    getResourceCount().then(count => {
      expect(count).to.equal(waterInitialCount);
    });
  });
});