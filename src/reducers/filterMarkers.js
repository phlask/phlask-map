import { SET_TOGGLE_STATE } from "../actions";

const initialState = {
  filtered: false,
  handicap: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOGGLE_STATE:
      if (action.toggle === "filtered") {
      const newState = { ...state, filtered: action.toggleState };
      console.log(newState);

      return newState;}
  }
  return state;
};
