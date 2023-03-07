import { createSlice } from '@reduxjs/toolkit';
import * as actions from '../actions/actions';
import { isMobile } from 'react-device-detect';

const initialState = {
  screenSize: '',
  mapCenter: {
    lat: parseFloat('39.952744'),
    lng: parseFloat('-75.163500')
  },
  // Change to reflect user's current location
  userLocation: {
    lat: parseFloat('39.952744'),
    lng: parseFloat('-75.163500')
  },
  showingInfoWindow: false,
  infoIsExpanded: false,
  infoWindowClass: isMobile ? 'info-window-out' : 'info-window-out-desktop',
  isSearchShown: false,
  isFilterShown: false,
  isResourceMenuShown: false,
  tapFilters: {
    filtered: false,
    handicap: false,
    sparkling: false,
    openNow: false, // reach to this
    accessTypesHidden: []
  },
  foodFilters: {
    idRequired: false,
    kidOnly: false,
    openNow: false,
    accessTypesHidden: []
  },
  allTaps: [],
  allFoodOrgs: [],
  selectedPlace: {},
  phlaskType: actions.PHLASK_TYPE_WATER
};

export const filterSelectorSlice = createSlice({
  name: 'filterSelector',
  initialState,
  reducers: {
    tapFilters: {
      filtered: state => {
        state.tapFilters.filter ? false : true;
      },
      handicap: state => {
        state.tapFilters.handicap ? false : true;
      },
      sparkling: state => {
        state.tapFilters.sparkling ? false : true;
      },
      openNow: state => {
        state.tapFilters.openNow ? false : true;
      }
    },
    foodFilters: {
      idRequired: state => {
        state.foodFilters.idRequired ? false : true;
      },
      kidOnly: state => {
        state.foodFilters.kidOnly ? false : true;
      },
      openNow: state => {
        state.foodFilters.openNow ? false : true;
      }
    }
  }
});
