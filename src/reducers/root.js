import { combineReducers } from '@reduxjs/toolkit';
import filterMarkers from './filterMarkers';
import contributors from './contributors';
import userData from './user';

const reducer = combineReducers({ filterMarkers, contributors, userData });

export default reducer;
