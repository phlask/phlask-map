import { SvgIcon } from '@mui/material';
import FountainIcon from 'icons/CircleWaterIcon';
import ForagingIcon from 'icons/CircleForagingIcon';
import FoodIcon from 'icons/CircleFoodIcon';
import BathroomIcon from 'icons/CircleBathroomIcon';
import { ResourceType, type ResourceTypeOption } from 'hooks/useResourceType';

type ResourceIconProps = {
  type: ResourceTypeOption;
};
const ResourceIcon = ({ type }: ResourceIconProps) => {
  const icon = {
    [ResourceType.WATER]: FountainIcon,
    [ResourceType.FORAGE]: ForagingIcon,
    [ResourceType.FOOD]: FoodIcon,
    [ResourceType.BATHROOM]: BathroomIcon
  }[type];

  return (
    <SvgIcon
      data-cy={`resource-icon-${type}`}
      sx={{
        width: '48px',
        height: '48px'
      }}
      viewBox="0 0 85 85"
      component={icon}
    />
  );
};

export default ResourceIcon;
