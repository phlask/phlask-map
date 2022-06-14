import thunk from "redux-thunk";
import filterMarkers from "./reducers/filterMarkers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: filterMarkers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware([thunk]),
});

export default store;
