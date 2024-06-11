// TODO
// Add expected fail cases

// For each resource type, test each filter permutation and confirm only the expected number of taps appear.
describe("menu navigation", () => {
    beforeEach(() => {
      cy.visit("/");
      // Load the sidebar
      
      // Close the tutorial modal
      cy.get('[aria-label=Close]').click()
      
      // Open the sidebar menu
      cy.get('[data-cy=head-sidebar-button]').click()
    });
  
    it("should successfully show about us content", () => {
      // Click the about us sidebar button
      cy.get('[data-cy=sidebar-about-button]').click()
      
      cy.get('[data-cy=about-header]').should('have.text', 'About PHLASK')
    });

    it("should successfully show the join team content", () => {
      // TODO
    });

    it("should successfully show the contact form and send feedback", () => {
      // TODO
      // Make form submission send to a test destination for validation
    });
});
