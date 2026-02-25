import { ResourceType } from 'types/types.ts';
import {
  CONTRIBUTE_MENU_BUTTON,
  FORM_RESOURCE_ADDRESS_INPUT,
  getChooseResourceButtonByType,
  getByName,
  getTestId
} from './selectors.ts';

export const openContributeMenu = () => cy.get(CONTRIBUTE_MENU_BUTTON).click();

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

export const selectResource = (type: ResourceType) =>
  cy.get(getChooseResourceButtonByType(type)).click();

export const input = (name: string, value = '') => {
  cy.get(getByName(name)).type(value, { force: true });
};

export const autocompleteInput = (name: string, value = '') => {
  input(name, value);
  cy.get(getByName(name)).press(Cypress.Keyboard.Keys.DOWN);
  cy.press(Cypress.Keyboard.Keys.ENTER);
};

export const selectAddress = () => {
  cy.get(FORM_RESOURCE_ADDRESS_INPUT).type('City Hall, Philadelphia, PA, USA');
  cy.get('li').contains('City Hall, Philadelphia, PA, USA').click();
};

export const selectInput = (id: string, value: string) => {
  cy.get(getTestId(id, 'div')).click();

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
) => cy.get(getTestId(id, 'button')).click();

export const expectFormWasSubmitted = (
  title = 'Thank you for your submission!'
) => {
  cy.contains(title).should('exist');
  cy.get('button[aria-label="close"]').click();
};
