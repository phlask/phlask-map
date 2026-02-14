import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { ResourceType } from 'hooks/useResourceType';
import useSelectedResource from 'hooks/useSelectedResource';
import pinWaterDefault from 'assets/icons/PinWaterDefault.svg';
import pinWaterActive from 'assets/icons/PinWaterActive.svg';
import pinFoodDefault from 'assets/icons/PinFoodDefault.svg';
import pinFoodActive from 'assets/icons/PinFoodActive.svg';
import pinForagingDefault from 'assets/icons/PinForagingDefault.svg';
import pinForagingActive from 'assets/icons/PinForagingActive.svg';
import pinBathroomsDefault from 'assets/icons/PinBathroomsDefault.svg';
import pinBathroomsActive from 'assets/icons/PinBathroomsActive.svg';
import type { ResourceEntry } from 'types/ResourceEntry';

type ResourceMarkerProps = {
  resource: ResourceEntry;
  onClick: (resource: ResourceEntry) => void;
  'data-cy': string;
};

const iconStyle = { height: 55, width: 55 };

const defaultMarker = {
    [ResourceType.WATER]: pinWaterDefault,
    [ResourceType.FOOD]: pinFoodDefault,
    [ResourceType.FORAGE]: pinForagingDefault,
    [ResourceType.BATHROOM]: pinBathroomsDefault
  };

  const activeMarker = {
    [ResourceType.WATER]: pinWaterActive,
    [ResourceType.FOOD]: pinFoodActive,
    [ResourceType.FORAGE]: pinForagingActive,
    [ResourceType.BATHROOM]: pinBathroomsActive
  };

const ResourceMarker = ({
  resource,
  onClick,
  'data-cy': dataCy
}: ResourceMarkerProps) => {
  const { selectedResource } = useSelectedResource();
  const { id, name, address, resource_type, latitude, longitude } = resource;
  const isActiveMarker = selectedResource === id?.toString();



  const markerIcon = (isActiveMarker ? activeMarker : defaultMarker)[resource_type];

  return (
    <AdvancedMarker
      onClick={() => onClick(resource)}
      position={{ lat: latitude, lng: longitude }}
    >
      <img data-cy={dataCy} src={markerIcon} alt={name || address || ''} style={iconStyle} />
    </AdvancedMarker>
  );
};

export default ResourceMarker;
