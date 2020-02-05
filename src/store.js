import { createStore } from "redux";
import filterMarkers from "./reducers/filterMarkers";

const store = createStore(filterMarkers);

export default store;
