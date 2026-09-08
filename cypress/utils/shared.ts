import type { ResourceType } from 'types/types.ts';
import { getTestId } from './selectors.ts';

export const selectResourceFromMenu = (type: ResourceType) => {
  cy.get(getTestId(`button-${type}-data-selector`)).click();
};
