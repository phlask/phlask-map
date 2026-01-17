import { ResourceType } from 'types/types.ts';
import {
  getResourceMarkerByType,
  SELECTED_RESOURCE_MODAL_TITLE
} from './selectors.ts';

export const waitForResourcesToLoad = () => {
  cy.wait('@getResourcesRequest', { timeout: 6000, responseTimeout: 6000 });
};

export const selectMarker = (type: ResourceType) => {
  const markerId = getResourceMarkerByType(type);
  cy.get(markerId).should('exist');
  // You're not wrong, we're clicking this bastard three times
  // At least one of the times we click should work
  cy.get(markerId).click({
    force: true,
    waitForAnimations: true,
    timeout: 6000
  });
  cy.get(markerId, { timeout: 6000 }).click({
    force: true,
    waitForAnimations: true,
    timeout: 6000
  });
  cy.get(markerId, { timeout: 6000 }).click({
    force: true,
    waitForAnimations: true,
    timeout: 6000
  });
  cy.location('search').should('include', 'r=');
  cy.wait('@resourceByIdRequest', { timeout: 6000 });
};

export const verifyResourceIsShown = () => {
  cy.location('search').should('include', 'r=');
  cy.get(SELECTED_RESOURCE_MODAL_TITLE, { timeout: 6000 }).should('exist');
};
