// Mobile crowd-sourcing form tests
// Tests form submission functionality for all resource types on mobile devices

const guidelinesSelector = 'textarea[name="guidelines"]';

const clickInputByName = (name: string) => {
  const selector = `input[name="${name}"]`;
  cy.get(selector).scrollIntoView();
  cy.get(selector).click({ force: true });
};

const openContributeMenu = () =>
  cy.get('[data-cy=button-contribute-type-menu]').click();

describe('crowdsourcing form', () => {
  beforeEach(() => {
    cy.visit('/');
    openContributeMenu();
  });

  it.only('should successfully submit a water site for testing', () => {
    // Load the form
    cy.get('[data-cy=button-contribute-water]').click();

    cy.get('input[name="name"]').type('Cypress Mobile Water Test', {
      force: true
    });
    cy.get('input[data-cy="form-resource-address-input"]').type(
      'City Hall, Philadelphia, PA, USA'
    );
    cy.get('li').contains('City Hall, Philadelphia, PA, USA').click();

    cy.get('textarea[name="description"]').type(
      'Cypress Mobile Water Test Description'
    );
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();
    cy.get('svg[data-testid="ExpandMoreIcon"]').click();

    cy.get('svg[data-testid="ExpandMoreIcon"]').click({ force: true });

    // In mobile, all fields are on one page, scroll to find helpful info checkboxes

    cy.get(guidelinesSelector).scrollIntoView();
    cy.get(guidelinesSelector).type('Cypress Mobile Water Test Guidelines');

    // Form submission disabled to prevent test data in live DB
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

    cy.get('input[name="name"]').type('Cypress Mobile Food Test', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.mobile.food.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Mobile Food Test Description'
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

    // In mobile, all fields are on one page, scroll to find helpful info checkboxes
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get(guidelinesSelector).scrollIntoView();
    cy.get(guidelinesSelector).type('Cypress Mobile Food Test Guidelines');

    // Form submission disabled to prevent test data in live DB
  });

  it('should successfully submit a foraging site for testing', () => {
    const forageTypes = ['nut', 'fruit', 'leaves', 'bark', 'flowers', 'root'];
    const helpfulInfoTypes = ['medicinal', 'inSeason', 'communityGarden'];

    // Load the form
    cy.get('[data-cy=button-contribute-foraging]').click();

    cy.get('input[name="name"]').type('Cypress Mobile Foraging Test', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.mobile.foraging.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Mobile Foraging Test Description'
    );
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();
    cy.get('svg[data-testid="ExpandMoreIcon"]').click();
    forageTypes.forEach(clickInputByName);
    cy.get('svg[data-testid="ExpandMoreIcon"]').click({ force: true });

    // In mobile, all fields are on one page, scroll to find helpful info checkboxes
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get(guidelinesSelector).scrollIntoView();
    cy.get(guidelinesSelector).type('Cypress Mobile Foraging Test Guidelines');

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

    cy.get('input[name="name"]').type('Cypress Mobile Bathroom Test', {
      force: true
    });
    cy.get('input[id="address"]').type(
      'City Hall Room 708, Philadelphia, PA 19107, USA'
    );
    cy.get('input[name="website"]').type('cypress.mobile.bathroom.test');
    cy.get('textarea[name="description"]').type(
      'Cypress Mobile Bathroom Test Description'
    );
    cy.get('div[id="entry"]').click({ force: true });
    cy.get('li[data-value="Open access"]').click();

    // In mobile, all fields are on one page, scroll to find helpful info checkboxes
    helpfulInfoTypes.forEach(clickInputByName);
    cy.get(guidelinesSelector).scrollIntoView();
    cy.get(guidelinesSelector).type('Cypress Mobile Bathroom Test Guidelines');

    // Form submission disabled to prevent test data in live DB
  });
});
