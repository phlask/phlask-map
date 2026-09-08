import type { ResourceType } from 'types/types.ts';

export const getTestId = (value: string, tag?: keyof HTMLElementTagNameMap) =>
  `${tag || ''}[data-cy=${value}]`;
export const getResourceMarkerByType = (type: ResourceType) =>
  getTestId(`marker-${type}-1`);
export const getMarkerByPosition = (position: `${number},${number}`) =>
  `gmp-advanced-marker[position="${position}"]`;
export const getChooseResourceButtonByType = (type: ResourceType) =>
  getTestId(`button-contribute-${type}`);
export const getByName = (
  name: string,
  tag: keyof HTMLElementTagNameMap = 'input'
) => `${tag}[name="${name}"]`;
export const getInputByPlaceholder = (placeholder: string) =>
  `input[placeholder="${placeholder}"]`;
export const getInputByValue = (value: string) => `input[value="${value}"]`;

export const HEAD_HAMBURGER_BUTTON = getTestId('head-sidebar-button');
export const ABOUT_US_HEAD_BUTTON = getTestId('sidebar-about-button');
export const SELECTED_RESOURCE_MODAL_TITLE = getTestId('tap-organization-name');
export const MOBILE_HEAD_SEARCH_BUTTON = getTestId('mobile-head-search-button');
export const LOGAN_SQUARE_MARKER = getMarkerByPosition(
  '39.9580333,-75.1709604'
);
export const FILTER_MENU_BUTTON = getTestId('button-filter-type-menu');
export const FILTER_SUBMIT_BUTTON = getTestId('filter-submit-button');
export const FILTER_CLEAR_ALL_BUTTON = getTestId('filter-clear-all');

export const RESOURCE_MENU_BUTTON = getTestId('button-resource-type-menu');
export const CONTRIBUTE_MENU_BUTTON = getTestId('button-contribute-type-menu');

export const FORM_RESOURCE_ADDRESS_INPUT = getTestId(
  'form-resource-address-input',
  'input'
);
export const SEARCH_BAR = getInputByPlaceholder('Search for Resources near...');
export const GUIDELINES_TEXTAREA = getByName('guidelines', 'textarea');
