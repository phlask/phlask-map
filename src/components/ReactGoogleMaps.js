import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
 
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
            position={{lat: 39.9526, lng: -75.1652}}/>
      </Map>
    );
  }
}

 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"),
  LoadingContainer: LoadingContainer
})(ReactGoogleMaps)