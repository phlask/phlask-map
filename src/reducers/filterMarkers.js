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
  filters: {
    "tags": [],
  },
  /** @type {ResourceEntry[]} */
  allResources: [],
  selectedPlace: {},
  toolbarModal: actions.TOOLBAR_MODAL_NONE,
  resourceType: WATER_RESOURCE_TYPE,
  isResourceMenuShown: false
};

export default (state = initialState, act) => {
  switch (act.type) {

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

    case actions.SET_FILTER_FUNCTION:
      return { ...state, filters: act.filters };

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
        infoWindowClass: act.payload.infoWindowClass
      };
    case actions.toggleInfoWindowClass.type:
      return {
        ...state,
        infoWindowClass: act.payload.infoWindowClass
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

    case actions.setToolbarModal.type:
      return { ...state, toolbarModal: act.payload };

    // Toggle Phlask type & close the info window
    case actions.toggleResourceType.type:
      return {
        ...state,
        resourceType: act.payload.resourceType,
        infoWindowClass: act.payload.infoWindowClass
      };

    case actions.CHANGE_RESOURCE_TYPE:
      return { ...state, resourceType: act.resourceType };

    case actions.toggleResourceMenu.type:
      return { ...state, isResourceMenuShown: !act.payload.isShown };

    default:
      return state;
  }
};
