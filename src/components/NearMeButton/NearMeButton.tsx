import Button from '@mui/material/Button';
import WaterIcon from 'icons/WaterIconChooseResource';
import FoodIcon from 'icons/FoodIconChooseResource';
import ForagingIcon from 'icons/ForagingIconNearMeIcon';
import BathroomIcon from 'icons/ToiletIconChooseResource';

import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';
import type { MouseEventHandler } from 'react';
import type { ResourceTypeOption } from 'hooks/useResourceType';

const resourceStyle = {
  [WATER_RESOURCE_TYPE]: 'water',
  [FOOD_RESOURCE_TYPE]: 'food',
  [FORAGE_RESOURCE_TYPE]: 'foraging',
  [BATHROOM_RESOURCE_TYPE]: 'bathrooms'
};

const resourceIcons = {
  [WATER_RESOURCE_TYPE]: <WaterIcon width="28" height="37" />,
  [FOOD_RESOURCE_TYPE]: <FoodIcon width="28" height="37" />,
  [FORAGE_RESOURCE_TYPE]: <ForagingIcon width="28" height="37" />,
  [BATHROOM_RESOURCE_TYPE]: <BathroomIcon width="28" height="37" />
};

type NearMeButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  resourceType: ResourceTypeOption;
};

const NearMeButton = ({
  onClick,
  resourceType = WATER_RESOURCE_TYPE
}: NearMeButtonProps) => (
  <Button
    startIcon={resourceIcons[resourceType || WATER_RESOURCE_TYPE]}
    onClick={onClick}
    sx={theme => ({
      fontFamily: 'Exo',
      color: 'white',
      backgroundColor:
        // @ts-expect-error Need to fix theme declaration
        theme.palette.resources[
          resourceStyle[resourceType || WATER_RESOURCE_TYPE]
        ].main,
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
          theme.palette.resources[
            resourceStyle[resourceType || WATER_RESOURCE_TYPE]
          ].light
      }
    })}
  >
    Near Me
  </Button>
);

export default NearMeButton;
