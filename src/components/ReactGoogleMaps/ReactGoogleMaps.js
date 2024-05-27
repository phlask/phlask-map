import { Fade } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTouchEvents from 'react-touch-events';
import {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  setFilterFunction,
  setMapCenter,
  setToolbarModal,
  setUserLocation,
  toggleInfoWindow, getResources, setSelectedPlace
} from '../../actions/actions';
import SearchBar from '../SearchBar/SearchBar';
import SelectedTap from '../SelectedTap/SelectedTap';
import styles from './ReactGoogleMaps.module.scss';
// import Legend from "./Legend";
// Temporary Food/Water Toggle
import Stack from '@mui/material/Stack';
import { isMobile } from 'react-device-detect';
import AddResourceModalV2 from '../AddResourceModal/AddResourceModalV2';
import ChooseResource from '../ChooseResource/ChooseResource';
import TutorialModal from '../TutorialModal/TutorialModal';
import Filter from '../Filter/Filter';
import Toolbar from '../Toolbar/Toolbar';
import phlaskMarkerIconV2 from "../icons/PhlaskMarkerIconV2";
import selectFilteredResource from "../../selectors/tapSelectors";

// // Actual Magic: https://stackoverflow.com/a/41337005
// // Distance calculates the distance between two lat/lon pairs
// function distance(lat1,
//    lon1, lat2, lon2) {
//   var p = 0.017453292519943295;
//   var a =
//     0.5 -
//     Math.cos((lat2 - lat1) * p) / 2 +
//     (Math.cos(lat1 * p) *
//       Math.cos(lat2 * p) *
//       (1 - Math.cos((lon2 - lon1) * p))) /
//       2;
//   return 12742 * Math.asin(Math.sqrt(a));
// }

// // Takes an array of objects with lat and lon properties as well as a single object with lat and lon
// // properties and finds the closest point (by shortest distance).
// function closest(data, v) {
//   // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
//   // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
//   var distances = data.map(function(p) {
//     return {
//       lat: p["lat"],
//       lon: p["lon"],
//       // organization: p["organization"],
//       // address: p["address"],
//       distance: distance(v["lat"], v["lon"], p["lat"], p["lon"])
//     };
//   });
//   var minDistance = Math.min(...distances.map(d => d.distance));

//   var closestTap = {
//     // organization: "",
//     // address: "",
//     lat: "",
//     lon: ""
//   };

//   for (var i = 0; i < distances.length; i++) {
//     if (distances[i].distance === minDistance) {
//       closestTap.lat = distances[i].lat;
//       closestTap.lon = distances[i].lon;
//       // closestTap.organization = distances[i].organization;
//       // closestTap.address = distances[i].address;

//     }
//   }

//   return closestTap;
// }

function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const LoadingContainer = props => <div>Looking for water!</div>;

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
          'Water jug',
          'Soda machine',
          'Pitcher',
          'Water cooler'
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

export class ReactGoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      activeMarker: {},
      currlat: this.props.mapCenter.lat, // 39.9528,
      currlon: this.props.mapCenter.lng, //-75.1635,
      closestTap: {},
      taps: [],
      tapsLoaded: false,
      zoom: 16,
      searchedTap: null,
      anchor: false,
      map: null,
      activeFilterTags: JSON.parse(JSON.stringify(noActiveFilterTags)),
      appliedFilterTags: JSON.parse(JSON.stringify(noActiveFilterTags))
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {

    // Fetch and load the resources
    if (!this.props.allResources.length && this.props.getResources) {
      this.props.getResources();
    }

    getCoordinates().then(
      position => {
        if (
          isNaN(position.coords.latitude) ||
          isNaN(position.coords.longitude)
        ) {
          this.setState({
            currlat: parseFloat('39.952744'),
            currlon: parseFloat('-75.163500')
          });
        } else {
          this.props.setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          this.props.setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          this.setState({
            currlat: position.coords.latitude,
            currlon: position.coords.longitude
          });
        }
      },
      () => {}
    );
  }

  //toggle window goes here
  onMarkerClick = (resource, markerProps) => {
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(resource);
    markerProps.map.panTo({ lat: resource.latitude, lng: resource.longitude });
  }

  onReady = (_, map) => {
    this.setState({ map: map });
  };

  searchForLocation = location => {
    this.setState({
      currlat: location.lat,
      currlon: location.lng,
      zoom: 16,
      searchedTap: { lat: location.lat, lng: location.lng }
    });
  };

  handleTap = e => {
    if (e.target instanceof HTMLDivElement && this.props.showingInfoWindow && !isMobile) {
      this.props.toggleInfoWindow(false);
    }
  };

  toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    this.setState(prevState => ({
      anchor: !prevState.anchor
    }));
  };

  handleTag = (type, filterType, index, key) => {
    if (type == 0) {
      let activeFilterTags_ = this.state.activeFilterTags;
      activeFilterTags_[filterType][index][key] =
        !activeFilterTags_[filterType][index][key];
      this.setState({ activeFilterTags: activeFilterTags_ });
    } else if (type == 1) {
      let activeFilterTags_ = this.state.activeFilterTags;
      if (activeFilterTags_[filterType][index] == key) {
        activeFilterTags_[filterType][index] = null;
      } else {
        activeFilterTags_[filterType][index] = key;
      }
      this.setState({
        activeFilterTags: activeFilterTags_
      });
    }
  };

  clearAllTags = () => {
    this.setState({
      activeFilterTags: JSON.parse(JSON.stringify(noActiveFilterTags))
    });
  };

  applyTags = () => {
    this.setState({
      appliedFilterTags: JSON.parse(JSON.stringify(this.state.activeFilterTags))
    });
  };

  render() {
    return (
      <div id="react-google-map" className={styles.mapContainer}>
        <ReactTouchEvents onTap={this.handleTap.bind(this)}>
          <div>
            <Map
              google={this.props.google}
              className={'map'}
              style={style}
              zoom={this.state.zoom}
              zoomControl={!isMobile}
              streetViewControl={false}
              mapTypeControl={false}
              rotateControl={false}
              fullscreenControl={false}
              onReady={this.onReady}
              initialCenter={{
                lat: this.state.currlat,
                lng: this.state.currlon
              }}
              center={{
                lat: this.state.currlat,
                lng: this.state.currlon
              }}
              filterTags={this.state.appliedFilterTags}
            >

              {this.props.filteredResources.map((resource, index) => {
                return (
                  <Marker
                    key={index}
                    onClick={(markerProps) => {
                      this.onMarkerClick(resource, markerProps)
                    }}
                    position={{ lat: resource.latitude, lng: resource.longitude }}
                    icon={{ url: phlaskMarkerIconV2(resource.resource_type,56, 56) }} />
                )
              })}

              {this.state.searchedTap != null && (
                <Marker
                  name={'Your Search Result'}
                  position={this.state.searchedTap}
                />
              )}
            </Map>
          </div>
        </ReactTouchEvents>
        {isMobile && (
          <Fade
            in={this.props.toolbarModal == TOOLBAR_MODAL_SEARCH}
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
              search={location => this.searchForLocation(location)}
            />
            <TutorialModal
              showButton={isMobile ? !this.state.isSearchBarShown : false}
            />
          </Stack>
          <ChooseResource />
          <Filter
            resourceType={this.props.resourceType}
            filters={filters}
            handleTag={this.handleTag}
            clearAll={this.clearAllTags}
            applyTags={this.applyTags}
            activeTags={this.state.activeFilterTags}
          />
          <AddResourceModalV2 />
          <Toolbar
            map={this.state.map}
          />
        </Stack>
        <SelectedTap />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filtered: state.filterMarkers.filtered,
  handicap: state.filterMarkers.handicap,
  allResources: state.filterMarkers.allResources,
  filteredResources: selectFilteredResource(state),
  filterFunction: state.filterMarkers.filterFunction,
  mapCenter: state.filterMarkers.mapCenter,
  resourceType: state.filterMarkers.resourceType,
  showingInfoWindow: state.filterMarkers.showingInfoWindow,
  toolbarModal: state.filterMarkers.toolbarModal
  // infoIsExpanded: state.infoIsExpanded
});

const mapDispatchToProps = {
  setFilterFunction,
  toggleInfoWindow,
  setUserLocation,
  setMapCenter,
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  setToolbarModal,
  setSelectedPlace,
  getResources
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  GoogleApiWrapper({
    apiKey: 'AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I',
    LoadingContainer: LoadingContainer,
    version: 'quarterly'
  })(ReactGoogleMaps)
);
