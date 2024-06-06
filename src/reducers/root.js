import { combineReducers } from '@reduxjs/toolkit';
import filterMarkers from './filterMarkers';
import contributors from './contributors';

const reducer = combineReducers({ filterMarkers, contributors });

export default reducer;
