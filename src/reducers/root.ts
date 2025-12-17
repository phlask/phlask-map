import { combineReducers } from '@reduxjs/toolkit';
import toolbar from './toolbar';
import contributors from './contributors';
import userData from './user';

const reducer = combineReducers({ toolbar, contributors, userData });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
