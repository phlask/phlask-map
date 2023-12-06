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
  let marker = null;
  switch (phlaskType) {
    case PHLASK_TYPE_WATER:
      marker = (
        <MapMarkers
          map={map}
          google={google}
          mapCenter={mapCenter}
          filterTags={filterTags}
          filterType={filterTypes.WATER}
        />
      );
      break;
    case PHLASK_TYPE_FOOD:
      marker = (
        <MapMarkersFood map={map} google={google} mapCenter={mapCenter} />
      );
      break;
    case PHLASK_TYPE_FORAGING:
      break;
    case PHLASK_TYPE_BATHROOM:
      break;
  }
  return marker;
};

export default MapMarkersMapper;
