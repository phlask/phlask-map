// TODO
// Add expected fail cases

// For each resource type, test submitting a site with the following scenarios
// All tap information
// A submission with only one of each optional field for each resource type
describe("crowdsourcing form", () => {
  beforeEach(() => {
    cy.visit("/");

    // Load the contribution menu
    cy.get('[data-cy=button-contribute-menu]').click()
  });

  it("should successfully submit a water site for testing", () => {
    // Load the form
    cy.get('[data-cy=button-WATER-data-submit-selector]').click()

    cy.get('input[name="name"]').type("Cypress Test Name", { force: true })
    cy.get('input[name="address-textbox"]').type("City Hall Room 708, Philadelphia, PA 19107, USA")
    cy.get('input[name="website"]').type("cypress.test")
    cy.get('textarea[name="description"]').type("Cypress Test Description")
    cy.get('div[id="entry"]').click({ force: true })
    cy.get('li[data-value="Open access"]').click()
    cy.get('svg[data-testid="ExpandMoreIcon"]').click()
    cy.get('input[name="drinkingFountain"]').click({ force: true })
    cy.get('input[name="sink"]').click()
    cy.get('input[name="sodaMachine"]').click()
    cy.get('input[name="waterCooler"]').click()
    cy.get('svg[data-testid="ExpandMoreIcon"]').click({ force: true })
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click()
    cy.get('input[name="handicapAccessible"]').click()
    cy.get('input[name="waterVesselNeeded"]').click()
    cy.get('textarea[name="guidelines"]').type("Cypress Test")
    // TODO Uncomment this and validate the post-submission screen content once
    //      we have implemented a mechanism to ensure tests do not actually send data to our live DB.
    // cy.get('input[type="submit').click()
  });

  it("should successfully submit a food site for testing", () => {
    // Load the form
    cy.get('[data-cy=button-FOOD-data-submit-selector]').click()

    cy.get('input[name="name"]').type("Cypress Food Test Name", { force: true })
    cy.get('input[name="address-textbox"]').type("City Hall Room 708, Philadelphia, PA 19107, USA")
    cy.get('input[name="website"]').type("cypress.test")
    cy.get('textarea[name="description"]').type("Cypress Test Food Description")
    cy.get('div[id="organization"]').click({ force: true })
    cy.get('li[data-value="Non-profit"]').click()
    cy.get('[data-testid="foodType"] svg[data-testid="ExpandMoreIcon"]').click()
    cy.get('input[name="perishable"]').click({ force: true })
    cy.get('input[name="nonPerishable"]').click()
    cy.get('input[name="prepared"]').click()
    cy.get('input[name="foodTypeOther"]').click()
    cy.get('[data-testid="foodType"] svg[data-testid="ExpandMoreIcon"]').click()
    cy.get('[data-testid="distribution"] svg[data-testid="ExpandMoreIcon"]').click({ force: true })
    cy.get('input[name="eatOnSite"]').click()
    cy.get('input[name="delivery"]').click()
    cy.get('input[name="pickUp"]').click()
    cy.get('input[name="distributionTypeOther"]').click()
    cy.get('svg[data-testid="ArrowForwardIosIcon"]').click()
    cy.get('input[name="handicapAccessible"]').click()
    cy.get('input[name="idRequired"]').click()
    cy.get('input[name="childrenOnly"]').click()
    cy.get('input[name="communityFridges"]').click()
    cy.get('textarea[name="guidelines"]').type("Cypress Test Long Enough To See Behind the Nav Overlay")
  });

  it("should successfully submit a foraging site for testing", () => {
    // TODO
  });

  it("should successfully submit a bathroom site for testing", () => {
    // TODO
  });
});
