import { AdvancedMarker, Map, useMap } from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import { type CSSProperties, useEffect } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import PinWaterActive from 'components/icons/PinWaterActive';
import PinForagingActive from 'components/icons/PinForagingActive';
import PinFoodActive from 'components/icons/PinFoodActive';
import PinBathroomActive from 'components/icons/PinBathroomActive';
import phlaskMarkerIconV2 from 'components/icons/PhlaskMarkerIconV2';
import { type ResourceEntry } from 'types/ResourceEntry';
import { ResourceType } from 'hooks/useResourceType';
import useSelectedResource from 'hooks/useSelectedResource';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';
import { useActiveSearchLocationContext } from 'contexts/ActiveSearchMarkerContext';
import { IconButton } from '@mui/material';
import useActiveResources from 'hooks/useActiveResources';

const style: CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 1,
  touchAction: 'none'
};

const ReactGoogleMaps = () => {
  const isMobile = useIsMobile();
  const posthog = usePostHog();
  const { selectedResource, setSelectedResource } = useSelectedResource();
  const { data: userLocation } = useGetUserLocationQuery();
  const { activeSearchLocation } = useActiveSearchLocationContext();

  const map = useMap();

  const { data: resources } = useActiveResources();

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!userLocation) {
      return;
    }

    map.panTo(userLocation);
  }, [userLocation, map]);

  // toggle window goes here
  const onMarkerClick = (resource: ResourceEntry) => {
    setSelectedResource(resource);

    if (!map) {
      return;
    }

    map.panTo({
      lat: resource.latitude,
      lng: resource.longitude
    });

    posthog.capture('LocationClicked', {
      resourceType: resource.resource_type,
      name: resource.name,
      address: resource.address
    });
  };

  const getMarkerIconSrc = (resource: ResourceEntry) => {
    const isActiveMarker = selectedResource === resource.id;

    if (!isActiveMarker) {
      return phlaskMarkerIconV2(resource.resource_type, 56, 56);
    }
    return {
      [ResourceType.WATER]: PinWaterActive(),
      [ResourceType.FOOD]: PinFoodActive(),
      [ResourceType.FORAGE]: PinForagingActive(),
      [ResourceType.BATHROOM]: PinBathroomActive()
    }[resource.resource_type];
  };

  return (
    <Map
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
      {resources?.map((resource, index) => {
        return (
          <IconButton
            onClick={() => onMarkerClick(resource)}
            key={resource.id}
            data-cy={`marker-${resource.resource_type}-${index}`}
          >
            <AdvancedMarker
              position={{ lat: resource.latitude, lng: resource.longitude }}
            >
              <img src={getMarkerIconSrc(resource) ?? ''} />
            </AdvancedMarker>
          </IconButton>
        );
      })}
      {userLocation ? <AdvancedMarker position={userLocation} /> : null}

      {activeSearchLocation ? (
        <AdvancedMarker position={activeSearchLocation} />
      ) : null}
    </Map>
  );
};

export default ReactGoogleMaps;
