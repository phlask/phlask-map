import { createSelector } from 'reselect';

const getTapFilters = state => state.filterMarkers.foragingFilters;

const getTaps = state => state.filterMarkers.allForagingTaps;

const selectVisibleForagingTaps = createSelector(
  [getTapFilters, getTaps],
  (_tapFilters, allTaps) => {
    let filteredTaps = allTaps;

    // TODO: apply filters
    return filteredTaps;
  }
);

export default selectVisibleForagingTaps;
