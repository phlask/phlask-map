import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
} from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import { type CSSProperties } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_LOCATION } from 'constants/defaults';
import PinWaterActive from 'components/icons/PinWaterActive';
import PinForagingActive from 'components/icons/PinForagingActive';
import PinFoodActive from 'components/icons/PinFoodActive';
import PinBathroomActive from 'components/icons/PinBathroomActive';
import phlaskMarkerIconV2 from 'components/icons/PhlaskMarkerIconV2';
import { type ResourceEntry } from 'types/ResourceEntry';
import { ResourceType } from 'hooks/useResourceType';
import useSelectedResource from 'hooks/useSelectedResource';
import useActiveResources from 'hooks/useActiveResources';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';

const style: CSSProperties = {
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 1,
  touchAction: 'none'
};

const Map = () => {
  const isMobile = useIsMobile();
  const posthog = usePostHog();
  const { selectedResource, setSelectedResource } = useSelectedResource();
  const { activeSearchLocation } = useActiveSearchLocation();

  const map = useMap();

  const { data: resources } = useActiveResources();

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
    <GoogleMap
      style={style}
      defaultZoom={16}
      zoomControl={!isMobile}
      streetViewControl={false}
      mapTypeControl={false}
      rotateControl={false}
      fullscreenControl={false}
      gestureHandling="greedy"
      defaultCenter={activeSearchLocation || CITY_HALL_LOCATION}
      mapId="DEMO_MAP_ID"
    >
      {resources?.map((resource, index) => {
        return (
          <AdvancedMarker
            key={resource.id}
            onClick={() => onMarkerClick(resource)}
            position={{ lat: resource.latitude, lng: resource.longitude }}
          >
            <img
              data-cy={`marker-${resource.resource_type}-${index}`}
              src={getMarkerIconSrc(resource) ?? ''}
            />
          </AdvancedMarker>
        );
      })}

      {activeSearchLocation ? (
        <AdvancedMarker position={activeSearchLocation} />
      ) : null}
    </GoogleMap>
  );
};

export default Map;
