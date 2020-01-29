import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
import * as firebase from "firebase";
import ClosestTap from "./ClosestTap";
import SearchBar from "./SearchBar";
import "./ReactGoogleMaps.css";

const config = {
  apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
  authDomain: "phlask-web-map.firebaseapp.com",
  databaseURL: "https://phlask-web-map.firebaseio.com",
  projectId: "phlask-web-map",
  storageBucket: "phlask-web-map.appspot.com",
  messagingSenderId: "428394983826"
};

firebase.initializeApp(config);

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

function getTaps() {
  return firebase
    .database()
    .ref("/")
    .once("value")
    .then(function(snapshot) {
      var allTaps = [];
      var item;
      for (item in snapshot.val()) {
        if (snapshot.val()[item].access === "WM") {
          continue;
        }
        if (snapshot.val()[item].active === "N") {
          continue;
        }
        if (snapshot.val()[item].access === "TrashAcademy") {
          continue;
        }
        allTaps.push(snapshot.val()[item]);
      }
      return allTaps;
    });
}

function getCoordinates() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const LoadingContainer = props => <div>Looking for water!</div>;

const style = {
  width: "100%",
  height: "90%",
  position: "relative"
};

export class ReactGoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currlat: parseFloat("39.952744"),
      currlon: parseFloat("-75.163500"),
      taps: [],
      tapsLoaded: false
    };
  }

  componentDidMount() {
    getTaps().then(taps => {
      this.setState(oldState => {
        return { ...oldState, taps: taps };
      });
    });
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

  getIcon(access) {
    switch (access) {
      case "Public":
        return "https://i.imgur.com/M12e1HV.png";
      case "Private-Shared":
        return "https://i.imgur.com/DXMMxXR.png";
      case "Private":
        return "https://i.imgur.com/kt825XO.png";
      case "Restricted":
        return "https://i.imgur.com/5NOdOyY.png";
      case "Semi-public":
        return "https://i.imgur.com/DXMMxXR.png";
      case "TrashAcademy":
        return "https://i.imgur.com/fXTeEKL.png";
      default:
        break;
    }
  }

  searchForLocation = location => {
    this.setState({ currlat: location.lat, currlon: location.lng });
  };

  render() {
    if (this.state.taps.length) {
      var closestTap = closest(this.state.taps, {
        lat: this.state.currlat,
        lon: this.state.currlon
      });
      return (
        <div>
          <ClosestTap
            lat={closestTap.lat}
            lon={closestTap.lon}
            org={closestTap.organization}
            address={closestTap.address}
          />

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
            <Marker
              key="current_pos"
              name={"Current Pos"}
              position={{ lat: this.state.currlat, lng: this.state.currlon }}
              onClick={this.onMarkerClick}
            />

            {this.state.taps.map((tap, index) => (
              <Marker
                key={index}
                name={tap.tapnum}
                organization={tap.organization}
                address={tap.address}
                description={tap.description}
                filtration={tap.filtration}
                handicap={tap.handicap}
                service={tap.service}
                tap_type={tap.tap_type}
                norms_rules={tap.norms_rules}
                vessel={tap.vessel}
                img={tap.images}
                onClick={this.onMarkerClick}
                position={{ lat: tap.lat, lng: tap.lon }}
                icon={{
                  url: this.getIcon(tap.access)
                }}
              />
            ))}
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
    } else {
      return <div>Loading taps...</div>;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
  LoadingContainer: LoadingContainer
})(ReactGoogleMaps);
