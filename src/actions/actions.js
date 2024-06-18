import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
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

export const GET_RESOURCES_SUCCESS = 'GET_RESOURCES_SUCCESS';
export const getResourcesSuccess = allResources => ({
  type: GET_RESOURCES_SUCCESS,
  allResources
});

export const getResources = () => dispatch => {
  const app = initializeApp(resourcesConfig);
  const database = getDatabase(app);
  return process.env.REACT_APP_CYPRESS_TEST ? dispatch(getResourcesSuccess(testData)) : onValue(ref(database, '/'),
    snapshot => {
      dispatch(getResourcesSuccess(snapshot.val()));
    },
    { onlyOnce: true }
  );
};

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

// export const TOGGLE_SEARCH_BAR = 'TOGGLE_SEARCH_BAR';
// export const toggleSearchBar = isShown => ({
//   type: TOGGLE_SEARCH_BAR,
//   isShown
// });

// export const TOGGLE_FILTER_MODAL = 'TOGGLE_FILTER_MODAL';
// export const toggleFilterModal = isShown => ({
//   type: TOGGLE_FILTER_MODAL,
//   isShown
// });

export const TOGGLE_INFO_WINDOW = 'TOGGLE_INFO_WINDOW';
export const toggleInfoWindow = isShown => ({
  type: TOGGLE_INFO_WINDOW,
  isShown
});

export const TOGGLE_INFO_WINDOW_CLASS = 'TOGGLE_INFO_WINDOW_CLASS';
export const toggleInfoWindowClass = isShown => ({
  type: TOGGLE_INFO_WINDOW_CLASS,
  isShown
});

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

export const SET_TOOLBAR_MODAL = 'SET_TOOLBAR_MODAL';
export const setToolbarModal = toolbarModal => ({
  type: SET_TOOLBAR_MODAL,
  mode: toolbarModal
});

export const TOOLBAR_MODAL_NONE = 'TOOLBAR_MODAL_NONE';
export const TOOLBAR_MODAL_RESOURCE = 'TOOLBAR_MODAL_RESOURCE';
export const TOOLBAR_MODAL_FILTER = 'TOOLBAR_MODAL_FILTER';
export const TOOLBAR_MODAL_SEARCH = 'TOOLBAR_MODAL_SEARCH';
export const TOOLBAR_MODAL_CONTRIBUTE = 'TOOLBAR_MODAL_CONTRIBUTE';

export const TOGGLE_RESOURCE_TYPE = 'TOGGLE_RESOURCE_TYPE';
export const toggleResourceType = resourceType => ({
  type: TOGGLE_RESOURCE_TYPE,
  mode: resourceType
});

export const TOGGLE_RESOURCE_MENU = 'TOGGLE_RESOURCE_MENU';
export const toggleResourceMenu = isShown => ({
  type: TOGGLE_RESOURCE_MENU,
  isShown
});

export const CHANGE_RESOURCE_TYPE = 'CHANGE_RESOURCE_TYPE';
export const changeResourceType = resourceType => ({
  type: CHANGE_RESOURCE_TYPE,
  resourceType
});
