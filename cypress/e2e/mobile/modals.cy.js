// For each resource type, load a site's half modal and full modal
// for each site modal, confirm the required modal mode buttons work and that the relevant information is displayed
describe('modals', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');
  });

  it('should successfully display a water site', () => {
    // Load a sample water site.
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click({ force: true });
    cy.get('[data-cy=tap-organization-name]').should(
      'have.text',
      'Test Organization'
    );
  });

  it('should successfully display a food site', () => {
    // Switch to food view
    cy.get('[data-cy=button-resource-type-menu]').click();
    cy.get('.MuiDialog-root:not(div[aria-hidden="true"]) [data-cy=mobile-button-FOOD-data-selector]').click();

    // Load a sample food site
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click();

    // Confirm that the modal that pops up shows the correct name for the location
    cy.get('[data-cy=tap-organization-name]').should(
      'have.text',
      'Test Organization'
    );

    // Confirm that the modal represents a half-modal
    cy.get('mobile-site-info-drawer-open').should('not.exist');

    // Expand the modal to a full-modal
    cy.get('div[data-cy=expanded-site-info]').trigger('pointermove', { offsetX: 0, offsetY: -1 });

    // Confirm that the modal represents a full-modal
    cy.get('[data-cy=mobile-site-info-drawer-open]').should('exist');

    // Confirm that the correct description for the location is displayed
    cy.get('[data-cy=tap-description]').should(
      'have.text',
      'Sites are open Mondays and Thursdays from 10 a.m. – 12 p.m.\n\nResidents can pick up one box per household.\n\nBoxes contain non-perishable items on Mondays and fresh produce on Thursdays.\n\nResidents do not need to present an ID or proof of income for eligibility.\n\nFood sites are supported by the City, Share Food Program, and Philabundance.\n\nThese food sites are supplementary to the existing food pantry network. To find a food pantry closest to you, call 311.')
    cy.wait(500);
  });

  it('should successfully display a foraging site', () => {
    // TODO
  });

  it('should successfully display a bathroom site', () => {
    // TODO
  });
});
