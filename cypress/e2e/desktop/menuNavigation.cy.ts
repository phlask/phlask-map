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

    cy.get(getTestId('about-header')).should('have.text', 'About PHLASK');
  });

  it('should successfully show the join team content', () => {
    // TODO
  });

  it('should successfully show the contact form and send feedback', () => {
    // TODO
    // Make form submission send to a test destination for validation
  });
});
