import thunk from 'redux-thunk';
import reducer from './reducers/root';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware([thunk])
});

export default store;
