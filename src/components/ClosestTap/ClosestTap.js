import React, { Component } from "react";
import {Card} from "react-bootstrap";
import { connect } from 'react-redux'

// Actual Magic: https://stackoverflow.com/a/41337005
// Distance calculates the distance between two lat/lon pairs
function distance(lat1,
  lon1, lat2, lon2) {
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
function getClosest(data, v) {
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


export class ClosestTap extends Component {
  constructor(props) {
    super(props);

    this.state = {
        text : "Click for nearest tap!"
    };

    // this.change = this.change.bind(this);
  }

  setClosest(){
    const closest = getClosest(this.props.allTaps, {
      lat: this.props.userLocation.lat,
      lon: this.props.userLocation.lng
    });
    console.log(closest);
  }

  // change(){
  //   if(this.props.lat === "" || this.props.lon === ""){
  //     this.setState({
  //       text: <p>
  //       The closest tap feature is unavailable. We require permission
  //       to access your location to provide it.
  //     </p>
  //     })
  //   }
  //   else{
  //     this.setState({
  //       text: <p>
  //       The closest tap is: {this.props.org} <br />
  //       Located at:   &nbsp;
  //       <a
  //         href={
  //           "https://www.google.com/maps/search/?api=1&query=" +
  //           this.props.lat +
  //           ", " +
  //           this.props.lon
  //         }
  //       >
  //         {this.props.address}
  //       </a>
  //     </p>  
  //     });
  //   }
  // }

  render() {
    return (
      <div className = "closestTap">
        <Card>
          <Card.Header onClick={this.setClosest.bind(this)}>
              {this.state.text}
          </Card.Header>
            
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.userLocation,
  allTaps: state.allTaps
})

export default connect(mapStateToProps)(ClosestTap);
