import * as firebase from "firebase";

export const SET_TOGGLE_STATE = "SET_TOGGLE_STATE";
export const setToggleState = (toggle, toggleState) => ({
  type: SET_TOGGLE_STATE,
  toggle,
  toggleState
});

export const SET_FILTER_FUNCTION = "SET_FILTER_FUNCTION";
export const setFilterFunction = () => ({
  type: SET_FILTER_FUNCTION
});

export const GET_TAPS_SUCCESS = "GET_TAPS_SUCCESS";
export const getTapsSuccess = allTaps => ({
  type: GET_TAPS_SUCCESS,
  allTaps
});

export const getTaps = () => dispatch => {
  return firebase
    .database()
    .ref("/")
    .once("value")
    .then(snapshot => {
      var allTaps = [];
      var item;
      for (item in snapshot.val()) {
        if (snapshot.val()[item].access === "WM") {
          continue;
        }
        if (snapshot.val()[item].active === "N") {
          continue;
        }
        if (snapshot.val()[item].access === "TrashAcademy") {
          continue;
        }
        allTaps.push(snapshot.val()[item]);
      }
      dispatch(getTapsSuccess(allTaps));
    });
};

export const TOGGLE_SEARCH_BAR = 'TOGGLE_SEARCH_BAR'
export const toggleSearchBar = (isShown) => ({
    type: TOGGLE_SEARCH_BAR,
    isShown
})

export const TOGGLE_INFO_WINDOW = 'TOGGLE_INFO_WINDOW'
export const toggleInfoWindow = (isShown) => ({
    type: TOGGLE_INFO_WINDOW,
    isShown
})

export const TOGGLE_INFO_WINDOW_IN = 'TOGGLE_INFO_WINDOW_IN'
export const toggleInfoWindowIn = (isShown) => ({
    type: TOGGLE_INFO_WINDOW_IN,
    isShown
})

export const TOGGLE_INFO_EXPANDED = 'TOGGLE_INFO_EXPANDED'
export const toggleInfoExpanded = (isExpanded) => ({
  type: TOGGLE_INFO_EXPANDED,
  isExpanded
})
export const SET_FILTERED_TAP_TYPES = "SET_FILTERED_TAP_TYPES";
  export const setFilteredTapTypes = tapType => ({
    type: SET_FILTERED_TAP_TYPES,
    tapType
  }); 

export const SET_SELECTED_PLACE = "SET_SELECTED_PLACE"
export const setSelectedPlace = selectedPlace => ({
  type: SET_SELECTED_PLACE,
  selectedPlace
})