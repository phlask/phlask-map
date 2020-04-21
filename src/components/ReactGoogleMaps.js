import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import ClosestTap from "./ClosestTap";
import SearchBar from "./SearchBar";
import "./ReactGoogleMaps.css";
import { connect } from "react-redux";
import MapMarkers from "./MapMarkers"

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
function closest(data, v) {
  // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
  // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
  var distances = data.map(function(p) {
    return {
      lat: p["lat"],
      lon: p["lon"],
      organization: p["organization"],
      address: p["address"],
      distance: distance(v["lat"], v["lon"], p["lat"], p["lon"])
    };
  });
  var minDistance = Math.min(...distances.map(d => d.distance));

  var closestTap = {
    organization: "",
    address: "",
    lat: "",
    lon: ""
  };

  for (var i = 0; i < distances.length; i++) {
    if (distances[i].distance === minDistance) {
      closestTap.lat = distances[i].lat;
      closestTap.lon = distances[i].lon;
      closestTap.organization = distances[i].organization;
      closestTap.address = distances[i].address;
    }
  }

  return closestTap;
}

function getCoordinates() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//gets the users latitude
function getLat() {
  if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        // for when getting location is a success
        var mylat = parseFloat(position.coords.latitude.toFixed(5));
        return mylat;
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error(
          "An error has occured while retrieving location",
          error_message
        );
      }
    );
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log("geolocation is not enabled on this browser");
  }
}

//gets the users longitutude
function getLon() {
  if ("geolocation" in navigator) {
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
          "An error has occured while retrieving location",
          error_message
        );
      }
    );
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log("geolocation is not enabled on this browser");
  }
}

const LoadingContainer = props => <div>Looking for water!</div>;

const style = {
  width: "100%",
  height: "81%",
  position: "relative"
};

export class ReactGoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currlat: getLat(), // 39.9528,
      currlon: getLon(), //-75.1635,
      taps: [],
      tapsLoaded: false,
      unfilteredTaps: this.props.tapsDisplayed,
      filteredTaps: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      unfilteredTaps: nextProps.tapsDisplayed
    });
  }

  componentDidMount() {

    getCoordinates().then(position => {
      if (isNaN(position.coords.latitude) || isNaN(position.coords.longitude)) {
        this.setState({ currlat: parseFloat("39.952744") });
        this.setState({ currlon: parseFloat("-75.163500") });
      } else {
        this.setState({ currlat: position.coords.latitude });
        this.setState({ currlon: position.coords.longitude });
      }
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

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

  searchForLocation = location => {
    this.setState({ currlat: location.lat, currlon: location.lng });
  };

  render() {
    // if (this.props.allTaps.length) {
      // var closestTap = closest(this.props.allTaps, {
      //   lat: this.state.currlat,
      //   lon: this.state.currlon
      // });
      return (
        <div>
          {/* <ClosestTap
            lat={closestTap.lat}
            lon={closestTap.lon}
            org={closestTap.organization}
            address={closestTap.address}
          /> */}

          <Map
            google={this.props.google}
            className={"map"}
            style={style}
            zoom={16}
            initialCenter={{
              lat: this.state.currlat,
              lng: this.state.currlon
            }}
            center={{ lat: this.state.currlat, lng: this.state.currlon }}
          >
          <MapMarkers 
            map={this.props.map}
            google={this.props.google}
            mapCenter={this.props.mapCenter}
          />

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4 className="infoWindow">
                  {this.state.selectedPlace.organization}
                </h4>
                <h5>{this.state.selectedPlace.address}</h5>
              </div>
            </InfoWindow>
          </Map>
          <div className="searchBarContainer">
            <SearchBar
              className="searchBar"
              search={location => this.searchForLocation(location)}
            />
          </div>
        </div>
      );
    } //else {
    //   return <div>Loading taps...</div>;
    // }
  // }
}

// const mapDispatchToProps = { getTaps };

export default connect()(
  GoogleApiWrapper({
    apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
    LoadingContainer: LoadingContainer
  })(ReactGoogleMaps)
);
