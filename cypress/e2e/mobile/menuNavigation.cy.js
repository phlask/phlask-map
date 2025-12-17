// TODO
// Add expected fail cases

// For each resource type, test each filter permutation and confirm only the expected number of taps appear.
describe("menu navigation", () => {
    beforeEach(() => {
      cy.visit("/");
      // Load the sidebar
    });
  
    it("should successfully show about us content", () => {
      cy.viewport('iphone-x');

      // Click the hamburger menu button
      cy.get('[data-cy=head-sidebar-button]').click();

      // Click the "About" button
      cy.get('[data-cy=sidebar-about-button]').click();

      // Verify the header text displays "About PHLASK"
      cy.get('[data-cy=about-header]').should('have.text', 'About PHLASK');
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

    it("should successfully show the contact form", () => {
      cy.viewport('iphone-x');

      // Click the hamburger menu button
      cy.get('[data-cy=head-sidebar-button]').click();

      // Click the "Contact" button
      cy.get('[data-cy=sidebar-contact-button]').click();

      // Verify the iframe is present
      cy.get('iframe[title="Contact Us"]').should('exist');
      cy.get('iframe[title="Contact Us"]').should('have.attr', 'src').and('include', 'airtable.com');
    });
});
