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
        [ResourceType.WATER]: <PinWaterDefault data-cy={dataCy} style={iconStyle} />,
        [ResourceType.FOOD]: <PinFoodDefault data-cy={dataCy} style={iconStyle} />,
        [ResourceType.FORAGE]: <PinForagingDefault data-cy={dataCy} style={iconStyle} />,
        [ResourceType.BATHROOM]: <PinBathroomsDefault data-cy={dataCy} style={iconStyle} />
      }

  const activeMarker = {
      [ResourceType.WATER]: <PinWaterActive data-cy={dataCy} style={iconStyle} />,
      [ResourceType.FOOD]: <PinFoodActive data-cy={dataCy} style={iconStyle} />,
      [ResourceType.FORAGE]: <PinForagingActive data-cy={dataCy} style={iconStyle} />,
      [ResourceType.BATHROOM]: <PinBathroomsActive data-cy={dataCy} style={iconStyle} />
    }

  const marker = (isActiveMarker ? activeMarker : defaultMarker)[resource_type];


  return (
    <AdvancedMarker
      onClick={() => onClick(resource)}
      position={{ lat: resource.latitude, lng: resource.longitude }}
    >
      {marker}
    </AdvancedMarker>
  );
};

export default ResourceMarker;
