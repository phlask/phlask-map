export const openContributeMenu = () =>
  cy.get('[data-cy=button-contribute-type-menu]').click();

export const interceptResourceSubmitRequest = () =>
  cy
    .intercept(
      {
        method: 'POST',
        url: '/rest/v1/resources'
      },
      {
        statusCode: 201,
        body: null
      }
    )
    .as('resourceSubmitRequest');

export const selectResource = (
  resource: 'water' | 'food' | 'foraging' | 'bathroom'
) => cy.get(`[data-cy=button-contribute-${resource}]`).click();

export const input = (name: string, value = '') => {
  cy.get(`input[name="${name}"]`).type(value, { force: true });
};

export const autocompleteInput = (name: string, value = '') => {
  input(name, value);
  cy.get(`input[name="${name}"]`).press(Cypress.Keyboard.Keys.DOWN);
  cy.press(Cypress.Keyboard.Keys.ENTER);
};

export const selectAddress = () => {
  cy.get('input[data-cy="form-resource-address-input"]').type(
    'City Hall, Philadelphia, PA, USA'
  );
  cy.get('li').contains('City Hall, Philadelphia, PA, USA').click();
};

export const selectInput = (id: string, value: string) => {
  cy.get(`div[data-cy=${id}]`).click();

  cy.get(`li[data-value=${value}]`).click({ force: true });
};

export const selectEntryType = () => {
  selectInput('resource-entry-type-field', 'RESTRICTED');
};

export const checkTag = (label = 'Wheelchair accessible') => {
  cy.get('label').contains(label).click({ force: true });
};

export const nextPageOrSubmit = (
  id: `submit-resource-${'desktop' | 'mobile'}` = 'submit-resource-desktop'
) => cy.get(`button[data-cy=${id}]`).click();

export const expectFormWasSubmitted = (
  title = 'Thank you for your submission!'
) => {
  cy.contains(title).should('exist');
  cy.get('button[aria-label="close"]').click();
};
