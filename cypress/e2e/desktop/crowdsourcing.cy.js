// Desktop crowdsourcing form tests
// Tests form submission functionality for all resource types on desktop
describe('crowdsourcing form', () => {
  function clickInputByName(name) {
    cy.get(`input[name="${name}"]`).click({ force: true });
  }

  beforeEach(() => {
    cy.visit('/');

    // Load the contribution menu
    cy.get('[data-cy=button-contribute-type-menu]').click();
  });

  it('should successfully submit a water site for testing', () => {
    const sourceTypes = [
      'drinkingFountain',
      'sink',
      'sodaMachine',
      'waterCooler'
    ];
    const helpfulInfoTypes = ['handicapAccessible', 'waterVesselNeeded'];

    // Load the form
    cy.get('[data-cy=button-contribute-water]').click();

    cy.get('input[name="name"]').type('Cypress Test Name', { force: true });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.test');
    cy.get('textarea[name="description"]').type('Cypress Test Description');
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();
    cy.get('svg[data-testid="ExpandMoreIcon"]').click();
    sourceTypes.forEach(clickInputByName);
    cy.get('svg[data-testid="ExpandMoreIcon"]').click({ force: true });
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click();
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get('textarea[name="guidelines"]').type('Cypress Test');
    // TODO Uncomment this and validate the post-submission screen content once
    //      we have implemented a mechanism to ensure tests do not actually send data to our live DB.
    // cy.get('input[type="submit').click()
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
    cy.get('input[name="name"]').type('Cypress Foraging Test Name', { force: true });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.foraging.test');
    cy.get('textarea[name="description"]').type('Cypress Test Foraging Description');
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
    cy.get('textarea[name="guidelines"]').type('Cypress Foraging Test Guidelines');

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
    cy.get('input[name="name"]').type('Cypress Bathroom Test Name', { force: true });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.bathroom.test');
    cy.get('textarea[name="description"]').type('Cypress Test Bathroom Description');
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();

    // Navigate to Page Two
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click();

    // Fill Page Two - Helpful info
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get('textarea[name="guidelines"]').type('Cypress Bathroom Test Guidelines');

    // Form submission disabled to prevent test data in live DB
  });
});
