import { Fade } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTouchEvents from 'react-touch-events';
import {
  TOOLBAR_MODAL_SEARCH,
  setMapCenter,
  setUserLocation,
  toggleInfoWindow,
  getResources,
  setSelectedPlace
} from '../../actions/actions';
import SearchBar from '../SearchBar/SearchBar';
import SelectedTap from '../SelectedTap/SelectedTap';
import styles from './ReactGoogleMaps.module.scss';
import Stack from '@mui/material/Stack';
import AddResourceModalV2 from '../AddResourceModal/AddResourceModalV2';
import ChooseResource from '../ChooseResource/ChooseResource';
import TutorialModal from '../TutorialModal/TutorialModal';
import Filter from '../Filter/Filter';
import Toolbar from '../Toolbar/Toolbar';
import phlaskMarkerIconV2 from '../icons/PhlaskMarkerIconV2';
import selectFilteredResource from '../../selectors/waterSelectors';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_COORDINATES } from 'constants/defaults';

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
      data.push(null);
    }
  });
  noActiveFilterTags[key] = data;
}

export const ReactGoogleMaps = ({ google }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const allResources = useSelector(state => state.filterMarkers.allResources);
  const filteredResources = useSelector(state => selectFilteredResource(state));

  const mapCenter = useSelector(state => state.filterMarkers.mapCenter);
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const showingInfoWindow = useSelector(
    state => state.filterMarkers.showingInfoWindow
  );
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  const [currentLat, setCurrentLat] = useState(mapCenter.lat);
  const [currentLon, setCurrentLon] = useState(mapCenter.lng);
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
    const setDefaultLocation = () => {
      setCurrentLat(parseFloat(CITY_HALL_COORDINATES.latitude));
      setCurrentLon(parseFloat(CITY_HALL_COORDINATES.longitude));
    };
    getCoordinates()
      .then(position => {
        if (
          Number.isNaN(position.coords.latitude) ||
          Number.isNaN(position.coords.longitude)
        ) {
          setDefaultLocation();
        } else {
          dispatch(
            setMapCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          );
          dispatch(
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          );
          setCurrentLat(position.coords.latitude);
          setCurrentLon(position.coords.longitude);
        }
      })
      .catch(() => {
        setDefaultLocation();
      });
  }, [dispatch]);

  //toggle window goes here
  const onMarkerClick = (resource, markerProps) => {
    dispatch(
      toggleInfoWindow({
        isShown: true,
        infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
      })
    );
    dispatch(setSelectedPlace(resource));
    markerProps.map.panTo({ lat: resource.latitude, lng: resource.longitude });
  };

  const onReady = (_, map) => {
    setMap(map);
  };

  const searchForLocation = location => {
    setCurrentLat(location.lat);
    setCurrentLon(location.lng);
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

  const handleTag = (type, filterType, index, key) => {
    if (type == 0) {
      let activeFilterTags_ = { ...activeFilterTags };
      activeFilterTags_[filterType][index][key] =
        !activeFilterTags_[filterType][index][key];
      setActiveFilterTags(activeFilterTags_);
    } else if (type == 1) {
      let activeFilterTags_ = { ...activeFilterTags };
      if (activeFilterTags_[filterType][index] == key) {
        activeFilterTags_[filterType][index] = null;
      } else {
        activeFilterTags_[filterType][index] = { ...key };
      }
      setActiveFilterTags(activeFilterTags_);
    }
  };

  const clearAllTags = () => {
    setActiveFilterTags(JSON.parse(JSON.stringify(noActiveFilterTags)));
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
            initialCenter={{
              lat: currentLat,
              lng: currentLon
            }}
            center={{
              lat: currentLat,
              lng: currentLon
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
          in={toolbarModal == TOOLBAR_MODAL_SEARCH}
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
          <TutorialModal />
        </Stack>
        <ChooseResource />
        <Filter
          resourceType={resourceType}
          filters={filters}
          handleTag={handleTag}
          clearAll={clearAllTags}
          applyTags={applyTags}
          activeTags={activeFilterTags}
        />
        <AddResourceModalV2 />
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
