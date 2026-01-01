import { Map, Marker, useMap } from '@vis.gl/react-google-maps';
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
import useResourceType, { ResourceType } from 'hooks/useResourceType';
import useSelectedResource from 'hooks/useSelectedResource';
import useGetResourcesQuery from 'hooks/queries/useGetResourcesQuery';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';
import useActiveFilters from 'hooks/useActiveFilters';
import { useActiveSearchLocationContext } from 'contexts/ActiveSearchMarkerContext';

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
  const { resourceType } = useResourceType();
  const { data: userLocation } = useGetUserLocationQuery();
  const { activeSearchLocation } = useActiveSearchLocationContext();

  const { activeFilters } = useActiveFilters();

  const map = useMap();

  const { data: resources } = useGetResourcesQuery({
    resourceType,
    filters: activeFilters
  });

  useEffect(() => {
    if (!map) {
      return;
    }
    if (!userLocation) {
      return;
    }

    map.panTo({ lat: userLocation.latitude, lng: userLocation.longitude });
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
          <Marker
            key={resource.id}
            onClick={() => onMarkerClick(resource)}
            position={{ lat: resource.latitude, lng: resource.longitude }}
            icon={{ url: getMarkerIconSrc(resource) || '' }}
            // This is used for marker targeting as we are unable to add custom properties with this library.
            // We should eventually replace this so that we can still enable the use of screen readers in the future.
            title={`data-cy-${index}`}
          />
        );
      })}

      {activeSearchLocation ? (
        <Marker position={activeSearchLocation} title="data-cy-search-result" />
      ) : null}
    </Map>
  );
};

export default ReactGoogleMaps;
