import IconButton from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  setSelectedPlace,
  setToolbarModal,
  toggleInfoWindow,
  toggleResourceMenu
} from '../../actions/actions';
import styles from './Toolbar.module.scss';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from '../../types/ResourceEntry';

import { ReactComponent as ToiletIcon } from '../icons/CircleBathroomIcon.svg';
import { ReactComponent as FoodIcon } from '../icons/CircleFoodIcon.svg';
import { ReactComponent as ForagingIcon } from '../icons/CircleForagingIcon.svg';
import { ReactComponent as WaterIcon } from '../icons/CircleWaterIcon.svg';
import { ReactComponent as ContributeIcon } from '../icons/ContributeIcon.svg';
import { ReactComponent as FilterIcon } from '../icons/FilterIcon.svg';
import { ReactComponent as ResourceIcon } from '../icons/ResourceIcon.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';

import { ReactComponent as BathroomPhlaskButton } from '../icons/PhlaskButtons/BathroomPhlaskButton.svg';
import { ReactComponent as FoodPhlaskButton } from '../icons/PhlaskButtons/FoodPhlaskButton.svg';
import { ReactComponent as ForagingPhlaskButton } from '../icons/PhlaskButtons/ForagingPhlaskButton.svg';
import { ReactComponent as WaterPhlaskButton } from '../icons/PhlaskButtons/WaterPhlaskButton.svg';

import { SvgIcon, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import { resourceTypeSelector } from '../../selectors/filterMarkersSelectors';
import ResourceMenu from '../ResourceMenu/ResourceMenu';
import NavigationItem from './NavigationItem';
import useIsMobile from 'hooks/useIsMobile';

// Actual Magic: https://stackoverflow.com/a/41337005
// Distance calculates the distance between two lat/lon pairs
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

// Takes an array of objects with lat and lon properties as well as a single object with lat and lon
// properties and finds the closest point (by shortest distance).

// Find the closest resource to the user's location
// @param {ResourceEntry[]} data
// @return {ResourceEntry}
function getClosest(data, userLocation) {
  const distances = data.map((resource, index) => {
    return {
      resource,
      distance: distance(
        userLocation['lat'],
        userLocation['lon'],
        resource.latitude,
        resource.longitude
      )
    };
  });

  // Return the resource with the minimum distance value
  if (!distances.length) return null;
  return distances.reduce(
    (min, p) => (p.distance < min.distance ? p : min),
    distances[0]
  ).resource;
}

function Toolbar({ map }) {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const resourceType = useSelector(resourceTypeSelector);
  const allResources = useSelector(state => state.filterMarkers.allResources);
  const userLocation = useSelector(state => state.filterMarkers.userLocation);
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const isResourceMenuShown = useSelector(
    state => state.filterMarkers.isResourceMenuShown
  );
  const blackToGrayFilter =
    'invert(43%) sepia(20%) saturate(526%) hue-rotate(178deg) brightness(95%) contrast(93%)';

  const selectedResourceIcon = {
    [WATER_RESOURCE_TYPE]: WaterIcon,
    [FOOD_RESOURCE_TYPE]: FoodIcon,
    [FORAGE_RESOURCE_TYPE]: ForagingIcon,
    [BATHROOM_RESOURCE_TYPE]: ToiletIcon,
    default: WaterIcon
  }[resourceType ?? 'default'];

  async function setClosest() {
    // If the user clicks very fast, it crashes.
    // NOTE: This was left as an acceptable scenario for now,
    // as it is difficult for a user to do this reliably due to the popup of the location panel.
    // This may be reproducible on Desktop.
    let data;

    switch (resourceType) {
      case WATER_RESOURCE_TYPE:
        data = allResources;
        break;
      // TODO(vontell): Filter based on requested type
      default:
        data = allResources;
    }

    const closest = getClosest(data, {
      lat: userLocation.lat,
      lon: userLocation.lng
    });
    if (!closest) return;
    dispatch(setSelectedPlace(closest));

    map.panTo({
      lat: closest.latitude,
      lng: closest.longitude
    });
    toggleInfoWindow({
      isShown: true,
      infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
    });
  }

  function closestButtonClicked() {
    setClosest();
  }

  function toolbarClicked(modal) {
    dispatch(
      setToolbarModal(toolbarModal === modal ? TOOLBAR_MODAL_NONE : modal)
    );
  }

  let phlaskButton = null;
  switch (resourceType) {
    case WATER_RESOURCE_TYPE:
      phlaskButton = <WaterPhlaskButton />;
      break;
    case FOOD_RESOURCE_TYPE:
      phlaskButton = <FoodPhlaskButton />;
      break;
    case FORAGE_RESOURCE_TYPE:
      phlaskButton = <ForagingPhlaskButton />;
      break;
    case BATHROOM_RESOURCE_TYPE:
      phlaskButton = <BathroomPhlaskButton />;
      break;
    default:
      break;
  }

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            left: '32px',
            bottom: '32px',
            px: '40px',
            py: '12px',
            gap: '40px',
            backgroundColor: 'white',
            boxShadow:
              '0px 3px 8px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px 0px rgba(0, 0, 0, 0.21)',
            minWidth: '400px',
            borderRadius: '10px',
            justifyContent: 'space-between',
            zIndex: 1
          }}
        >
          {/* DESKTOP VERSION OF THE TOOLBAR (V2) */}
          <IconButton
            sx={{
              display: 'flex',
              minWidth: '188px',
              flexDirection: 'column',
              p: 0
            }}
            onClick={closestButtonClicked}
            disableFocusRipple={true}
            disableRipple={true}
          >
            {phlaskButton}
          </IconButton>
          <IconButton
            variant="text"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              filter:
                toolbarModal == TOOLBAR_MODAL_RESOURCE
                  ? blackToGrayFilter
                  : 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                filter: blackToGrayFilter
              }
            }}
            onClick={() => toolbarClicked(TOOLBAR_MODAL_RESOURCE)}
            disableFocusRipple={true}
            disableRipple={true}
            data-cy="button-resource-type-menu"
          >
            <ResourceIcon style={{ color: '#f80' }} />
            <Typography
              style={{ textTransform: 'none', color: 'black' }}
              fontSize={'small'}
            >
              Resources
            </Typography>
          </IconButton>
          <IconButton
            variant="text"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              filter:
                toolbarModal == TOOLBAR_MODAL_FILTER
                  ? blackToGrayFilter
                  : 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                filter: blackToGrayFilter
              }
            }}
            onClick={() => toolbarClicked(TOOLBAR_MODAL_FILTER)}
            disableFocusRipple={true}
            disableRipple={true}
            data-cy="button-filter-menu"
          >
            <FilterIcon />
            <Typography
              style={{ textTransform: 'none', color: 'black' }}
              fontSize={'small'}
            >
              Filter
            </Typography>
          </IconButton>
          <IconButton
            variant="text"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              filter:
                toolbarModal == TOOLBAR_MODAL_SEARCH
                  ? blackToGrayFilter
                  : 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                filter: blackToGrayFilter
              }
            }}
            onClick={() => toolbarClicked(TOOLBAR_MODAL_SEARCH)}
            disableFocusRipple={true}
            disableRipple={true}
            data-cy="button-search"
          >
            <SearchIcon />
            <Typography
              style={{ textTransform: 'none', color: 'black' }}
              fontSize={'small'}
            >
              Search
            </Typography>
          </IconButton>
          <IconButton
            variant="text"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              filter:
                toolbarModal == TOOLBAR_MODAL_CONTRIBUTE
                  ? blackToGrayFilter
                  : 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                filter: blackToGrayFilter
              }
            }}
            onClick={() => toolbarClicked(TOOLBAR_MODAL_CONTRIBUTE)}
            disableFocusRipple={true}
            disableRipple={true}
            data-cy="button-contribute-menu"
          >
            <ContributeIcon />
            <Typography
              style={{ textTransform: 'none', color: 'black' }}
              fontSize={'small'}
            >
              Add Site
            </Typography>
          </IconButton>
        </Box>
      ) : (
        // MOBILE VERSION OF THE TOOLBAR (V2)
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            pb: '25px',
            pt: '10px',
            bgcolor: 'white'
          }}
        >
          <BottomNavigation showLabels>
            <NavigationItem
              data-cy="button-resource-type-menu"
              label={<Typography fontSize="small">Resources</Typography>}
              icon={<ResourceIcon className={styles.resourceButton} />}
              onClick={() =>
                toggleResourceMenu({ isShown: isResourceMenuShown })
              }
            />
            <ResourceMenu />
            <NavigationItem
              central
              label={
                <Typography fontSize="small" color="black" marginTop="-1">
                  PHL<b>ASK</b>
                </Typography>
              }
              icon={
                <SvgIcon
                  component={selectedResourceIcon}
                  sx={{ fontSize: 90 }}
                  inheritViewBox={true}
                  onClick={closestButtonClicked}
                />
              }
            />
            <NavigationItem
              data-cy="button-contribute-menu"
              label={
                <Typography noWrap fontSize="small">
                  Add Site
                </Typography>
              }
              icon={<ContributeIcon className={styles.contributeButton} />}
              onClick={() => toolbarClicked(TOOLBAR_MODAL_CONTRIBUTE)}
            />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
}

export default Toolbar;
