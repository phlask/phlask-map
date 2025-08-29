// Helper functions for filter tests
const switchToResourceType = (resourceType) => {
  cy.get("[data-cy=button-resource-type-menu]").click();
  cy.get(`[data-cy=button-resource-${resourceType.toLowerCase()}]`).first().click({ force: true });
};

const openFilterMenu = () => {
  cy.get("[data-cy=button-filter-mobile]").click();
  cy.get('[data-cy*="filter-option-"]').should('be.visible');
};

const closeFilterMenu = () => {
  cy.get("[data-cy=button-filter-mobile]").click({ force: true });
};

const applyFilters = (filters) => {
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
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]").should("exist");
    switchToResourceType("water");
    waitForResourcesLoad();
  });

  it("should filter water sites by dispenser type and verify resource count changes", () => {
    let initialCount;
    
    // Verify initial state - has resources
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    // Apply dispenser type filter
    applyFilters(["Bottle filler"]);

    // Verify filter requirements
    getResourceCount().then(filteredCount => {
      // Filter shows at least one tap
      expect(filteredCount).to.be.greaterThan(0);
      // Some taps must be filtered out
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Verify ONLY matching taps shown on map
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter water sites by features and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Verify markers on map match the filtered count  
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter water sites by entry type and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Open Access"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter water sites by multiple criteria, verify resource count changes, and verify Clear All restores original count", () => {
    let initialCount;
    
    // Verify initial state
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(8);
    });

    // Apply multiple filter criteria
    applyFilters(["Bottle filler", "ADA accessible", "Open Access"]);

    // Verify all filter requirements for combination
    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.lessThan(initialCount);
      
      // Only matching taps visible
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all water resources
    clearAllFilters();

    // Verify Clear All restores everything
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // All previously hidden taps now visible on map
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });
});

// Food resource filter tests
describe("Food resource filtering", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]").should("exist");
    switchToResourceType("food");
    waitForResourcesLoad();
  });

  it("should filter food sites by food type and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Perishable"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter food sites by distribution type and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Eat on site"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter food sites by multiple criteria, verify resource count changes, and verify Clear All restores original count", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Non-perishable", "Pick up"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all food resources
    clearAllFilters();

    // Verify Clear All restores everything
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // All previously hidden taps now visible on map
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });
});

// Foraging resource filter tests
describe("Foraging resource filtering", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]").should("exist");
    switchToResourceType("forage");
    waitForResourcesLoad();
  });

  it("should filter foraging sites by forage type and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Fruit"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter foraging sites by features and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Medicinal"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter foraging sites by multiple criteria, verify resource count changes, and verify Clear All restores original count", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Nut", "Leaves"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all foraging resources
    clearAllFilters();

    // Verify Clear All restores everything
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // All previously hidden taps now visible on map
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });
});

// Bathroom resource filter tests
describe("Bathroom resource filtering", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]").should("exist");
    switchToResourceType("bathroom");
    waitForResourcesLoad();
  });

  it("should filter bathroom sites by ADA accessibility and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter bathroom sites by gender neutral feature and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Gender neutral"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter bathroom sites by changing table amenity and verify resource count changes", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["Changing table"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });
  });

  it("should filter bathroom sites by multiple criteria, verify resource count changes, and verify Clear All restores original count", () => {
    let initialCount;
    getResourceCount().then(count => {
      initialCount = count;
      expect(initialCount).to.be.greaterThan(0);
    });

    applyFilters(["ADA accessible", "Gender neutral"]);

    getResourceCount().then(filteredCount => {
      expect(filteredCount).to.be.greaterThan(0);
      expect(filteredCount).to.be.at.most(initialCount);
      
      // Verify markers on map match the filtered count
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(filteredCount);
      });
    });

    // TEST CLEAR ALL FUNCTIONALITY
    // Click Clear All button to restore all bathroom resources
    clearAllFilters();

    // Verify Clear All restores everything
    getResourceCount().then(clearedCount => {
      expect(clearedCount).to.equal(initialCount);
      
      // All previously hidden taps now visible on map
      cy.get('[title^="data-cy-"]').then($markers => {
        expect($markers.length).to.equal(initialCount);
      });
    });
  });
});

// Cross-resource type filter persistence tests
describe("Filter persistence across resource types", () => {
  beforeEach(() => {
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get("[data-cy=button-filter-mobile]").should("exist");
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

    // Food should show all resources (no filters applied)
    cy.get('[title^="data-cy-"]').then($markers => {
      expect($markers.length).to.equal(foodInitialCount);
    });
  });
});