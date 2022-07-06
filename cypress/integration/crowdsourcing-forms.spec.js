describe('Crowdsourcing forms: Test Input for Water Tap', ()=> {

    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.get('.btn-close').click() 
      cy.get('[data-cy=AddResourceButton]').click();
      cy.get('button:contains(Water Tap)')
        .click()
    });

    it('should open the Additional Information tab', ()=> {
     cy.get('[data-cy=AdditionalInformation]') 
      .click()
      cy.get('[data-cy=AdditionalInformation] div div')
      .should('have.class', 'show')
    })

    it('should input and have value of name', () => {

    cy.get('label:contains(Name)')
      .type('Test')
      .parent()
      .invoke('attr', 'value')
      .should('eq', 'Test')
          
  })

  it('should input and have value of street address', ()=> {
      cy.get('input#address')
      .type('123 Example Street')
      .parent().parent()
      .invoke('attr', 'value')
      .should('eq', '123 Example Street')
    })

    it('should input and have value of website', ()=> {
      cy.get('input#website')
      .type('https://example.com')
      .parent()
      .invoke('attr', 'value')
      .should('eq', 'https://example.com')
    })

    it('should input and have value of a description', ()=> {
      cy.get('input#description')
        .type('Description test')
        .parent()
        .invoke('attr', 'value')
        .should('eq', 'Description test')
      })

      it('should select and have value of an access type', ()=> {
        cy.get('select#accessType')
        .select('Public')
        .parent()
        .invoke('attr', 'value')
        .should('eq', 'public')
      })

      it('should submit a filled form', ()=> {
        cy.get('#name')
        .type('Test')

        cy.get('input#address')
        .type('123 Example Street')

        cy.get('input#website')
        .type('https://example.com')

        cy.get('input#description')
          .type('Description test')

        cy.get('select#accessType')
          .select('Public')

        cy.get('form')
          .submit()

        cy.get('.modal-content')
          .children()
          .contains('Thanks for sharing')
      })
})
