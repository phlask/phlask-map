import {
  ABOUT_US_HEAD_BUTTON,
  getTestId,
  HEAD_HAMBURGER_BUTTON
} from 'utils/selectors.ts';

// For each resource type, test each filter permutation and confirm only the expected number of taps appear.
describe('menu navigation', () => {
  beforeEach(() => {
    cy.visit('/');
    // Load the sidebar

    // Open the sidebar menu
    cy.get(HEAD_HAMBURGER_BUTTON).click();
  });

  it('should successfully show about us content', () => {
    // Click the about us sidebar button
    cy.get(ABOUT_US_HEAD_BUTTON).click();

    cy.get(getTestId('about')).should('have.text', 'About PHLASK');
  });

  it('should successfully show the join team content', () => {
    // Click the join team sidebar button
    cy.get('[data-cy=sidebar-jointeam-button]').click();

    cy.get('[data-cy=jointeam-header]').should('have.text', 'Join the team');
  });

  it('should successfully show the contact form', () => {
    // Click the contact sidebar button
    cy.get('[data-cy=sidebar-contact-button]').click();

    // Verify the iframe is present
    cy.get('iframe[title="Contact Us"]').should('exist');
    cy.get('iframe[title="Contact Us"]').should('have.attr', 'src').and('include', 'airtable.com');
  });
});
