import React from 'react';
import ReactGA from 'react-ga';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_BATHROOM,
  setMapCenter,
  setSelectedPlace,
  toggleInfoWindow,
  togglePhlaskType,
  toggleResourceMenu
} from '../../actions/actions';
import FoodFilter from '../FoodFilter/FoodFilter';
import phlaskImg from '../images/PHLASK Button.png';
import Filter from '../ResourceMenu/Filter';
import styles from './Toolbar.module.scss';

import { isMobile } from 'react-device-detect';
import { AddResourceModal } from '../AddResourceModal';
import { ReactComponent as ContributeIcon } from '../icons/ContributeIcon.svg';
import { ReactComponent as ResourceIcon } from '../icons/ResourceIcon.svg';

import DesktopWaterIcon from '../icons/DesktopWaterIcon';

import { ReactComponent as FoodIcon } from '../icons/CircleFoodIcon.svg';
import { ReactComponent as ForagingIcon } from '../icons/CircleForagingIcon.svg';
import { ReactComponent as ToiletIcon } from '../icons/CircleBathroomIcon.svg';
import { ReactComponent as WaterIcon } from '../icons/CircleWaterIcon.svg';

import { SvgIcon, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import NavigationItem from './NavigationItem';
import Box from '@mui/material/Box';
import ResourceMenu from '../ResourceMenu/ResourceMenu';
import { styled, css } from '@mui/material';
import { phlaskTypeSelector } from '../../selectors/filterMarkersSelectors';

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
function getClosest(data, userLocation) {
  var distances = data.map((org, index) => {
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
  });
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
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const phlaskType = useSelector(phlaskTypeSelector);
  const isFilterShown = useSelector(state => state.isFilterShown);

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

  function setClosest() {
    const data =
      props.phlaskType === PHLASK_TYPE_WATER
        ? props.allTaps
        : props.allFoodOrgs;
    const closest = getClosest(data, {
      lat: props.userLocation.lat,
      lon: props.userLocation.lng
    });
    const place = new Promise(() => {
      props.setSelectedPlace(closest.id);
    });
    place
      .then(
        props.setMapCenter({
          lat: closest.lat,
          lng: closest.lon
        })
      )
      .then(props.toggleInfoWindow(true));
  }
  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };

  return (
    <>
      $
      {!isMobile ? (
        <div
          className={`${styles.toolbar} ${
            isMobile ? styles.mobileToolbar : styles.desktopToolbar
          }`}
        >
          {!isMobile && (
            <h3
              className={`
            ${styles.title}
            ${
              props.phlaskType === PHLASK_TYPE_WATER
                ? styles.waterTitle
                : styles.foodTitle
            }
          `}
            >
              {props.phlaskType === PHLASK_TYPE_WATER
                ? 'Water Map'
                : 'Food Map'}
            </h3>
          )}
          <div className={styles.filterButton}>
            <button aria-label="show filters" onClick={toggleFilterModal}>
              {props.phlaskType === PHLASK_TYPE_WATER ? (
                <Filter />
              ) : (
                <FoodFilter />
              )}
            </button>
          </div>
          <button
            className={`${styles.toolbarButton} ${styles.waterButton} ${
              props.phlaskType !== PHLASK_TYPE_WATER && styles.disabled
            }`}
            onClick={() => {
              switchType(PHLASK_TYPE_WATER);
            }}
          >
            <DesktopWaterIcon />
          </button>
          {isMobile && (
            <button className={styles.closestTapButton} onClick={setClosest}>
              <img className="img" src={phlaskImg} alt=""></img>
            </button>
          )}
          <button
            className={`${styles.toolbarButton} ${styles.foodButton} ${
              props.phlaskType === PHLASK_TYPE_WATER && styles.disabled
            }`}
            onClick={() => {
              switchType(PHLASK_TYPE_FOOD);
            }}
          >
            <FoodIcon />
          </button>
          <AddResourceModal />
        </div>
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
              label={<Typography fontSize={'small'}>Resources</Typography>}
              icon={<ResourceIcon className={styles.resourceButton} />}
              onClick={() =>
                props.toggleResourceMenu(props.isResourceMenuShown)
              }
            />
            <ResourceMenu />
            <NavigationItem
              central
              label={
                <Typography fontSize={'small'} color={'black'} marginTop={-1}>
                  PHL<b>ASK</b>
                </Typography>
              }
              icon={
                <SvgIcon
                  component={selectedResourceIcon}
                  sx={{ fontSize: 90 }}
                  inheritViewBox={true}
                />
              }
            />
            <NavigationItem
              label={<Typography fontSize={'small'}>Contribute</Typography>}
              icon={<ContributeIcon className={styles.contributeButton} />}
            />
          </BottomNavigation>
        </Box>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  phlaskType: state.phlaskType,
  allTaps: state.allTaps,
  allFoodOrgs: state.allFoodOrgs,
  userLocation: state.userLocation,
  isResourceMenuShown: state.isResourceMenuShown
});

const mapDispatchToProps = {
  togglePhlaskType,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER,
  setSelectedPlace,
  toggleInfoWindow,
  setMapCenter,
  toggleResourceMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
