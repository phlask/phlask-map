import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { ResourceType } from 'hooks/useResourceType';
import useSelectedResource from 'hooks/useSelectedResource';
import {
  PinWaterDefault,
  PinBathroomsDefault,
  PinForagingDefault,
  PinFoodDefault,
  PinWaterActive,
  PinFoodActive,
  PinForagingActive,
  PinBathroomsActive
} from 'icons';
import type { ResourceEntry } from 'types/ResourceEntry';

type ResourceMarkerProps = {
  resource: ResourceEntry;
  onClick: (resource: ResourceEntry) => void;
  'data-cy': string;
};

const iconStyle = { height: 55, width: 55 };

const ResourceMarker = ({
  resource,
  onClick,
  'data-cy': dataCy
}: ResourceMarkerProps) => {
  const { selectedResource } = useSelectedResource();
  const { id, resource_type } = resource;
  const isActiveMarker = selectedResource === id?.toString();

  const defaultMarker = {
    [ResourceType.WATER]: PinWaterDefault,
    [ResourceType.FOOD]: PinFoodDefault,
    [ResourceType.FORAGE]: PinForagingDefault,
    [ResourceType.BATHROOM]: PinBathroomsDefault
  };

  const activeMarker = {
    [ResourceType.WATER]: PinWaterActive,
    [ResourceType.FOOD]: PinFoodActive,
    [ResourceType.FORAGE]: PinForagingActive,
    [ResourceType.BATHROOM]: PinBathroomsActive
  };

  const Marker = (isActiveMarker ? activeMarker : defaultMarker)[resource_type];

  return (
    <AdvancedMarker
      onClick={() => onClick(resource)}
      position={{ lat: resource.latitude, lng: resource.longitude }}
    >
      <Marker data-cy={dataCy} style={iconStyle} />
    </AdvancedMarker>
  );
};

export default ResourceMarker;
