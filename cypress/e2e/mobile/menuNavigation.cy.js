// TODO
// Add expected fail cases

// For each resource type, test each filter permutation and confirm only the expected number of taps appear.
describe("menu navigation", () => {
    beforeEach(() => {
      cy.visit("/");
      // Load the sidebar
    });
  
    it("should successfully show about us content", () => {
      // TODO
    });

    it("should successfully show the join team content", () => {
      cy.viewport('iphone-x');
      
      // Click the hamburger menu button
      cy.get('[data-cy=head-sidebar-button]').click();
      
      // Click the "Join the team" button
      cy.get('[data-cy=sidebar-jointeam-button]').click();
      
      // Verify the header text displays "Join the team"
      cy.get('[data-cy=jointeam-header]').should('have.text', 'Join the team');
    });

    it("should successfully show the contact form and send feedback", () => {
      // TODO
      // Make form submission send to a test destination for validation
    });
});
