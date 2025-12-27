import Button from '@mui/material/Button';
import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconNearMeIcon';
import BathroomIcon from 'icons/ToiletIconChooseResource';
import type { MouseEventHandler } from 'react';
import { ResourceType, type ResourceTypeOption } from 'hooks/useResourceType';

const resourceStyle = {
  [ResourceType.WATER]: 'water',
  [ResourceType.FOOD]: 'food',
  [ResourceType.FORAGE]: 'foraging',
  [ResourceType.BATHROOM]: 'bathrooms'
};

const resourceIcons = {
  [ResourceType.WATER]: <WaterIcon width="28" height="37" />,
  [ResourceType.FOOD]: <FoodIcon width="28" height="37" />,
  [ResourceType.FORAGE]: <ForagingIcon width="28" height="37" />,
  [ResourceType.BATHROOM]: <BathroomIcon width="28" height="37" />
};

type NearMeButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  resourceType: ResourceTypeOption;
};

const NearMeButton = ({
  onClick,
  resourceType = ResourceType.WATER
}: NearMeButtonProps) => (
  <Button
    startIcon={resourceIcons[resourceType]}
    onClick={onClick}
    sx={theme => ({
      fontFamily: 'Exo',
      color: 'white',
      backgroundColor:
        // @ts-expect-error Need to fix theme declaration
        theme.palette.resources[resourceStyle[resourceType]].main,
      paddingInline: '47px',
      paddingBlock: 0,
      borderRadius: '50px',
      width: '241px',
      minHeight: 60,
      textWrap: 'nowrap',
      flexGrow: 1,
      fontSize: 28,
      fontWeight: 600,
      textTransform: 'capitalize',
      ':hover': {
        backgroundColor:
          // @ts-expect-error Need to fix theme declaration
          theme.palette.resources[resourceStyle[resourceType]].light
      }
    })}
  >
    Near Me
  </Button>
);

export default NearMeButton;
