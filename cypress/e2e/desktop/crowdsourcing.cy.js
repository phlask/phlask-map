// TODO
// Add expected fail cases

// For each resource type, test submitting a site with the following scenarios
// All tap information
// A submission with only one of each optional field for each resource type
describe("crowdsourcing form", () => {
    beforeEach(() => {
      cy.visit("/");

      // NOTE: This line currently uses components that are due to be updated.
      // Close the tutorial modal
      cy.get('[aria-label=Close]').click()

      // Load the contribution menu
      cy.get('[data-cy=button-contribute-menu]').click()
    });
  
    it("should successfully submit a water site for testing", () => {
      // Load the form
      cy.get('[data-cy=button-contribute-water]').click()

      cy.get('input[name="name"]').type("Cypress Test Name", {force: true})
      cy.get('input[name="address-textbox"').type("City Hall Room 708, Philadelphia, PA 19107, USA")
      cy.get('input[name="website"]').type("cypress.test")
      cy.get('textarea[name="description"]').type("Cypress Test Description")
      cy.get('div[id="entry"]').click({force: true})
      cy.get('li[data-value="Open access"]').click()
      cy.get('svg[data-testid="ExpandMoreIcon"]').click()
      cy.get('input[name="drinkingFountain"]').click({force: true})
      cy.get('input[name="sink"]').click()
      cy.get('input[name="sodaMachine"]').click()
      cy.get('input[name="waterCooler"]').click()
      cy.get('svg[data-testid="ExpandMoreIcon"]').click({force: true})
      cy.get('svg[data-testid="ArrowForwardIosIcon"]').click()
      cy.get('input[name="handicapAccessible"]').click()
      cy.get('input[name="waterVesselNeeded"]').click()
      cy.get('textarea[name="guidelines"]').type("Cypress Test")
      // TODO Uncomment this and validate the post-submission screen content once 
      //      we have implemented a mechanism to ensure tests do not actually send data to our live DB.
      // cy.get('input[type="submit').click()
    });

    it("should successfully submit a food site for testing", () => {
      // TODO
    });

    it("should successfully submit a foraging site for testing", () => {
      // TODO
    });

    it("should successfully submit a bathroom site for testing", () => {
      // TODO
    });
});
