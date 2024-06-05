import React from 'react';
import {
  getBathroomTaps,
  getFoodOrgs,
  getForagingTaps,
  getTaps,
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  setSelectedPlace,
  toggleInfoWindow
} from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'google-maps-react';
import FoodMarkerIconV2 from '../icons/FoodMarkerIconV2';
import { phlaskTypeSelector } from '../../selectors/filterMarkersSelectors';
import selectVisibleWaterTaps from '../../selectors/waterSelectors';
import selectVisibleFoodTaps from '../../selectors/foodSelectors';
import PhlaskMarkerIconV2 from '../icons/PhlaskMarkerIconV2';
import selectVisibleBathroomTaps from '../../selectors/bathroomSelectors';
import selectVisibleForagingTaps from '../../selectors/foragingSelectors';
import BathroomMarkerIconV2 from '../icons/BathroomMarkerIconV2';
import ForagingMarkerIconV2 from '../icons/ForagingMarkerIconV2';

const MapMarkers = ({ map, google }) => {
  const dispatch = useDispatch();
  const phlaskType = useSelector(phlaskTypeSelector);
  const visibleFoodTaps = useSelector(selectVisibleFoodTaps);
  const visibleWaterTaps = useSelector(selectVisibleWaterTaps);
  const visibleBathroomTaps = useSelector(selectVisibleBathroomTaps);
  const visibleForagingTaps = useSelector(selectVisibleForagingTaps);

  const onMarkerClick = tap => {
    dispatch(toggleInfoWindow(true));
    dispatch(
      setSelectedPlace({
        ...tap,
        idRequired: tap.id_required === 'yes',
        kidOnly: tap.kid_only === 'yes',
        img: tap.images
      })
    );
    map.panTo({ lat: tap.lat, lng: tap.lon });
  };

  React.useEffect(() => {
    const fetchAction = {
      [PHLASK_TYPE_WATER]: getTaps,
      [PHLASK_TYPE_FOOD]: getFoodOrgs,
      [PHLASK_TYPE_FORAGING]: getForagingTaps,
      [PHLASK_TYPE_BATHROOM]: getBathroomTaps
    }[phlaskType];

    dispatch(fetchAction());
  }, [dispatch, phlaskType]);

  switch (phlaskType) {
    case PHLASK_TYPE_WATER:
      return visibleWaterTaps.map((org, index) => (
        <Marker
          key={index}
          google={google}
          map={map}
          onClick={onMarkerClick}
          position={{ lat: org.lat, lng: org.lon }}
          icon={{ url: PhlaskMarkerIconV2(48, 48) }}
        />
      ));

    case PHLASK_TYPE_FOOD:
      return visibleFoodTaps.map((org, index) => (
        <Marker
          key={index}
          google={google}
          map={map}
          onClick={onMarkerClick}
          position={{ lat: org.lat, lng: org.lon }}
          icon={{ url: FoodMarkerIconV2(48, 48) }}
        />
      ));
    case PHLASK_TYPE_FORAGING:
      return visibleForagingTaps.map((org, index) => (
        <Marker
          key={index}
          google={google}
          map={map}
          onClick={onMarkerClick}
          position={{ lat: org.lat, lng: org.lon }}
          icon={{ url: ForagingMarkerIconV2(48, 48) }}
        />
      ));
    case PHLASK_TYPE_BATHROOM:
      return visibleBathroomTaps.map((org, index) => (
        <Marker
          key={index}
          google={google}
          map={map}
          onClick={onMarkerClick}
          position={{ lat: org.lat, lng: org.lon }}
          icon={{ url: BathroomMarkerIconV2(48, 48) }}
        />
      ));
    default:
      return null;
  }
};

export default MapMarkers;
