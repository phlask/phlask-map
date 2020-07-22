/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { 
  togglePhlaskType, 
  PHLASK_TYPE_WATER, 
  PHLASK_TYPE_FOOD,
  setSelectedPlace,
  toggleInfoWindow,
  setMapCenter } from '../actions'
import { connect } from 'react-redux'
import Filter from "./Filter";
import FoodFilter from "./FoodFilter";
import TypeToggle from './TypeToggle.js'
import './Toolbar.css'
import phlaskImg from './images/PHLASK Button.png'
import waterImg from './images/waterButton.png'
import foodImg from './images/foodButton.png'
import sliderImg from './images/slider.png'

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
function getClosest(data, userLocation) {
 // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
 // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
 var distances = data.map((org,index) => {
   return {
     lat: org["lat"],
     lon: org["lon"],
     organization: org["organization"],
     address: org["address"],
     distance: distance(userLocation["lat"], userLocation["lon"], org["lat"], org["lon"]),
     id: index
   };
 });
 var minDistance = Math.min(...distances.map(d => d.distance));

 var closestTap = {
   organization: "",
   address: "",
   lat: "",
   lon: "",
   id: ""
 };

 for (var i = 0; i < distances.length; i++) {
   if (distances[i].distance === minDistance) {
     closestTap.lat = distances[i].lat;
     closestTap.lon = distances[i].lon;
     closestTap.organization = distances[i].organization;
     closestTap.address = distances[i].address;
     closestTap.id = distances[i].id;
   }
 }

 return closestTap;
}

function getCoordinates() {
 return new Promise(function(resolve, reject) {
   navigator.geolocation.getCurrentPosition(resolve, reject);
 });
}

function Toolbar(props) {

  function switchType(type){
    if(props.phlaskType !== type){
      props.togglePhlaskType(type)
    }
  }

  function setClosest(){
    
    const data = props.phlaskType === PHLASK_TYPE_WATER
      ? props.allTaps
      : props.allFoodOrgs
    const closest = getClosest(data, {
      lat: props.userLocation.lat,
      lon: props.userLocation.lng
    });
    const place = new Promise(() =>{
      props.setSelectedPlace(closest.id)
    })
    place.then(
      props.setMapCenter({
        lat: closest.lat,
        lng: closest.lon
      })
    ).then(
      props.toggleInfoWindow(true)
    )
  }
  
  return (
    <div id="toolbar-container">
      <div id='slider-btn'>
        {props.phlaskType === PHLASK_TYPE_WATER 
          ? <Filter/>
          : <FoodFilter/>
        }
      </div>
      <div 
        className='toolbar-item'
        onClick={()=>{switchType(PHLASK_TYPE_WATER)}}
      >
          <img className='img' src={waterImg} alt=''></img>
      </div>
      <div id='phlask-btn'>
        <img 
          className='img' 
          src={phlaskImg} 
          alt=''
          onClick={setClosest}
        ></img>
      </div>
      <div 
        className='toolbar-item'
        onClick={()=>{switchType(PHLASK_TYPE_FOOD)}}
      >
          <img className='img' src={foodImg} alt=''></img>
      </div>
      {/* <TypeToggle/>
      <Filter /> */}
    </div>
  );
}

const mapStateToProps = state => ({
  phlaskType: state.phlaskType,
  allTaps: state.allTaps,
  allFoodOrgs: state.allFoodOrgs,
  userLocation: state.userLocation
})

const mapDispatchToProps = { togglePhlaskType, PHLASK_TYPE_FOOD, PHLASK_TYPE_WATER, setSelectedPlace, toggleInfoWindow, setMapCenter}

export default connect(mapStateToProps,mapDispatchToProps)(Toolbar)