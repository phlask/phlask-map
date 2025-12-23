import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import SvgIcon from '@mui/material/SvgIcon';
import NavigationItem from 'components/Toolbar/NavigationItem';
import ResourceIcon from 'icons/ResourceIcon';
import ChooseResource from 'components/ChooseResourceType/ChooseResourceType';
import ContributeIcon from 'icons/ContributeIcon';

import ToiletIcon from 'icons/CircleBathroomIcon';
import FoodIcon from 'icons/CircleFoodIcon';
import ForagingIcon from 'icons/CircleForagingIcon';
import WaterIcon from 'icons/CircleWaterIcon';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';
import useResourceType from 'hooks/useResourceType';
import { useToolbarContext } from 'contexts/ToolbarContext';

type MobileToolbarProps = {
  onNearMeClick: VoidFunction;
};

const MobileToolbar = ({ onNearMeClick }: MobileToolbarProps) => {
  const { resourceType } = useResourceType();
  const { toggle } = useToolbarContext();

  const selectedResourceIcon = {
    [WATER_RESOURCE_TYPE]: WaterIcon,
    [FOOD_RESOURCE_TYPE]: FoodIcon,
    [FORAGE_RESOURCE_TYPE]: ForagingIcon,
    [BATHROOM_RESOURCE_TYPE]: ToiletIcon,
    default: WaterIcon
  }[resourceType ?? 'default']!;

  return (
    <Box
      sx={theme => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        pb: '25px',
        pt: '10px',
        bgcolor: 'white',
        zIndex: theme.zIndex.appBar
      })}
    >
      <BottomNavigation showLabels>
        <NavigationItem
          data-cy="button-resource-type-menu"
          id="resource-type-select-button"
          label={<Typography fontSize="small">Resources</Typography>}
          icon={<ResourceIcon height="32" width="32" />}
          onClick={() => toggle('resource')}
        />
        <ChooseResource />
        <NavigationItem
          central
          label={
            <Typography fontSize="small" color="black" marginTop="-1">
              Near me
            </Typography>
          }
          onClick={onNearMeClick}
          icon={
            <SvgIcon
              component={selectedResourceIcon}
              sx={{ fontSize: 90 }}
              inheritViewBox
            />
          }
        />
        <NavigationItem
          data-cy="button-contribute-type-menu"
          label={
            <Typography noWrap fontSize="small">
              Add Site
            </Typography>
          }
          icon={<ContributeIcon height="32" width="32" />}
          onClick={() => toggle('contribute')}
        />
      </BottomNavigation>
    </Box>
  );
};

export default MobileToolbar;
