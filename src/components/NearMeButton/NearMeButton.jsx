import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
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

const resourceStyle = {
  [WATER_RESOURCE_TYPE]: 'water',
  [FOOD_RESOURCE_TYPE]: 'food',
  [FORAGE_RESOURCE_TYPE]: 'foraging',
  [BATHROOM_RESOURCE_TYPE]: 'bathrooms'
};

const getResourceIcon = (type, isWideScreen) => {
  const width = isWideScreen ? "34" : "28";
  const height = isWideScreen ? "44" : "37";
  const icons = {
    [WATER_RESOURCE_TYPE]: <WaterIcon width={width} height={height} />,
    [FOOD_RESOURCE_TYPE]: <FoodIcon width={width} height={height} />,
    [FORAGE_RESOURCE_TYPE]: <ForagingIcon width={width} height={height} />,
    [BATHROOM_RESOURCE_TYPE]: <BathroomIcon width={width} height={height} />
  };
  return icons[type];
};

const NearMeButton = ({ onClick, resourceType = WATER_RESOURCE_TYPE }) => {
  const isWideScreen = useMediaQuery('(min-width:1440px)');
  
  return (
    <Button
      startIcon={getResourceIcon(resourceType, isWideScreen)}
      onClick={onClick}
      sx={theme => ({
        fontFamily: 'Exo',
        color: 'white',
        backgroundColor:
          theme.palette.resources[resourceStyle[resourceType]].main,
        paddingInline: isWideScreen ? '56px' : '47px',
        paddingBlock: 0,
        borderRadius: '50px',
        width: isWideScreen ? '289px' : '241px',
        minHeight: isWideScreen ? 72 : 60,
        textWrap: 'nowrap',
        flexGrow: 1,
        fontSize: isWideScreen ? 34 : 28,
        fontWeight: 600,
        textTransform: 'capitalize',
        ':hover': {
          backgroundColor:
            theme.palette.resources[resourceStyle[resourceType]].light
        }
      })}
    >
      Near Me
    </Button>
  );
};

export default NearMeButton;
