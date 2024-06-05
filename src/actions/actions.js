import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import {
  bathroomConfig,
  foodConfig,
  foragingConfig,
  waterConfig
} from '../firebase/firebaseConfig';
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

/* User should select which type ( food or water) to display before retrieving data.
  First choice would be set as default
*/

export const GET_TAPS_SUCCESS = 'GET_TAPS_SUCCESS';
export const getTapsSuccess = allTaps => ({
  type: GET_TAPS_SUCCESS,
  allTaps
});

export const getTaps = () => dispatch => {
  const app = initializeApp(waterConfig, 'water');
  const database = getDatabase(app);
  return process.env.REACT_APP_CYPRESS_TEST ? dispatch(getTapsSuccess(testData)) : onValue(ref(database, '/'),
    snapshot => {
      const snapshotVal = snapshot.val();
      // TODO: Clean up Firebase DB for this one-off edge case
      // NOTE: The code block below is filtering out tap with access-types that are no longer used
      var allTaps = snapshotVal.filter(
        key =>
          key.access != 'WM' &&
          key.access != 'N' &&
          key.access != 'TrashAcademy'
      );
      dispatch(getTapsSuccess(allTaps));
    },
    {
      onlyOnce: true
    }
  );
};

export const GET_FOOD_SUCCESS = 'GET_FOOD_SUCCESS';
export const getFoodSuccess = allFoodOrgs => ({
  type: GET_FOOD_SUCCESS,
  allFoodOrgs
});

export const getFoodOrgs = () => dispatch => {
  const app = initializeApp(foodConfig, 'food');
  const database = getDatabase(app);
  return onValue(ref(database, '/'), snapshot => {
    const snapshotVal = snapshot.val();
    dispatch(getFoodSuccess(snapshotVal));
  });
};

export const GET_FORAGING_SUCCESS = 'GET_FORAGING_SUCCESS';
export const getForagingSuccess = allForagingTaps => ({
  type: GET_FORAGING_SUCCESS,
  allForagingTaps
});

export const getForagingTaps = () => dispatch => {
  const app = initializeApp(foragingConfig, 'foraging');
  const database = getDatabase(app);
  return onValue(ref(database, '/'), snapshot => {
    const snapshotVal = snapshot.val();
    dispatch(getForagingSuccess(snapshotVal));
  });
};

export const GET_BATHROOM_SUCCESS = 'GET_BATHROOM_SUCCESS';
export const getBathroomSuccess = allBathroomTaps => ({
  type: GET_BATHROOM_SUCCESS,
  allBathroomTaps
});

export const getBathroomTaps = () => dispatch => {
  const app = initializeApp(bathroomConfig, 'bathroom');
  const database = getDatabase(app);

  return onValue(ref(database, '/'), snapshot => {
    const snapshotVal = snapshot.val();
    dispatch(getBathroomSuccess(snapshotVal));
  });
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

export const TOGGLE_PHLASK_TYPE = 'TOGGLE_PHLASK_TYPE';
export const togglePhlaskType = phlaskType => ({
  type: TOGGLE_PHLASK_TYPE,
  mode: phlaskType
});

// export const TOGGLE_RESOURCE_MENU = 'TOGGLE_RESOURCE_MENU';
// export const toggleResourceMenu = isShown => ({
//   type: TOGGLE_RESOURCE_MENU,
//   isShown
// });

export const CHANGE_PHLASK_TYPE = 'CHANGE_PHLASK_TYPE';
export const changePhlaskType = phlaskType => ({
  type: CHANGE_PHLASK_TYPE,
  phlaskType
});

export const PHLASK_TYPE_NONE = 'PHLASK_TYPE_NONE';
export const PHLASK_TYPE_WATER = 'PHLASK_TYPE_WATER';
export const PHLASK_TYPE_FOOD = 'PHLASK_TYPE_FOOD';
export const PHLASK_TYPE_FORAGING = 'PHLASK_TYPE_FORAGING';
export const PHLASK_TYPE_BATHROOM = 'PHLASK_TYPE_BATHROOM';
