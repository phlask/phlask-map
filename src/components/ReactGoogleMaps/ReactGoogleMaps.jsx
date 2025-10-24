import { Fade } from '@mui/material';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import Stack from '@mui/material/Stack';
import {
  toggleInfoWindow,
  getResources,
  setSelectedPlace,
  setFilterFunction,
  resetFilterFunction,
  removeFilterFunction,
  removeEntryFilterFunction,
  setEntryFilterFunction
} from 'actions/actions';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedTap from 'components/SelectedTap/SelectedTap';
import AddResourceModalV2 from 'components/AddResourceModal/AddResourceModalV2';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import Filter from 'components/Filter/Filter';
import Toolbar from 'components/Toolbar/Toolbar';
import PinWaterActive from 'components/icons/PinWaterActive';
import PinForagingActive from 'components/icons/PinForagingActive';
import PinFoodActive from 'components/icons/PinFoodActive';
import PinBathroomActive from 'components/icons/PinBathroomActive';
import phlaskMarkerIconV2 from 'components/icons/PhlaskMarkerIconV2';
import selectFilteredResource from 'selectors/resourceSelectors';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';
import { getUserLocation } from 'reducers/user';

import styles from './ReactGoogleMaps.module.scss';

function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const style = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 1
};

const ReactGoogleMaps = ({ searchedTap }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const posthog = usePostHog();
  const filteredResources = useSelector(state => selectFilteredResource(state));
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const selectedPlace = useSelector(state => state.filterMarkers.selectedPlace);
  const userLocation = useSelector(getUserLocation);

  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }
    map.panTo({ lat: userLocation.latitude, lng: userLocation.longitude });
  }, [userLocation, map]);

  // toggle window goes here
  const onMarkerClick = resource => {
    dispatch(
      toggleInfoWindow({
        isShown: true,
        infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
      })
    );

    map.panTo({
      lat: resource.latitude,
      lng: resource.longitude
    });
    dispatch(setSelectedPlace(resource));

    posthog.capture('LocationClicked', {
      resourceType: resource.resource_type,
      name: resource.name,
      address: resource.address
    });
  };

  return (
    <Map
      className={styles.mapContainer}
      style={style}
      defaultZoom={16}
      zoomControl={!isMobile}
      streetViewControl={false}
      mapTypeControl={false}
      rotateControl={false}
      fullscreenControl={false}
      defaultCenter={{
        lat: CITY_HALL_COORDINATES.latitude,
        lng: CITY_HALL_COORDINATES.longitude
      }}
      mapId="DEMO_MAP_ID"
    >
      {filteredResources.map((resource, index) => {
        const getPinUrl = () => {
          const isActiveMarker =
            selectedPlace?.latitude === resource.latitude &&
            selectedPlace?.longitude === resource.longitude;

          if (!resource.resource_type) {
            return null;
          }

          if (!isActiveMarker) {
            return phlaskMarkerIconV2(resource.resource_type, 56, 56);
          }
          return {
            [WATER_RESOURCE_TYPE]: PinWaterActive(),
            [FOOD_RESOURCE_TYPE]: PinFoodActive(),
            [FORAGE_RESOURCE_TYPE]: PinForagingActive(),
            [BATHROOM_RESOURCE_TYPE]: PinBathroomActive()
          }[resource.resource_type];
        };

        return (
          <Marker
            key={resource.id}
            onClick={() => onMarkerClick(resource)}
            position={{ lat: resource.latitude, lng: resource.longitude }}
            icon={{ url: getPinUrl() }}
            // This is used for marker targeting as we are unable to add custom properties with this library.
            // We should eventually replace this so that we can still enable the use of screen readers in the future.
            title={`data-cy-${index}`}
          />
        );
      })}

      {searchedTap ? (
        <Marker
          name="Your Search Result"
          position={searchedTap}
          title="data-cy-search-result"
        />
      ) : null}
    </Map>
  );
};

export default ReactGoogleMaps;
