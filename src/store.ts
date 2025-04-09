import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/root.ts';

const store = configureStore({ reducer });

export default store;
