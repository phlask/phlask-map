import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import SvgIcon from '@mui/material/SvgIcon';
import NavigationItem from 'components/Toolbar/NavigationItem';
import ResourceIcon from 'icons/ResourceIcon';
import ContributeIcon from 'icons/ContributeIcon';

import ToiletIcon from 'icons/CircleBathroomIcon';
import FoodIcon from 'icons/CircleFoodIcon';
import ForagingIcon from 'icons/CircleForagingIcon';
import WaterIcon from 'icons/CircleWaterIcon';
import useResourceType, { ResourceType } from 'hooks/useResourceType';
import { useToolbarContext } from 'contexts/ToolbarContext';
import useGetUserLocationQuery, {
  type UserLocation
} from 'hooks/queries/useGetUserLocationQuery';

type MobileToolbarProps = {
  onNearMeClick: (userLocation: UserLocation | null) => void;
};

const MobileToolbar = ({ onNearMeClick }: MobileToolbarProps) => {
  const { resourceType } = useResourceType();
  const { toggle } = useToolbarContext();
  const { data: userLocation, isSuccess: isUserSharingLocation } =
    useGetUserLocationQuery();

  const selectedResourceIcon = {
    [ResourceType.WATER]: WaterIcon,
    [ResourceType.FOOD]: FoodIcon,
    [ResourceType.FORAGE]: ForagingIcon,
    [ResourceType.BATHROOM]: ToiletIcon,
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
        <NavigationItem
          central
          disabled={!isUserSharingLocation}
          label={
            <Typography fontSize="small" color="black" marginTop="-1">
              Near me
            </Typography>
          }
          onClick={() => onNearMeClick(userLocation)}
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
