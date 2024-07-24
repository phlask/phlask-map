import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref } from 'firebase/database';
import { resourcesConfig } from '../firebase/firebaseConfig';
import { testData } from '../firebase/functionalTest';

export const SET_TOGGLE_STATE = 'SET_TOGGLE_STATE';
export const setToggleState = (toggle, toggleState) => ({
  type: SET_TOGGLE_STATE,
  toggle,
  toggleState
});

export const SET_TOGGLE_STATE_FOOD = 'SET_TOGGLE_STATE_FOOD';
export const setToggleStateFood = (toggle, toggleState) => ({
  type: SET_TOGGLE_STATE_FOOD,
  toggle,
  toggleState
});

export const SET_FILTER_FUNCTION = 'SET_FILTER_FUNCTION';
export const setFilterFunction = () => ({
  type: SET_FILTER_FUNCTION
});

export const RESET_FILTER_FUNCTION = 'RESET_FILTER_FUNCTION';
export const resetFilterFunction = () => ({
  type: RESET_FILTER_FUNCTION
});

export const getResources = createAsyncThunk(
  'fetch-resources',
  async (_, { dispatch }) => {
    const app = initializeApp(resourcesConfig);
    const database = getDatabase(app);

    if (process.env.REACT_APP_CYPRESS_TEST) return testData;
    const snapshot = await get(ref(database, '/'));
    const results = snapshot.val();
    return Object.values(results) || [];
  }
);

// Handles the case where a new resource is added from the submission form
export const PUSH_NEW_RESOURCE = 'PUSH_NEW_RESOURCE';
export const pushNewResource = newResource => ({
  type: PUSH_NEW_RESOURCE,
  newResource
});

export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const setUserLocation = coords => ({
  type: SET_USER_LOCATION,
  coords
});

export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const setMapCenter = coords => ({
  type: SET_MAP_CENTER,
  coords
});
export const toggleInfoWindow = createAction('TOGGLE_INFO_WINDOW');

export const TOGGLE_INFO_WINDOW_CLASS = 'TOGGLE_INFO_WINDOW_CLASS';
export const toggleInfoWindowClass = createAction('TOGGLE_INFO_WINDOW_CLASS');

export const TOGGLE_INFO_EXPANDED = 'TOGGLE_INFO_EXPANDED';
export const toggleInfoExpanded = isExpanded => ({
  type: TOGGLE_INFO_EXPANDED,
  isExpanded
});
export const SET_FILTERED_TAP_TYPES = 'SET_FILTERED_TAP_TYPES';
export const setFilteredTapTypes = tapType => ({
  type: SET_FILTERED_TAP_TYPES,
  tapType
});
export const SET_FILTERED_FOOD_TYPES = 'SET_FILTERED_FOOD_TYPES';
export const setFilteredFoodTypes = foodType => ({
  type: SET_FILTERED_FOOD_TYPES,
  foodType
});

export const SET_SELECTED_PLACE = 'SET_SELECTED_PLACE';
export const setSelectedPlace = selectedPlace => ({
  type: SET_SELECTED_PLACE,
  selectedPlace
});

export const setToolbarModal = createAction('SET_TOOLBAR_MODAL');

export const TOOLBAR_MODAL_NONE = 'TOOLBAR_MODAL_NONE';
export const TOOLBAR_MODAL_RESOURCE = 'TOOLBAR_MODAL_RESOURCE';
export const TOOLBAR_MODAL_FILTER = 'TOOLBAR_MODAL_FILTER';
export const TOOLBAR_MODAL_SEARCH = 'TOOLBAR_MODAL_SEARCH';
export const TOOLBAR_MODAL_CONTRIBUTE = 'TOOLBAR_MODAL_CONTRIBUTE';

export const toggleResourceType = createAction('TOGGLE_RESOURCE_TYPE');

export const toggleResourceMenu = createAction('TOGGLE_RESOURCE_MENU');

export const CHANGE_RESOURCE_TYPE = 'CHANGE_RESOURCE_TYPE';
export const changeResourceType = resourceType => ({
  type: CHANGE_RESOURCE_TYPE,
  resourceType
});
