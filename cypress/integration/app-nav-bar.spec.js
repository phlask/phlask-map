/// <reference types="cypress" />

describe("opening screen", () => {
  beforeEach(() => {
    cy.visit("https://phlask.me/");
    cy.get(".btn").click();
    cy.get(".TutorialModal_modalFooter__3YVhE > :nth-child(2)").click();
    cy.get(".TutorialModal_modalFooter__3YVhE > :nth-child(2)").click();
    cy.get(".btn-red").click();
  });

  it("should show page for each menu option when selected", () => {
    cy.get('[href="mission"]').click();
    cy.wait(2000);
    cy.get('[href="project"]').click();
    cy.wait(2000);
    cy.get('[href="share"]').click();
    cy.wait(2000);
    cy.get('[href="contribute"]').click();
    cy.wait(2000);
    cy.get(".logoImage").click();
  });
});
