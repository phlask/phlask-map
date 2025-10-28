import { createReducer } from '@reduxjs/toolkit';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import * as actions from 'actions/actions';
import { type ResourceEntry, WATER_RESOURCE_TYPE } from 'types/ResourceEntry';

type FilterMarkersState = {
  userLocation: google.maps.LatLngLiteral;
  showingInfoWindow: boolean;
  infoIsExpanded: boolean;
  infoWindowClass: string;
  filterTags: string[];
  filterEntry: string;
  allResources: ResourceEntry[];
  selectedPlace: ResourceEntry | null;
  toolbarModal: string;
  resourceType: 'WATER' | 'FOOD' | 'FORAGE' | 'BATHROOM';
};

const initialState: FilterMarkersState = {
  // Changes to reflect user's current location if location is enabled
  userLocation: {
    lat: CITY_HALL_COORDINATES.latitude,
    lng: CITY_HALL_COORDINATES.longitude
  },
  showingInfoWindow: false,
  infoIsExpanded: false,
  infoWindowClass: 'info-window-out-desktop',
  filterTags: [],
  filterEntry: '',
  allResources: [],
  selectedPlace: null,
  toolbarModal: actions.TOOLBAR_MODAL_NONE,
  resourceType: WATER_RESOURCE_TYPE
};

const filterMarkersReducer = createReducer(initialState, builder => {
  builder.addCase(actions.pushNewResource, (state, action) => {
    state.allResources.push(action.payload);
  });
  builder.addCase(actions.getResources.fulfilled, (state, action) => {
    state.allResources = action.payload;
  });
  builder.addCase(actions.setFilterFunction, (state, action) => {
    state.filterTags.push(action.payload.tag);
  });
  builder.addCase(actions.removeFilterFunction, (state, action) => {
    state.filterTags.filter(x => x !== action.payload.tag);
  });
  builder.addCase(actions.setEntryFilterFunction, (state, action) => {
    state.filterEntry = action.payload.tag;
  });
  builder.addCase(actions.removeEntryFilterFunction, state => {
    state.filterEntry = '';
  });
  builder.addCase(actions.resetFilterFunction, state => {
    state.filterTags = [];
    state.filterEntry = '';
  });
  builder.addCase(actions.updateExistingResource, (state, action) => {
    state.allResources.findIndex(resource => resource.id === action.payload.id);
  });
  builder.addCase(actions.setSelectedPlace, (state, action) => {
    state.selectedPlace = action.payload;
    state.showingInfoWindow = true;
  });
  builder.addCase(actions.toggleInfoWindow, (state, action) => {
    state.showingInfoWindow = action.payload.isShown;
    state.infoWindowClass = action.payload.infoWindowClass;
  });
  builder.addCase(actions.toggleInfoWindowClass, (state, action) => {
    state.infoWindowClass = action.payload.infoWindowClass;
  });
  builder.addCase(actions.toggleInfoExpanded, (state, action) => {
    state.infoIsExpanded = action.payload;
  });
  builder.addCase(actions.setToolbarModal, (state, action) => {
    state.toolbarModal = action.payload;
  });
  builder.addCase(actions.setResourceType, (state, action) => {
    state.resourceType = action.payload;
  });
});
export default filterMarkersReducer;
