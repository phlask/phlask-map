// Desktop crowd-sourcing form tests
// Tests form submission functionality for all resource types on desktop
const clickInputByName = (name: string) => {
  cy.get(`input[name="${name}"]`).click({ force: true });
};

const nextPageOrSubmit = () =>
  cy.get('button[data-cy="submit-resource-desktop"]').click();

describe('crowdsourcing form', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=button-contribute-type-menu]').click();

    cy.intercept(
      {
        method: 'POST',
        url: '/rest/v1/resources'
      },
      {
        statusCode: 201,
        body: null
      }
    ).as('resourceSubmitRequest');
  });

  it('should successfully submit a water site', () => {
    // Load the form
    cy.get('[data-cy=button-contribute-water]').click();
    cy.get('input[name="name"]').type('Cypress Test Name');
    cy.get('input[data-cy="form-resource-address-input"]').type(
      'City Hall, Philadelphia, PA, USA'
    );
    cy.get('li').contains('City Hall, Philadelphia, PA, USA').click();

    cy.get('input[name="description"]').type('Cypress Test Description');
    cy.get('div[data-cy="resource-entry-type-field"]').click();
    cy.get('li[data-value="RESTRICTED"]').click();

    cy.get('input[name="water.dispenser_type"]').type('Sink');
    cy.get('input[name="water.dispenser_type"]').press(
      Cypress.Keyboard.Keys.DOWN
    );
    cy.press(Cypress.Keyboard.Keys.ENTER);

    nextPageOrSubmit();

    cy.get('label').contains('Wheelchair accessible').click();

    cy.get('textarea[name="guidelines"]').type('Cypress Test');

    nextPageOrSubmit();

    cy.contains('Thank you for your submission!').should('exist');
  });

  it('should successfully submit a food site for testing', () => {
    const foodTypes = [
      'perishable',
      'nonPerishable',
      'prepared',
      'foodTypeOther'
    ];
    const distributionTypes = [
      'eatOnSite',
      'delivery',
      'pickUp',
      'distributionTypeOther'
    ];
    const helpfulInfoTypes = [
      'handicapAccessible',
      'idRequired',
      'childrenOnly',
      'communityFridges'
    ];

    // Load the form
    cy.get('[data-cy=button-contribute-food]').click();

    cy.get('input[name="name"]').type('Cypress Food Test Name', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA',
      {
        force: true
      }
    );
    cy.get('input[name="website"]').type('cypress.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Test Food Description'
    );
    cy.get('div[id="organization"]').click({ force: true });
    cy.get('li[data-value="Non-profit"]').click();
    cy.get(
      '[data-testid="foodType"] svg[data-testid="ExpandMoreIcon"]'
    ).click();
    foodTypes.forEach(clickInputByName);
    cy.get(
      '[data-testid="foodType"] svg[data-testid="ExpandMoreIcon"]'
    ).click();
    cy.get(
      '[data-testid="distribution"] svg[data-testid="ExpandMoreIcon"]'
    ).click({ force: true });
    distributionTypes.forEach(clickInputByName);
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click();
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get('textarea[name="guidelines"]').type(
      'Cypress Test Long Enough To See Behind the Nav Overlay'
    );
  });

  it('should successfully submit a foraging site for testing', () => {
    const forageTypes = ['nut', 'fruit', 'leaves', 'bark', 'flowers', 'root'];
    const helpfulInfoTypes = ['medicinal', 'inSeason', 'communityGarden'];

    // Load the form
    cy.get('[data-cy=button-contribute-foraging]').click();

    // Fill Page One - Basic Info
    cy.get('input[name="name"]').type('Cypress Foraging Test Name', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.foraging.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Test Foraging Description'
    );
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();

    // Select forage types
    cy.get('svg[data-testid="ExpandMoreIcon"]').click();
    forageTypes.forEach(clickInputByName);
    cy.get('svg[data-testid="ExpandMoreIcon"]').click({ force: true });

    // Navigate to Page Two
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click();

    // Fill Page Two - Helpful info
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get('textarea[name="guidelines"]').type(
      'Cypress Foraging Test Guidelines'
    );

    // Form submission disabled to prevent test data in live DB
  });

  it('should successfully submit a bathroom site for testing', () => {
    const helpfulInfoTypes = [
      'handicapAccessible',
      'genderNeutral',
      'changingTable',
      'singleOccupancy',
      'familyBathroom',
      'hasFountain'
    ];

    // Load the form
    cy.get('[data-cy=button-contribute-bathroom]').click();

    // Fill Page One - Basic Info
    cy.get('input[name="name"]').type('Cypress Bathroom Test Name', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.bathroom.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Test Bathroom Description'
    );
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();

    // Navigate to Page Two
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click();

    // Fill Page Two - Helpful info
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get('textarea[name="guidelines"]').type(
      'Cypress Bathroom Test Guidelines'
    );

    // Form submission disabled to prevent test data in live DB
  });
});
