import React from 'react';
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER
} from '../../actions/actions';
import { filterTypes } from '../Filter/Filter';
import MapMarkers from './MapMarkers';
import MapMarkersFood from './MapMarkersFood';

const MapMarkersMapper = ({
  phlaskType,
  map,
  google,
  mapCenter,
  filterTags
}) => {
  const marker = {
    [PHLASK_TYPE_WATER]: (
      // Water
      <MapMarkers
        map={map}
        google={google}
        mapCenter={mapCenter}
        filterTags={filterTags ? filterTags[filterTypes.WATER] : null}
      />
    ),
    [PHLASK_TYPE_FOOD]: (
      // Food

      <MapMarkersFood map={map} google={google} mapCenter={mapCenter} />
    ),
    [PHLASK_TYPE_FORAGING]: (
      // TODO: Add Foraging Map Markers
      <></>
    ),
    [PHLASK_TYPE_BATHROOM]: (
      // TODO: Add Bathroom Map Markers
      <></>
    )
  }[phlaskType];

  return marker;
};

export default MapMarkersMapper;
