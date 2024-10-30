import { Fade } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import useIsMobile from 'hooks/useIsMobile';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTouchEvents from 'react-touch-events';
import {
  TOOLBAR_MODAL_SEARCH,
  getResources,
  removeEntryFilterFunction,
  removeFilterFunction,
  resetFilterFunction,
  setEntryFilterFunction,
  setFilterFunction,
  setLastResourcePan,
  setSelectedPlace,
  setUserLocation,
  toggleInfoWindow
} from '../../actions/actions';
import selectFilteredResource from '../../selectors/resourceSelectors';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from '../../types/ResourceEntry';
import AddResourceModalV2 from '../AddResourceModal/AddResourceModalV2';
import ChooseResourceType from '../ChooseResourceType/ChooseResourceType';
import Filter from '../Filter/Filter';
import SearchBar from '../SearchBar/SearchBar';
import SelectedTap from '../SelectedTap/SelectedTap';
import Toolbar from '../Toolbar/Toolbar';
import { ReactComponent as DesktopBathroomIcon } from '../icons/BathroomIconChooseResource.svg';
import { ReactComponent as DesktopFoodIcon } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as MobileFoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as DesktopForagingIcon } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as MobileForagingIcon } from '../icons/ForagingIconV2.svg';
import phlaskMarkerIconV2 from '../icons/PhlaskMarkerIconV2';
import { ReactComponent as MobileBathroomIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as DesktopWaterIcon } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as MobileWaterIcon } from '../icons/WaterIconV2.svg';
import styles from './ReactGoogleMaps.module.scss';

function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const LoadingContainer = () => <div>Looking for water!</div>;

const style = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const resourceTypeInfo = [
  {
    type: WATER_RESOURCE_TYPE,
    textLabel: 'Water',
    color: '#5286E9',
    desktopIcon: DesktopWaterIcon,
    mobileIcon: MobileWaterIcon,
    formName: 'addWaterTap'
  },
  {
    type: FORAGE_RESOURCE_TYPE,
    textLabel: 'Foraging',
    color: '#5DA694',
    desktopIcon: DesktopForagingIcon,
    mobileIcon: MobileForagingIcon,
    formName: 'addForaging'
  },
  {
    type: FOOD_RESOURCE_TYPE,
    textLabel: 'Food',
    color: '#FF9A55',
    desktopIcon: DesktopFoodIcon,
    mobileIcon: MobileFoodIcon,
    formName: 'addFood'
  },
  {
    type: BATHROOM_RESOURCE_TYPE,
    textLabel: 'Bathroom',
    color: '#9E9E9E',
    desktopIcon: DesktopBathroomIcon,
    mobileIcon: MobileBathroomIcon,
    formName: 'addBathroom'
  }
];

const filters = {
  WATER: {
    title: 'Water Filter',
    categories: [
      {
        type: 0,
        header: 'Dispenser Type',
        tags: [
          'Drinking fountain',
          'Bottle filler',
          'Sink',
          'Water cooler',
          'Soda machine',
          'Vessel'
        ]
      },
      {
        type: 0,
        header: 'Features',
        tags: [
          'ADA accessible',
          'Filtered water',
          'Vessel needed',
          'ID required'
        ]
      },
      {
        type: 1,
        header: 'Entry Type',
        tags: ['Open Access', 'Restricted', 'Unsure']
      }
    ]
  },
  FOOD: {
    title: 'Food Filter',
    categories: [
      {
        type: 0,
        header: 'Food Type',
        tags: ['Perishable', 'Non-perishable', 'Prepared foods and meals']
      },
      {
        type: 0,
        header: 'Distribution type',
        tags: ['Eat on site', 'Delivery', 'Pick up']
      },
      {
        type: 1,
        header: 'Organization type',
        tags: ['Government', 'Business', 'Non-profit', 'Unsure']
      }
    ]
  },
  FORAGE: {
    title: 'Foraging Filter',
    categories: [
      {
        type: 0,
        header: 'Forage type',
        tags: ['Nut', 'Fruit', 'Leaves', 'Bark', 'Flowers']
      },
      {
        type: 0,
        header: 'Features',
        tags: ['Medicinal', 'In season', 'Community garden']
      },
      {
        type: 1,
        header: 'Entry Type',
        tags: ['Open Access', 'Restricted', 'Unsure']
      }
    ]
  },
  BATHROOM: {
    title: 'Bathroom Filter',
    categories: [
      {
        type: 0,
        header: 'Features',
        tags: [
          'ADA accessible',
          'Gender neutral',
          'Changing table',
          'Single occupancy',
          'Family bathroom',
          'Has water fountain'
        ]
      },
      {
        type: 1,
        header: 'Entry Type',
        tags: ['Open Access', 'Restricted', 'Unsure']
      }
    ]
  }
};

let noActiveFilterTags = {};
for (const [key, value] of Object.entries(filters)) {
  let data = [];
  value.categories.map(category => {
    if (category.type == 0) {
      data.push(new Array(category.tags.length).fill(false));
    } else {
      data.push(category.tags.length);
    }
  });
  noActiveFilterTags[key] = data;
}

export const ReactGoogleMaps = ({ google }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const allResources = useSelector(state => state.filterMarkers.allResources);
  const filteredResources = useSelector(state => selectFilteredResource(state));
  const lastResourcePan = useSelector(
    state => state.filterMarkers.lastResourcePan
  );
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const searchBarMapTintOn = useSelector(
    state => state.filterMarkers.searchBarMapTintOn
  );
  const showingInfoWindow = useSelector(
    state => state.filterMarkers.showingInfoWindow
  );
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const [zoom, setZoom] = useState(16);
  const [searchedTap, setSearchedTap] = useState(null);
  const [map, setMap] = useState(null);
  const [activeFilterTags, setActiveFilterTags] = useState(
    JSON.parse(JSON.stringify(noActiveFilterTags))
  );
  const [appliedFilterTags, setAppliedFilterTags] = useState(
    JSON.parse(JSON.stringify(noActiveFilterTags))
  );

  useEffect(() => {
    if (!allResources.length) {
      dispatch(getResources());
    }
  }, [allResources.length, dispatch]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const position = await getCoordinates();
        dispatch(
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        );
        dispatch(
          setLastResourcePan({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        );
      } catch (error) {
        // Do nothing
      }
    };

    fetchCoordinates();
  }, []);

  //toggle window goes here
  const onMarkerClick = (resource, markerProps) => {
    dispatch(
      toggleInfoWindow({
        isShown: true,
        infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
      })
    );
    dispatch(setSelectedPlace(resource));
    dispatch(
      setLastResourcePan({
        lat: resource.latitude,
        lng: resource.longitude
      })
    );
    markerProps.map.panTo({ lat: resource.latitude, lng: resource.longitude });
  };

  const onReady = (_, map) => {
    setMap(map);
  };

  const searchForLocation = location => {
    dispatch(
      setLastResourcePan({
        lat: location.lat,
        lng: location.lng
      })
    );
    setZoom(16);
    setSearchedTap({ lat: location.lat, lng: location.lng });
  };

  const handleTap = e => {
    if (e.target instanceof HTMLDivElement && showingInfoWindow && !isMobile) {
      dispatch(
        toggleInfoWindow({
          isShown: false,
          infoWindowClass: isMobile
            ? 'info-window-in'
            : 'info-window-in-desktop'
        })
      );
    }
  };

  const handleTag = (type, filterType, filterTag, index, key) => {
    //handles multi select filters
    if (type == 0) {
      let activeFilterTags_ = { ...activeFilterTags };
      if (activeFilterTags_[filterType][index][key]) {
        dispatch(removeFilterFunction({ tag: filterTag }));
      } else {
        dispatch(setFilterFunction({ tag: filterTag }));
      }
      activeFilterTags_[filterType][index][key] =
        !activeFilterTags_[filterType][index][key];
      setActiveFilterTags(activeFilterTags_);
    }
    //handles single select entry/organization filters
    else if (type == 1) {
      let activeFilterTags_ = { ...activeFilterTags };
      if (activeFilterTags_[filterType][index] == key) {
        activeFilterTags_[filterType][index] = null;
        dispatch(removeEntryFilterFunction());
      } else {
        activeFilterTags_[filterType][index] = key;
        dispatch(setEntryFilterFunction({ tag: filterTag }));
      }
      setActiveFilterTags(activeFilterTags_);
    }
  };

  const clearAllTags = () => {
    setActiveFilterTags(JSON.parse(JSON.stringify(noActiveFilterTags)));
    dispatch(resetFilterFunction());
  };

  const applyTags = () => {
    setAppliedFilterTags(JSON.parse(JSON.stringify(activeFilterTags)));
  };

  return (
    <div id="react-google-map" className={styles.mapContainer}>
      <ReactTouchEvents onTap={handleTap}>
        <div>
          <Map
            google={google}
            className="map"
            style={style}
            zoom={zoom}
            zoomControl={!isMobile}
            streetViewControl={false}
            mapTypeControl={false}
            rotateControl={false}
            fullscreenControl={false}
            onReady={onReady}
            center={{
              lat: lastResourcePan.lat,
              lng: lastResourcePan.lng
            }}
            filterTags={appliedFilterTags}
          >
            {filteredResources.map((resource, index) => {
              return (
                <Marker
                  key={index}
                  onClick={markerProps => {
                    onMarkerClick(resource, markerProps);
                  }}
                  position={{
                    lat: resource.latitude,
                    lng: resource.longitude
                  }}
                  icon={{
                    url: phlaskMarkerIconV2(resource.resource_type, 56, 56)
                  }}
                  // This is used for marker targeting as we are unable to add custom properties with this library.
                  // We should eventually replace this so that we can still enable the use of screen readers in the future.
                  title={`data-cy-${index}`}
                />
              );
            })}

            {searchedTap != null && (
              <Marker
                name="Your Search Result"
                position={searchedTap}
                title="data-cy-search-result"
              />
            )}
          </Map>
        </div>
      </ReactTouchEvents>
      {isMobile && (
        <Fade
          in={searchBarMapTintOn}
          timeout={300}
          style={{ position: 'fixed', pointerEvents: 'none' }}
        >
          <div
            style={{
              width: '100vw',
              height: '100dvh',
              backgroundColor: 'rgba(0, 0, 0, 0.15)'
            }}
          ></div>
        </Fade>
      )}
      <Stack position="absolute" bottom="0px" height="143px" width="34%">
        <Stack direction="row" spacing={2}>
          <SearchBar
            className="searchBar"
            search={location => searchForLocation(location)}
          />
        </Stack>
        <ChooseResourceType resourceTypeInfo={resourceTypeInfo} />
        <Filter
          resourceType={resourceType}
          filters={filters}
          handleTag={handleTag}
          clearAll={clearAllTags}
          applyTags={applyTags}
          activeTags={activeFilterTags}
        />
        <AddResourceModalV2 resourceTypeInfo={resourceTypeInfo} />
        <Toolbar map={map} />
      </Stack>
      <SelectedTap />
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I',
  LoadingContainer: LoadingContainer,
  version: 'quarterly'
})(ReactGoogleMaps);
