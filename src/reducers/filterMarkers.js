import { CITY_HALL_COORDINATES } from 'constants/defaults';
import * as actions from '../actions/actions';
import { WATER_RESOURCE_TYPE } from '../types/ResourceEntry';

const initialState = {
  mapCenter: {
    lat: parseFloat(CITY_HALL_COORDINATES.latitude),
    lng: parseFloat(CITY_HALL_COORDINATES.longitude)
  },
  // Change to reflect user's current location
  userLocation: {
    lat: parseFloat(CITY_HALL_COORDINATES.latitude),
    lng: parseFloat(CITY_HALL_COORDINATES.longitude)
  },
  showingInfoWindow: false,
  infoIsExpanded: false,
  infoWindowClass: 'info-window-out-desktop',
  filterTags: [],
  filterEntry: "",
  /** @type {ResourceEntry[]} */
  allResources: [],
  selectedPlace: {},
  toolbarModal: actions.TOOLBAR_MODAL_NONE,
  searchBarMapTint: actions.SEARCH_BAR_MAP_TINT_OFF,
  tapInfoOpenedWhileSearchOpen: false,
  resourceType: WATER_RESOURCE_TYPE,
};

export default (state = initialState, act) => {
  switch (act.type) {
    case actions.SET_TOGGLE_STATE:
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          filtered:
            act.toggle === 'filtered'
              ? act.toggleState
              : state.tapFilters.filtered,
          handicap:
            act.toggle === 'handicap'
              ? act.toggleState
              : state.tapFilters.handicap,
          sparkling:
            act.toggle === 'sparkling'
              ? act.toggleState
              : state.tapFilters.sparkling,
          openNow:
            act.toggle === 'openNow'
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
            act.toggle === 'idRequired'
              ? act.toggleState
              : state.foodFilters.idRequired,
          kidOnly:
            act.toggle === 'kidOnly'
              ? act.toggleState
              : state.foodFilters.kidOnly,
          openNow:
            act.toggle === 'openNow'
              ? act.toggleState
              : state.foodFilters.openNow
        }
      };

    case actions.SET_USER_LOCATION:
      return { ...state, userLocation: act.coords };

    case actions.SET_MAP_CENTER:
      return { ...state, mapCenter: act.coords };

    case actions.getResources.fulfilled.type:
      return { ...state, allResources: act.payload };

    case actions.PUSH_NEW_RESOURCE:
      return {
        ...state,
        allResources: [...state.allResources, act.newResource]
      };

    case actions.setFilterFunction.type:
      return { ...state, filterTags: [...state.filterTags, act.payload.tag] }

    case actions.setEntryFilterFunction.type:
      return { ...state, filterEntry: act.payload.tag }

    case actions.removeFilterFunction.type:
      return {
        ...state,
        filterTags: state.filterTags.filter(x => x !== act.payload.tag)
      }

    case actions.removeEntryFilterFunction.type:
      return {
        ...state,
        filterEntry: ''
      }

    case actions.resetFilterFunction.type:
      return {
        ...state,
        filterTags: [],
        filterEntry: ''
      };
    case actions.updateExistingResource.type:
      return {
        ...state,
        allResources: state.allResources.map(resource =>
          resource.id === act.payload.resource.id
            ? act.payload.resource
            : resource
        )
      };

    case actions.SET_SELECTED_PLACE:
      // if passed Selected Place as an object, set selected place as the object
      // if passed an ID, locate the item using ID, then set selected place
      return typeof act.selectedPlace === 'object'
        ? { ...state, selectedPlace: act.selectedPlace }
        : {
          ...state,
          selectedPlace: state.allResources[act.selectedPlace],
          showingInfoWindow: true
        };

    case actions.toggleInfoWindow.type:
      return {
        ...state,
        showingInfoWindow: act.payload.isShown,
        infoWindowClass: act.payload.infoWindowClass,
        searchBarMapTint: act.payload.isShown ? actions.SEARCH_BAR_MAP_TINT_OFF : state.searchBarMapTint
      };
    case actions.toggleInfoWindowClass.type:
      return {
        ...state,
        infoWindowClass: act.payload.infoWindowClass
      };

    case actions.TOGGLE_INFO_EXPANDED:
      return { ...state, infoIsExpanded: act.isExpanded };

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

    case actions.SET_SEARCH_BAR_MAP_TINT:
      return { ...state, searchBarMapTint: act.mode }

    case actions.SET_TAP_INFO_OPENED_WHILE_SEARCH_OPEN:
      return { ...state, tapInfoOpenedWhileSearchOpen: act.trueOrFalse }

    case actions.setToolbarModal.type:
      return { ...state, toolbarModal: act.payload };

    case actions.setResourceType.type:
      return { ...state, resourceType: act.payload };

    default:
      return state;
  }
};
