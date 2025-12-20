import { combineReducers } from '@reduxjs/toolkit';
import toolbar from './toolbar';
import user from './user';

const reducer = combineReducers({ toolbar, user });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
