import * as actions from "../actions/actions";
import { isMobile } from "react-device-detect";

const initialState = {
  screenSize: "",
  mapCenter: {
    lat: parseFloat("39.952744"),
    lng: parseFloat("-75.163500")
  },
  // Change to reflect user's current location
  userLocation: {
    lat: parseFloat("39.952744"),
    lng: parseFloat("-75.163500")
  },
  showingInfoWindow: false,
  infoIsExpanded: false,
  infoWindowClass: isMobile ? "info-window-out" : "info-window-out-desktop",
  isSearchShown: false,
  isFilterShown: false,
  tapFilters: {
    filtered: false,
    handicap: false,
    sparkling: false,
    openNow: false,
    accessTypesHidden: []
  },
  foodFilters: {
    idRequired: false,
    kidOnly: false,
    openNow: false,
    accessTypesHidden: []
  },
  allTaps: [],
  allFoodOrgs: [],
  selectedPlace: {},
  phlaskType: actions.PHLASK_TYPE_WATER
};

export default (state = initialState, act) => {
  switch (act.type) {
    case actions.RESIZE_WINDOW:
      return () => {
        // console.log("Resize: " + act.size);
      };

    case actions.SET_TOGGLE_STATE:
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          filtered:
            act.toggle === "filtered"
              ? act.toggleState
              : state.tapFilters.filtered,
          handicap:
            act.toggle === "handicap"
              ? act.toggleState
              : state.tapFilters.handicap,
          sparkling:
            act.toggle === "sparkling"
              ? act.toggleState
              : state.tapFilters.sparkling,
          openNow:
            act.toggle === "openNow"
              ? act.toggleState
              : state.tapFilters.openNow
        }
      };

    case actions.SET_TOGGLE_STATE_FOOD:
      return {
        ...state,
        foodFilters: {
          ...state.foodFilters,
          idRequired:
            act.toggle === "idRequired"
              ? act.toggleState
              : state.foodFilters.idRequired,
          kidOnly:
            act.toggle === "kidOnly"
              ? act.toggleState
              : state.foodFilters.kidOnly,
          openNow:
            act.toggle === "openNow"
              ? act.toggleState
              : state.foodFilters.openNow
        }
      };

    case actions.SET_USER_LOCATION:
      return { ...state, userLocation: act.coords };

    case actions.SET_MAP_CENTER:
      return { ...state, mapCenter: act.coords };

    case actions.GET_TAPS_SUCCESS:
      return { ...state, allTaps: act.allTaps, filteredTaps: act.allTaps };

    case actions.GET_FOOD_SUCCESS:
      return {
        ...state,
        allFoodOrgs: act.allFoodOrgs,
        filteredOrgs: act.allFoodOrgs
      };

    case actions.SET_FILTER_FUNCTION:
      console.log("set filter func");
      return { filterFunction: !state.filterFunction, ...state };

    case actions.TOGGLE_SEARCH_BAR:
      // console.log('Seach Bar Shown: ' + act.isShown);
      return { ...state, isSearchShown: act.isShown };
    
    case actions.TOGGLE_FILTER_MODAL:
      return { ...state, isFilterShown: act.isShown };

    case actions.SET_SELECTED_PLACE:
      // console.log('Selected Place: ' + act.selectedPlace.organization);
      // console.log(state.alltaps[act.id]);

      // if passed Selected Place as an object, set selected place as the object
      // if passed an ID, locate the item using ID, then set selected place
      return typeof act.selectedPlace === "object"
        ? { ...state, selectedPlace: act.selectedPlace }
        : {
            ...state,
            selectedPlace:
              state.phlaskType === actions.PHLASK_TYPE_WATER
                ? state.allTaps[act.selectedPlace]
                : state.allFoodOrgs[act.selectedPlace],
            showingInfoWindow: true
          };

    case actions.TOGGLE_INFO_WINDOW:
      // console.log('Info Window Class: ' + state.infoWindowClass);

      return act.isShown
        ? {
            ...state,
            showingInfoWindow: act.isShown,
            infoWindowClass: isMobile
              ? "info-window-in"
              : "info-window-in-desktop"
          }
        : { ...state, showingInfoWindow: act.isShown };

    case actions.TOGGLE_INFO_WINDOW_CLASS:
      console.log("Info Window Class: " + state.infoWindowClass);
      console.log("Is Mobile: " + isMobile);

      return {
        ...state,
        infoWindowClass: isMobile
          ? act.isShown
            ? "info-window-in"
            : "info-window-out"
          : act.isShown
          ? "info-window-in-desktop"
          : "info-window-out-desktop"
      };

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
        },
        foodFilters: {
          foodSite: false,
          school: false,
          charter: false,
          pha: false,
          idRequired: false,
          kidOnly: false,
          openNow: false,
          accessTypesHidden: []
        }
      };

    case actions.SET_FILTERED_TAP_TYPES: {
      let currentAccessTypesHidden = [...state.tapFilters.accessTypesHidden];
      if (currentAccessTypesHidden.includes(act.tapType)) {
        currentAccessTypesHidden = currentAccessTypesHidden.filter(
          tapType => tapType !== act.tapType
        );
      } else {
        currentAccessTypesHidden.push(act.tapType);
      }
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          accessTypesHidden: currentAccessTypesHidden
        }
      };
    }
    case actions.SET_FILTERED_FOOD_TYPES: {
      let currentAccessTypesHidden = [...state.foodFilters.accessTypesHidden];
      if (currentAccessTypesHidden.includes(act.foodType)) {
        currentAccessTypesHidden = currentAccessTypesHidden.filter(
          foodType => foodType !== act.foodType
        );
      } else {
        currentAccessTypesHidden.push(act.foodType);
      }
      return {
        ...state,
        foodFilters: {
          ...state.foodFilters,
          accessTypesHidden: currentAccessTypesHidden
        }
      };
    }

    // Toggle Phlask type & close the info window
    case actions.TOGGLE_PHLASK_TYPE:
      return {
        ...state,
        phlaskType: act.mode,
        infoWindowClass:
          act.mode !== state.showingInfoWindow
            ? isMobile
              ? "info-window-out"
              : "info-window-out-desktop"
            : state.infoWindowClass
      };

    default:
      return state;
  }
};
