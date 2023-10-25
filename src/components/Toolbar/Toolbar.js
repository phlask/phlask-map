import IconButton from '@mui/material/Button';
import React from 'react';
import ReactGA from 'react-ga4';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  setMapCenter,
  setSelectedPlace,
  setToolbarModal,
  setUserLocation,
  toggleInfoWindow,
  togglePhlaskType
} from '../../actions/actions';
import styles from './Toolbar.module.scss';

import { isMobile } from 'react-device-detect';
// import AddResourceModalV2 from '../AddResourceModal/AddResourceModalV2';
import AddResourceModal from '../AddResourceModal/AddResourceModal';

import DesktopWaterIcon from '../icons/DesktopWaterIcon';

import { ReactComponent as ToiletIcon } from '../icons/CircleBathroomIcon.svg';
import { ReactComponent as FoodIcon } from '../icons/CircleFoodIcon.svg';
import { ReactComponent as ForagingIcon } from '../icons/CircleForagingIcon.svg';
import { ReactComponent as WaterIcon } from '../icons/CircleWaterIcon.svg';
import { ReactComponent as ContributeIcon } from '../icons/ContributeIcon.svg';
import { ReactComponent as FilterIcon } from '../icons/FilterIcon.svg';
import { ReactComponent as ResourceIcon } from '../icons/ResourceIcon.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';

import { ReactComponent as PhlaskButton } from '../icons/PhlaskButton.svg';

import { SvgIcon, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import { phlaskTypeSelector } from '../../selectors/filterMarkersSelectors';
import ResourceMenu from '../ResourceMenu/ResourceMenu';
import NavigationItem from './NavigationItem';

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

//looping through data to get list of locations
function getClosest(data, userLocation) {
  var distances = data
    .map((org, index) => {
      //i added this terniary
      if (org?.lat && org?.lon) {
        return {
          lat: org['lat'],
          lon: org['lon'],
          organization: org['organization'],
          address: org['address'],
          distance: distance(
            userLocation['lat'],
            userLocation['lon'],
            org['lat'],
            org['lon']
          ),
          id: index
        };
      }
    })
    .filter(Boolean);

  var minDistance = Math.min(...distances.map(d => d.distance));
  var closestTap = {
    organization: '',
    address: '',
    lat: '',
    lon: '',
    id: ''
  };

  for (var i = 0; i < distances.length; i++) {
    if (distances[i].distance === minDistance) {
      closestTap.lat = distances[i].lat;
      closestTap.lon = distances[i].lon;
      closestTap.organization = distances[i].organization;
      closestTap.address = distances[i].address;
      closestTap.id = distances[i].id;
    }
  }
  return closestTap;
}

function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function Toolbar(props) {
  const [value, setValue] = React.useState(0);

  const phlaskType = useSelector(phlaskTypeSelector);
  const dispatch = useDispatch();
  const property_name = useSelector(state => state);

  const blackToGrayFilter =
    'invert(43%) sepia(20%) saturate(526%) hue-rotate(178deg) brightness(95%) contrast(93%)';

  const selectedResourceIcon = {
    [PHLASK_TYPE_WATER]: WaterIcon,
    [PHLASK_TYPE_FOOD]: FoodIcon,
    [PHLASK_TYPE_FORAGING]: ForagingIcon,
    [PHLASK_TYPE_BATHROOM]: ToiletIcon,
    default: WaterIcon
  }[phlaskType ?? 'default'];

  function switchType(type) {
    if (props.phlaskType !== type) {
      props.togglePhlaskType(type);
      handleGA(type);
    }
  }

  function handleGA(type) {
    ReactGA.event({
      category: `Toolbar`,
      action: 'MapChangedTo',
      label: `${type}`
    });
  }

  async function setClosest() {
    // If the user clicks very fast, it crashes.
    // NOTE: This was left as an acceptable scenario for now,
    // as it is difficult for a user to do this reliably due to the popup of the location panel.
    // This may be reproducible on Desktop.
    let data;
    switch (props.phlaskType) {
      case PHLASK_TYPE_WATER:
        data = props?.allTaps;
        break;
      case PHLASK_TYPE_FOOD:
        data = props?.allFoodOrgs;
        break;
      case PHLASK_TYPE_FORAGING:
        data = props?.allForagingTaps;
        break;
      case PHLASK_TYPE_BATHROOM:
        data = props?.allBathroomTaps;
        break;
      default:
        data = props?.allTaps;
    }

    const closest = getClosest(data, {
      lat: props.userLocation.lat,
      lon: props.userLocation.lng
    });

    const place = new Promise(() => {
      props.setSelectedPlace(closest.id);
    });

    place
      .then(
        props.map.panTo({
          lat: closest.lat,
          lng: closest.lon
        })
      )
      .then(props.toggleInfoWindow(true));
  }

  function closestButtonClicked() {
    setClosest();
  }

  function toolbarClicked(modal) {
    if (props.toolbarModal == modal) {
      props.setToolbarModal(TOOLBAR_MODAL_NONE);
    } else {
      props.setToolbarModal(modal);
    }
  }

  return (
    <>
      $
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
            <PhlaskButton />
          </IconButton>
          <IconButton
            variant="text"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 0,
              filter:
                props.toolbarModal == TOOLBAR_MODAL_RESOURCE
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
                props.toolbarModal == TOOLBAR_MODAL_FILTER
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
                props.toolbarModal == TOOLBAR_MODAL_SEARCH
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
                props.toolbarModal == TOOLBAR_MODAL_CONTRIBUTE
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
              label={<Typography fontSize="small">Resources</Typography>}
              icon={<ResourceIcon className={styles.resourceButton} />}
              onClick={() => props.setOpenResourceModal()}
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
              label={
                <Typography noWrap fontSize="small">
                  Add Site
                </Typography>
              }
              icon={<ContributeIcon className={styles.contributeButton} />}
              onClick={() => props.setOpenResourceModal()}
            />
          </BottomNavigation>
        </Box>
      )}
      {/* <AddResourceModalV2
        open={openResourceModal}
        setOpen={setOpenResourceModal}
      /> */}
      {/* <AddResourceModal
        open={openResourceModal}
        setOpen={setOpenResourceModal}
      /> */}
    </>
  );
}

const mapStateToProps = state => ({
  phlaskType: state.phlaskType,
  allTaps: state.allTaps,
  allFoodOrgs: state.allFoodOrgs,
  allBathroomTaps: state.allBathroomTaps,
  allForagingTaps: state.allForagingTaps,
  userLocation: state.userLocation,
  toolbarModal: state.toolbarModal
});

const mapDispatchToProps = {
  togglePhlaskType,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER,
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FORAGING,
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  TOOLBAR_MODAL_NONE,
  setToolbarModal,
  setSelectedPlace,
  toggleInfoWindow,
  setMapCenter,
  setUserLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
