import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap
} from '@vis.gl/react-google-maps';
import { usePostHog } from 'posthog-js/react';
import { type CSSProperties } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_LOCATION } from 'constants/defaults';
import { type ResourceEntry } from 'types/ResourceEntry';
import useSelectedResource from 'hooks/useSelectedResource';
import useActiveResources from 'hooks/useActiveResources';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import ResourceMarker from 'components/ResourceMarker/ResourceMarker';

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
  const { setSelectedResource } = useSelectedResource();
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

  return (
    <GoogleMap
      style={style}
      defaultZoom={16}
      zoomControl={!isMobile}
      streetViewControl={false}
      mapTypeControl={false}
      rotateControl={false}
      fullscreenControl={false}
      defaultCenter={activeSearchLocation || CITY_HALL_LOCATION}
      mapId="DEMO_MAP_ID"
    >
      {resources?.map((resource, index) => (
        <ResourceMarker
          key={resource.id}
          resource={resource}
          onClick={onMarkerClick}
          data-cy={`marker-${resource.resource_type}-${index}`}
        />
      ))}

      {activeSearchLocation ? (
        <AdvancedMarker position={activeSearchLocation} />
      ) : null}
    </GoogleMap>
  );
};

export default Map;
