import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import filterMarkers from "./reducers/filterMarkers";

// const actionSanitizer = (action) =>
// action.type === "GET_TAPS_SUCCESS" && action.data
// ? { ...action, data: "<<LONG_BLOB>>" }
// : action;

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
    // actionSanitizer,
    // stateSanitizer: (state) =>
    // state.data ? { ...state, data: "<<LONG_BLOB>>" } : state,
  }) || compose;

const store = createStore(
  filterMarkers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
