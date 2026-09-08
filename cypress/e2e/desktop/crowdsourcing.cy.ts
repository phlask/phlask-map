// Desktop crowd-sourcing form tests
// Tests form submission functionality for all resource types on desktop

import {
  autocompleteInput,
  checkTag,
  expectFormWasSubmitted,
  input,
  interceptResourceSubmitRequest,
  nextPageOrSubmit,
  openContributeMenu,
  selectAddress,
  selectEntryType,
  selectInput,
  selectResource
} from 'utils/crowdsourcing.ts';
import { getByName, GUIDELINES_TEXTAREA } from 'utils/selectors.ts';

describe('crowdsourcing form', () => {
  beforeEach(() => {
    cy.visit('/');
    openContributeMenu();

    interceptResourceSubmitRequest();
  });

  it('should successfully submit a water site', () => {
    selectResource('WATER');
    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    autocompleteInput('water.dispenser_type', 'Sink');

    nextPageOrSubmit();

    checkTag();
    cy.get(GUIDELINES_TEXTAREA).type('Cypress Test');

    nextPageOrSubmit();

    expectFormWasSubmitted();
  });

  it('should successfully submit a food site', () => {
    selectResource('FOOD');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('food.organization_name', 'Test organization');
    selectInput('select-organization-type', 'BUSINESS');

    input('food.organization_url', 'https://www.example.com/');

    nextPageOrSubmit();

    checkTag();

    cy.get(getByName('description')).type('Cypress Test Food Description');
    selectEntryType();

    autocompleteInput('food.food_type', 'Perishable');
    autocompleteInput('food.distribution_type', 'Delivery');

    cy.get(GUIDELINES_TEXTAREA).focus();
    cy.get(GUIDELINES_TEXTAREA).type(
      'Cypress Test Long Enough To See Behind the Nav Overlay'
    );

    nextPageOrSubmit();

    expectFormWasSubmitted();
  });

  it('should successfully submit a foraging site for testing', () => {
    selectResource('FORAGE');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    autocompleteInput('forage.forage_type', 'Nut');

    nextPageOrSubmit();

    checkTag('Medicinal');
    cy.get(GUIDELINES_TEXTAREA).type('Cypress Test');

    nextPageOrSubmit();

    expectFormWasSubmitted();
  });

  it('should successfully submit a bathroom site for testing', () => {
    selectResource('BATHROOM');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    nextPageOrSubmit();

    checkTag();

    cy.get(GUIDELINES_TEXTAREA).type('Cypress Test');

    nextPageOrSubmit();

    expectFormWasSubmitted();
  });
});
