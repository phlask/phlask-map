// Mobile crowd-sourcing form tests
// Tests form submission functionality for all resource types on mobile devices

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
} from '../../utils/crowdsourcing.ts';

describe('crowdsourcing form', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport('iphone-x');
    openContributeMenu();

    interceptResourceSubmitRequest();
  });

  it('should successfully submit a water site', () => {
    selectResource('water');
    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    autocompleteInput('water.dispenser_type', 'Sink');

    checkTag();
    cy.get('textarea[name="guidelines"]').type('Cypress Test');

    nextPageOrSubmit('submit-resource-mobile');

    expectFormWasSubmitted('Thanks for sharing!');
  });

  it('should successfully submit a food site', () => {
    selectResource('food');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('food.organization_name', 'Test organization');
    selectInput('select-organization-type', 'BUSINESS');

    input('food.organization_url', 'https://www.example.com/');

    checkTag();

    cy.get('input[name="description"]').type('Cypress Test Food Description');
    selectEntryType();

    autocompleteInput('food.food_type', 'Perishable');
    autocompleteInput('food.distribution_type', 'Delivery');

    cy.get('textarea[name="guidelines"]').focus();
    cy.get('textarea[name="guidelines"]').type(
      'Cypress Test Long Enough To See Behind the Nav Overlay'
    );

    nextPageOrSubmit('submit-resource-mobile');

    expectFormWasSubmitted('Thanks for sharing!');
  });

  it('should successfully submit a foraging site', () => {
    selectResource('foraging');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    autocompleteInput('forage.forage_type', 'Nut');

    checkTag('Medicinal');
    cy.get('textarea[name="guidelines"]').type('Cypress Test');

    nextPageOrSubmit('submit-resource-mobile');

    expectFormWasSubmitted('Thanks for sharing!');
  });

  it('should successfully submit a bathroom site', () => {
    selectResource('bathroom');

    input('name', 'Cypress Test Name');
    selectAddress();

    input('description', 'Cypress Test Description');
    selectEntryType();

    checkTag();

    cy.get('textarea[name="guidelines"]').type('Cypress Test');

    nextPageOrSubmit('submit-resource-mobile');

    expectFormWasSubmitted('Thanks for sharing!');
  });
});
