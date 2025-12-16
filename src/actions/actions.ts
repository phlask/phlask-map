import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { ResourceEntry } from 'types/ResourceEntry';

import testData from 'testData/functionalTest';
import { getResources as getResourcesFromDB } from 'db';

export const setFilterFunction = createAction<{ tag: string }>(
  'SET_FILTER_FUNCTION'
);

export const setEntryFilterFunction = createAction<{ tag: string }>(
  'SET_ENTRY_FILTER_FUNCTION'
);

export const removeFilterFunction = createAction<{ tag: string }>(
  'REMOVE_FILTER_FUNCTION'
);

export const removeEntryFilterFunction = createAction(
  'REMOVE_ENTRY_FILTER_FUNCTION'
);

export const resetFilterFunction = createAction('RESET_FILTER_FUNCTION');

export const getResources = createAsyncThunk<ResourceEntry[]>(
  'fetch-resources',
  async () => {
    if (import.meta.env.VITE_CYPRESS_TEST) return testData;

    return getResourcesFromDB();
  }
);

// Handles the case where a new resource is added from the submission form
export const pushNewResource = createAction<ResourceEntry>('PUSH_NEW_RESOURCE');

// Handles the case where an existing resource is updated from the submission form
export const updateExistingResource = createAction<ResourceEntry>(
  'UPDATE_EXISTING_RESOURCE'
);

export const setSelectedPlace = createAction<ResourceEntry | null>(
  'SET_SELECTED_PLACE'
);

export type ToolbarModalType = `TOOLBAR_MODAL_${
  | 'NONE'
  | 'RESOURCE'
  | 'FILTER'
  | 'SEARCH'
  | 'CONTRIBUTE'}`;

export const setToolbarModal =
  createAction<ToolbarModalType>('SET_TOOLBAR_MODAL');
export const TOOLBAR_MODAL_NONE = 'TOOLBAR_MODAL_NONE';
export const TOOLBAR_MODAL_RESOURCE = 'TOOLBAR_MODAL_RESOURCE';
export const TOOLBAR_MODAL_FILTER = 'TOOLBAR_MODAL_FILTER';
export const TOOLBAR_MODAL_SEARCH = 'TOOLBAR_MODAL_SEARCH';
export const TOOLBAR_MODAL_CONTRIBUTE = 'TOOLBAR_MODAL_CONTRIBUTE';

export type ResourceType = 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM';
