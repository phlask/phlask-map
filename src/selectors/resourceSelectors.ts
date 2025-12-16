import type { RootState } from 'reducers/root';

export const getAllResources = (state: RootState) =>
  state.filterMarkers.allResources;
