import * as actions from "../actions";
import { isMobile } from 'react-device-detect'

const initialState = {
  mapCenter: {
    lat: parseFloat("39.952744"),
    lng: parseFloat("-75.163500")
  },
  showingInfoWindow: false ,
  infoIsExpanded: false,
  infoWindowClass: isMobile
    ? 'info-window-out'
    : 'info-window-out-desktop',
  isSearchShown: false,
  tapFilters: {
    filtered: false,
    handicap: false,
    sparkling: false,
    openNow: false,
    accessTypesHidden: []
  },
  allTaps: [],
  allFoodOrgs: [],
  selectedPlace: {}
};

export default (state = initialState, act) => {
  switch (act.type) {
    case actions.SET_TOGGLE_STATE:
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          filtered: act.toggle === "filtered" ? act.toggleState : state.tapFilters.filtered,
          handicap: act.toggle === "handicap" ? act.toggleState : state.tapFilters.handicap,
          sparkling: act.toggle === "sparkling" ? act.toggleState : state.tapFilters.sparkling,
          openNow: act.toggle === "openNow" ? act.toggleState : state.tapFilters.openNow
        }
      }

    case actions.SET_MAP_CENTER:
      console.log(`Lat: ${act.coords.lat} -- Lon: ${act.coords.lng}`);
      
      return { ...state, mapCenter: act.coords}

    case actions.GET_TAPS_SUCCESS:
      return { ...state, allTaps: act.allTaps, filteredTaps: act.allTaps };

    case actions.GET_FOOD_SUCCESS:
      return { ...state, allFoodOrgs: act.allFoodOrgs, 
        // filteredTaps: act.allTaps 
      };

    case actions.SET_FILTER_FUNCTION:
      console.log("set filter func");
      return { filterFunction: !state.filterFunction, ...state };

    case actions.TOGGLE_SEARCH_BAR:
      // console.log('Seach Bar Shown: ' + act.isShown);
      return { ...state, isSearchShown: act.isShown }

    case actions.SET_SELECTED_PLACE:
      // console.log('Selected Place: ' + act.selectedPlace.organization);
      return { ...state, selectedPlace: act.selectedPlace}
      

    case actions.TOGGLE_INFO_WINDOW:
      // console.log('Info Window Class: ' + state.infoWindowClass);
      
      return act.isShown 
        ? {...state, 
            showingInfoWindow: act.isShown, 
            infoWindowClass: isMobile
              ? 'info-window-in'
              : 'info-window-in-desktop'
          }
        :{...state, showingInfoWindow: act.isShown}

    case actions.TOGGLE_INFO_WINDOW_CLASS:
      console.log('Info Window Class: ' + state.infoWindowClass);
      console.log('Is Mobile: ' + isMobile);
      
      return {...state, 
        infoWindowClass: isMobile
          ? act.isShown
            ? 'info-window-in'
            : 'info-window-out'
          : act.isShown
            ? 'info-window-in-desktop'
            : 'info-window-out-desktop'
      }

    case actions.TOGGLE_INFO_EXPANDED:
      return { ...state, infoIsExpanded: act.isExpanded };
    
    case actions.RESET_FILTER_FUNCTION:
      return {
        ...state,
        tapFilters: {
          accessTypesHidden: [],
          filtered: false,
          handicap: false,
          sparkling: false,
          openNow: false
        }
      }
    
    case actions.SET_FILTERED_TAP_TYPES:
      var currentAccessTypesHidden = [...state.tapFilters.accessTypesHidden];
      if (currentAccessTypesHidden.includes(act.tapType)) {
        currentAccessTypesHidden = currentAccessTypesHidden.filter(tapType => tapType !== act.tapType)
      }
      else {
        currentAccessTypesHidden.push(act.tapType)
      }
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          accessTypesHidden: currentAccessTypesHidden
        }
      }
    
    default:
      return state;
  }
};
