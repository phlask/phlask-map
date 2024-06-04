import { createSelector } from 'reselect';

import { hours } from '../helpers/hours';

const getTapFilters = state => state.filterMarkers.bathroomFilters;

const getTaps = state => state.filterMarkers.allBathroomTaps;

const selectVisibleBathroomTaps = createSelector(
  [getTapFilters, getTaps],
  (_tapFilters, allTaps) => {
    let filteredTaps = allTaps;

    // TODO: apply filters
    return filteredTaps;
  }
);

export default selectVisibleBathroomTaps;
