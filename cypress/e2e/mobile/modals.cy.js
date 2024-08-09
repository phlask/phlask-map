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
    cy.get('[data-cy=button-FOOD-data-selector]').click();

    // Load a sample food site
    // This is currently using live data, but should be updated to make use of test data.
    cy.get('[title=data-cy-1]').click();

    // Confirm that the modal that pops up shows the correct name for the location
    cy.get('[data-cy=tap-organization-name]').should(
      'have.text',
      'Test Organization'
    );

    // Confirm that the modal represents a half-modal


    // Expand the modal to a full-modal
    // Confirm that the correct description for the location is displayed
    // Confirm that the modal represents a full-modal


  });

  it('should successfully display a foraging site', () => {
    // TODO
  });

  it('should successfully display a bathroom site', () => {
    // TODO
  });
});
