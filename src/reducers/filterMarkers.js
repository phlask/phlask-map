import * as actions from "../actions";

const initialState = {
  tapFilters: {
    filtered: false,
    handicap: false,
    accessTypesHidden: []
  },
  allTaps: []
};

export default (state = initialState, act) => {
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
      return { ...state, allTaps: act.allTaps };
    
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
      return state
  }
};
