import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  getTaps,
  getFoodOrgs
} from '../../actions/actions';
import MapMarkers from './MapMarkers';
import MapMarkersFood from './MapMarkersFood';
import makeGetVisibleTaps from '../../selectors/foodOrgSelectors';

const MapMarkersMapper = ({
  phlaskType,
  map,
  google,
  mapCenter,
  filterTags
}) => {
  const dispatch = useDispatch();
  const getVisibleTaps = makeGetVisibleTaps();
  const visibleTaps = useSelector(state =>
    getVisibleTaps(state, { phlaskType })
  );
  const allFoodOrgs = useSelector(state => state.allFoodOrgs);

  useEffect(() => {
    switch (phlaskType) {
      case PHLASK_TYPE_WATER:
        dispatch(getTaps());
        break;
      case PHLASK_TYPE_FOOD:
        if (!allFoodOrgs.length) {
          dispatch(getFoodOrgs());
        }
        break;
      case PHLASK_TYPE_FORAGING:
        // dispatch(getForagingTaps());
        break;
      case PHLASK_TYPE_BATHROOM:
        // dispatch(getBathroomTaps());
        break;
    }
  }, [phlaskType, dispatch, allFoodOrgs]);

  let marker = null;
  switch (phlaskType) {
    case PHLASK_TYPE_WATER:
      marker = (
        <MapMarkers
          map={map}
          google={google}
          mapCenter={mapCenter}
          filterTags={filterTags}
          phlaskType={phlaskType}
        />
      );
      break;
    case PHLASK_TYPE_FOOD:
      marker = (
        <MapMarkersFood
          map={map}
          google={google}
          mapCenter={mapCenter}
          visibleTaps={visibleTaps}
        />
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
