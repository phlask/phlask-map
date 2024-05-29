import { Fade } from '@mui/material';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTouchEvents from 'react-touch-events';
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
  setFilterFunction,
  setMapCenter,
  setToolbarModal,
  setUserLocation,
  toggleInfoWindow
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
import MapMarkers from '../MapMarkers/MapMarkers';
import Toolbar from '../Toolbar/Toolbar';

function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//gets the users latitude
function getLat() {
  if ('geolocation' in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        // for when getting location is a success
        var mylat = parseFloat(position.coords.latitude.toFixed(5));
        console.log('lat ' + mylat);

        return mylat;
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error(
          'An error has occured while retrieving location',
          error_message
        );
      }
    );
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser');
  }
}

//gets the users longitutude
function getLon() {
  if ('geolocation' in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        // for when getting location is a success
        var mylon = parseFloat(position.coords.longitude.toFixed(5));
        return mylon;
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error(
          'An error has occured while retrieving location',
          error_message
        );
      }
    );
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser');
  }
}

const LoadingContainer = () => <div>Looking for water!</div>;

const style = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const filters = {
  PHLASK_TYPE_WATER: {
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
  PHLASK_TYPE_FOOD: {
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
  PHLASK_TYPE_FORAGING: {
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
  PHLASK_TYPE_BATHROOM: {
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
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currlat: this.props.mapCenter.lat, // 39.9528,
      currlon: this.props.mapCenter.lng, //-75.1635,
      closestTap: {},
      taps: [],
      tapsLoaded: false,
      unfilteredTaps: this.props.tapsDisplayed,
      filteredTaps: [],
      zoom: 16,
      searchedTap: null,
      anchor: false,
      map: null,
      activeFilterTags: JSON.parse(JSON.stringify(noActiveFilterTags)),
      appliedFilterTags: JSON.parse(JSON.stringify(noActiveFilterTags))
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onIdle = this.onIdle.bind(this);
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     this.setState({
  //       unfilteredTaps: nextProps.tapsDisplayed
  //     });
  // }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        unfilteredTaps: prevProps.tapsDisplayed
      });
    }
  }

  componentDidMount() {
    // console.log('Lat: ' + getLat());
    // console.log('Lon: ' + getLon());

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

  showInfoWindow() {
    this.props.toggleInfoWindow(true);
  }

  //toggle window goes here
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currlat: props.position.lat,
      currlon: props.position.lng
    });

  //close window goes here
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onIdle = (_, map) => {
    this.setState({
      currlat: map.center.lat(),
      currlon: map.center.lng()
    });
  };

  onReady = (_, map) => {
    this.setState({ map: map });
  };

  toggleTapInfo = isExpanded => {
    this.setState({
      isExpanded: isExpanded
    });
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
    if (e.target instanceof HTMLDivElement && this.props.showingInfoWindow) {
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
              <MapMarkers
                map={this.props.map}
                google={this.props.google}
                filterTags={this.state.appliedFilterTags}
              />

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
            phlaskType={this.props.phlaskType}
            filters={filters}
            handleTag={this.handleTag}
            clearAll={this.clearAllTags}
            applyTags={this.applyTags}
            activeTags={this.state.activeFilterTags}
          />
          <AddResourceModalV2 />
          <Toolbar />
        </Stack>
        <SelectedTap />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filtered: state.filterMarkers.filtered,
  handicap: state.filterMarkers.handicap,
  allTaps: state.filterMarkers.allTaps,
  filteredTaps: state.filterMarkers.filteredTaps,
  filterFunction: state.filterMarkers.filterFunction,
  mapCenter: state.filterMarkers.mapCenter,
  phlaskType: state.filterMarkers.phlaskType,
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
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER
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
