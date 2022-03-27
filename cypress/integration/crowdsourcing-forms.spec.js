describe('Crowdsourcing forms: Test Input for Water Tap', ()=> {

    beforeEach(() => {

        cy.visit("http://localhost:3000");
        cy.get('.close').click()
        cy.get('.AddResourceModal_addButton__1Hq3E').click();
        cy.get('.AddResourceModal_modalButton__35zHK:contains(Water Tap)')
          .click()
    });

    it('should open the Additional Information tab', ()=> {
      cy.get('.accordion > button')
      .click()

      cy.get('.accordion div.collapse')
        .should('have.class', 'show')
    })

    it('should input name', () => {

    cy.get('label:contains(Name)')
      .click()
      .type('Test')
      .parent()
      .invoke('attr', 'value')
      .should('eq', 'Test')
          
  })

  it('should input street address', ()=> {
    // The Address input does not have an id
      cy.get('input[placeholder*="Enter the address of this resource"]')
      .click()
      .type('123 Example Street')
      .parent().parent()
      .invoke('attr', 'value')
      .should('eq', '123 Example Street')
    })

    it('should input website', ()=> {
      cy.get('label:contains(Website)')
      .click()
      .type('https://example.com')
        
      cy.get('input#website')
        .should('have.value', 'https://example.com')
    })

    it('should input a description', ()=> {
      cy.get('input#description')
        .click()
        .type('Description test')
        .should('have.value', 'Description test')
      })

      it('should select an access type', ()=> {
        cy.get('select.AddResourceModal_modalFormSelect__1uaJP')
        .first()
        .select('Public')
        .parent()
        .invoke('attr', 'value')
        .should('eq', 'public')
      })

      //submit an empty form
      it('should submit a form', ()=> {
        cy.get('button[type="submit"]')
          .click()

        cy.get('.modal-content')
          .children()
          .contains('Thanks for sharing')
      })

      it('should submit a filled form', ()=> {
        cy.get('label:contains(Name)')
        .click()
        .type('Test')

        cy.get('input[placeholder*="Enter the address of this resource"]')
        .click()
        .type('123 Example Street')

        cy.get('label:contains(Website)')
        .click()
        .type('https://example.com')

        cy.get('input#description')
          .click()
          .type('Description test')

        cy.get('select.AddResourceModal_modalFormSelect__1uaJP')
          .first()
          .select('Public')

        cy.pause()

        cy.get('button[type="submit"]')
          .click()

        cy.get('.modal-content')
          .children()
          .contains('Thanks for sharing')
      })
})
