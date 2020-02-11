import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import filterMarkers from "./reducers/filterMarkers";

const store = createStore(filterMarkers, applyMiddleware(thunk));

export default store;
