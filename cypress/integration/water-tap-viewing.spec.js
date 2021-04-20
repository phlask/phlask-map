/// <reference types="cypress" />

describe("opening screen", () => {
  beforeEach(() => {
    cy.visit("https://phlask.me/");
    cy.get(".btn").click();
    cy.get(".TutorialModal_modalFooter__3YVhE > :nth-child(2)").click();
    cy.get(".TutorialModal_modalFooter__3YVhE > :nth-child(2)").click();
    cy.get(".btn-red").click();
  });

  it("should open a modal when tap icon is clicked", () => {
    cy.get("#react-google-map").click(370, 130);
  });
});
