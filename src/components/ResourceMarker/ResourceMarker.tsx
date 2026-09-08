import { AdvancedMarker } from '@vis.gl/react-google-maps';
import useSelectedResource from 'hooks/useSelectedResource';
import type { ResourceEntry } from 'types/ResourceEntry';
import Icon from 'components/Icon/Icon';
import resourcePins from 'assets/icons/sprites/map-resource-pins.svg';

type ResourceMarkerProps = {
  resource: ResourceEntry;
  onClick: (resource: ResourceEntry) => void;
  'data-cy': string;
};

const ResourceMarker = ({
  resource,
  onClick,
  'data-cy': dataCy
}: ResourceMarkerProps) => {
  const { selectedResource } = useSelectedResource();
  const { id, resource_type, latitude, longitude } = resource;
  const isActiveMarker = selectedResource === id?.toString();

  const markerId = `pin-${resource_type}-${
    isActiveMarker ? 'active' : 'default'
  }`;

  const size = isActiveMarker ? 63 : 57;

  return (
    <AdvancedMarker
      onClick={() => onClick(resource)}
      position={{ lat: latitude, lng: longitude }}
    >
      <Icon
        sprite={resourcePins}
        id={markerId}
        data-cy={dataCy}
        width={size}
        height={size}
      />
    </AdvancedMarker>
  );
};

export default ResourceMarker;
