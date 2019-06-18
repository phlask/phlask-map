import {Map, /*InfoWindow,*/ Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'

var mylat;
var mylon

if ("geolocation" in navigator) {
  console.log("here");
  // check if geolocation is supported/enabled on current browser
  navigator.geolocation.getCurrentPosition(
   function success(position) {
     // for when getting location is a success
     mylat = position.coords.latitude;
     mylon = position.coords.longitude;
     console.log('latitude', position.coords.latitude, 
                 'longitude', position.coords.longitude);
   },
  function error(error_message) {
    // for when getting location results in an error
    console.error('An error has occured while retrieving location', error_message)
  });

} else {
  // geolocation is not supported
  // get your location some other way
  console.log('geolocation is not enabled on this browser')
}


const LoadingContainer = (props) => (
  <div>Looking for water!</div>
)

const style = {
  width: '100%',
  height: '90%',
  position: 'relative'
}

export class ReactGoogleMaps extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

  render() {
    return (
      <Map google={this.props.google} className = {'map'} style={style} zoom={12} initialCenter={{
            lat: 39.9526,
            lng: -75.1652
          }}>

        <Marker
            name={'Current Pos'}
            position={{lat: mylat, lng: mylon}}/>
      </Map>
    );
  }
}

 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"),
  LoadingContainer: LoadingContainer
})(ReactGoogleMaps)