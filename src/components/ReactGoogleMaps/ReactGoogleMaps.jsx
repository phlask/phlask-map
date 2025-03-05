import { Fade } from '@mui/material';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useIsMobile from 'hooks/useIsMobile';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import Stack from '@mui/material/Stack';
import {
  toggleInfoWindow,
  getResources,
  setSelectedPlace,
  setFilterFunction,
  resetFilterFunction,
  removeFilterFunction,
  removeEntryFilterFunction,
  setEntryFilterFunction
} from 'actions/actions';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedTap from 'components/SelectedTap/SelectedTap';
import AddResourceModalV2 from 'components/AddResourceModal/AddResourceModalV2';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import Filter from 'components/Filter/Filter';
import Toolbar from 'components/Toolbar/Toolbar';
import PinWaterActive from 'components/icons/PinWaterActive';
import PinForagingActive from 'components/icons/PinForagingActive';
import PinFoodActive from 'components/icons/PinFoodActive';
import PinBathroomActive from 'components/icons/PinBathroomActive';
import phlaskMarkerIconV2 from 'components/icons/PhlaskMarkerIconV2';
import selectFilteredResource from 'selectors/resourceSelectors';
import {
  BATHROOM_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  WATER_RESOURCE_TYPE
} from 'types/ResourceEntry';

import styles from './ReactGoogleMaps.module.scss';

function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const style = {
  width: '100%',
  height: '100vh',
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

const noActiveFilterTags = Object.entries(filters).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: value.categories.map(category => {
      if (category.type === 0) {
        return new Array(category.tags.length).fill(false);
      }
      return category.tags.length;
    })
  }),
  {}
);

const ReactGoogleMaps = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const filteredResources = useSelector(state => selectFilteredResource(state));
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const selectedPlace = useSelector(state => state.filterMarkers.selectedPlace);
  const searchBarMapTintOn = useSelector(
    state => state.filterMarkers.searchBarMapTintOn
  );
  const [searchedTap, setSearchedTap] = useState(null);
  const [map, setMap] = useState(null);
  const [activeFilterTags, setActiveFilterTags] = useState(
    JSON.parse(JSON.stringify(noActiveFilterTags))
  );

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  useEffect(() => {
    if (!map) {
      return;
    }
    const fetchCoordinates = async () => {
      try {
        const position = await getCoordinates();
        map.panTo({ lat: position.latitude, lng: position.longitude });
      } catch (error) {
        // Do nothing
      }
    };

    fetchCoordinates();
  }, [map]);

  // toggle window goes here
  const onMarkerClick = resource => {
    dispatch(
      toggleInfoWindow({
        isShown: true,
        infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
      })
    );

    map.panTo({
      lat: Number(resource.latitude),
      lng: Number(resource.longitude)
    });
    dispatch(setSelectedPlace(resource));
  };

  const onReady = event => {
    setMap(prev => prev || event.map);
  };

  const searchForLocation = location => {
    map.panTo(location);
    map.setZoom(16);
    setSearchedTap({ lat: Number(location.lat), lng: Number(location.lng) });
  };

  const handleTag = (type, filterType, filterTag, index, key) => {
    const updatedActiveFilterTags = { ...activeFilterTags };

    // handles multi select filters
    if (type === 0) {
      if (updatedActiveFilterTags[filterType][index][key]) {
        dispatch(removeFilterFunction({ tag: filterTag }));
      } else {
        dispatch(setFilterFunction({ tag: filterTag }));
      }
      updatedActiveFilterTags[filterType][index][key] =
        !updatedActiveFilterTags[filterType][index][key];
      setActiveFilterTags(updatedActiveFilterTags);
    }
    // handles single select entry/organization filters
    else if (type === 1) {
      if (updatedActiveFilterTags[filterType][index] === key) {
        updatedActiveFilterTags[filterType][index] = null;
        dispatch(removeEntryFilterFunction());
      } else {
        updatedActiveFilterTags[filterType][index] = key;
        dispatch(setEntryFilterFunction({ tag: filterTag }));
      }
      setActiveFilterTags(updatedActiveFilterTags);
    }
  };

  const clearAllTags = () => {
    setActiveFilterTags(JSON.parse(JSON.stringify(noActiveFilterTags)));
    dispatch(resetFilterFunction());
  };

  return (
    <APIProvider
      apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
      libraries={['places']}
    >
      <Map
        className={styles.mapContainer}
        style={style}
        defaultZoom={16}
        zoomControl={!isMobile}
        streetViewControl={false}
        mapTypeControl={false}
        rotateControl={false}
        fullscreenControl={false}
        onIdle={onReady}
        defaultCenter={{
          lat: CITY_HALL_COORDINATES.latitude,
          lng: CITY_HALL_COORDINATES.longitude
        }}
        mapId="DEMO_MAP_ID"
      >
        {filteredResources.map((resource, index) => {
          const getPinUrl = () => {
            const isActiveMarker =
              selectedPlace?.latitude === resource.latitude &&
              selectedPlace?.longitude === resource.longitude;

            if (!resource.resource_type) {
              return null;
            }

            if (!isActiveMarker) {
              return phlaskMarkerIconV2(resource.resource_type, 56, 56);
            }
            return {
              [WATER_RESOURCE_TYPE]: PinWaterActive(),
              [FOOD_RESOURCE_TYPE]: PinFoodActive(),
              [FORAGE_RESOURCE_TYPE]: PinForagingActive(),
              [BATHROOM_RESOURCE_TYPE]: PinBathroomActive()
            }[resource.resource_type];
          };

          return (
            <Marker
              key={resource.id}
              onClick={() => onMarkerClick(resource)}
              position={{ lat: resource.latitude, lng: resource.longitude }}
              icon={{ url: getPinUrl() }}
              // This is used for marker targeting as we are unable to add custom properties with this library.
              // We should eventually replace this so that we can still enable the use of screen readers in the future.
              title={`data-cy-${index}`}
            />
          );
        })}

        {searchedTap ? (
          <Marker
            name="Your Search Result"
            position={searchedTap}
            title="data-cy-search-result"
          />
        ) : null}

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
            />
          </Fade>
        )}
        <Stack position="absolute" bottom="0px" height="143px" width="34%">
          <Stack direction="row" spacing={2}>
            <SearchBar
              className="searchBar"
              search={location => searchForLocation(location)}
            />
          </Stack>
          <ChooseResourceType />
          <Filter
            resourceType={resourceType}
            filters={filters}
            handleTag={handleTag}
            clearAll={clearAllTags}
            activeTags={activeFilterTags}
          />
          <AddResourceModalV2 />
          <Toolbar />
        </Stack>
        <SelectedTap />
      </Map>
    </APIProvider>
  );
};

export default ReactGoogleMaps;
