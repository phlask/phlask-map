// For each resource type, load a site's half modal and full modal
// for each site modal, confirm the required modal mode buttons work and that the relevant information is displayed
describe("modals", () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
      cy.visit("/");
      // Load the sidebar
      // NOTE: This line currently uses components that are due to be updated, which may break this flow.
      // Close the tutorial modal
      cy.get('[aria-label=Close]').click()
    });
  
    it("should successfully display a water site", () => {
      // Load a sample water site. 
      // This is currently using live data, but should be updated to make use of test data.
      cy.get('[title=data-cy-1]').click({force: true})
      cy.get('[data-cy=tap-organization-name]').should('have.text', 'Test Organization')
    });
  
    it("should successfully display a food site", () => {
      // TODO
    });
  
    it("should successfully display a foraging site", () => {
      // TODO
    });
  
    it("should successfully display a bathroom site", () => {
      // TODO
    });
});
