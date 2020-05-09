import * as actions from "../actions";

const initialState = {
  showingInfoWindow: true ,
  infoIsExpanded: false,
  infoWindowIn: 'info-window-out',
  isSearchShown: false,
  tapFilters: {
    filtered: false,
    handicap: false,
    accessTypesHidden: []
  },
  allTaps: [],
  selectedPlace: {}
};

export default (state = initialState, act) => {
  let updatedTaps = [...state.allTaps];
  switch (act.type) {
    case actions.SET_TOGGLE_STATE:
      if (act.toggle === "filtered") {
        const newState = {
          ...state,
          tapFilters: {
            ...state.tapFilters,
            filtered: act.toggleState
          }
        };
        return newState;
      } else if (act.toggle === "handicap"){
        const newState = {
          ...state,
          tapFilters: {
            ...state.tapFilters,
            handicap: act.toggleState
          }
        };
        return newState;
      }
      return state; // If an unknown toggle-type is used, don't change the state.

    case actions.GET_TAPS_SUCCESS:
      return { ...state, allTaps: act.allTaps, filteredTaps: act.allTaps };

    case actions.SET_FILTER_FUNCTION:
      console.log("set filter func");
      return { filterFunction: !state.filterFunction, ...state };

    case actions.TOGGLE_SEARCH_BAR:
      console.log('Seach Bar Shown: ' + act.isShown);
      return { ...state, isSearchShown: act.isShown }

    case actions.SET_SELECTED_PLACE:
      console.log('Selected Place: ' + act.selectedPlace.organization);
      return { ...state, selectedPlace: act.selectedPlace}
      

    case actions.TOGGLE_INFO_WINDOW:
      // console.log('Info Window Class: ' + state.infoWindowIn);
      
      return act.isShown 
        ? {...state, showingInfoWindow: act.isShown, infoWindowIn: 'info-window-in'}
        :{...state, showingInfoWindow: act.isShown}

    case actions.TOGGLE_INFO_WINDOW_IN:
      // console.log('Info Window Class: ' + state.infoWindowIn);
      return {...state, 
        infoWindowIn: act.isShown
          ? 'info-window-in'
          : 'info-window-out'
      }

    case actions.TOGGLE_INFO_EXPANDED:

      return { ...state, allTaps: act.allTaps, infoIsExpanded: act.isExpanded };
    
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
