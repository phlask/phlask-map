import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/root';

const store = configureStore({
  reducer
});

export default store;
