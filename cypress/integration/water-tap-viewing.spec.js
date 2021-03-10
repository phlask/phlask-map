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
    cy.reload();
    cy.xpath(
      '//*[@id="react-google-map"]/div[1]/div/div[1]/div/div/div[1]/div[3]/div/div[3]/div[18]'
    ).click();
    //cy.get("#react-google-map").click(370, 130);
  });
});
