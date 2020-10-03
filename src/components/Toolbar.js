import React, { useState } from "react";
import {
  togglePhlaskType,
  PHLASK_TYPE_WATER,
  PHLASK_TYPE_FOOD,
  setSelectedPlace,
  toggleInfoWindow,
  setMapCenter
} from "../actions";
import { connect } from "react-redux";
import Filter from "./Filter";
import FoodFilter from "./FoodFilter";
import styles from "./Toolbar.module.scss";
import phlaskImg from "./images/PHLASK Button.png";
import WaterIcon from "./icons/WaterIcon";
import FoodIcon from "./icons/FoodIcon";
import TutorialModal from "./TutorialModal";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
function getClosest(data, userLocation) {
  // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
  // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
  var distances = data.map((org, index) => {
    return {
      lat: org["lat"],
      lon: org["lon"],
      organization: org["organization"],
      address: org["address"],
      distance: distance(
        userLocation["lat"],
        userLocation["lon"],
        org["lat"],
        org["lon"]
      ),
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
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState(1);

  function handleShow() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    setModalStep(1);
  }

  function handleNext() {
    setModalStep(modalStep + 1);
  }

  function handlePrev() {
    setModalStep(modalStep - 1);
  }

  function switchType(type) {
    if (props.phlaskType !== type) {
      props.togglePhlaskType(type);
    }
  }

  function setClosest() {
    const data =
      props.phlaskType === PHLASK_TYPE_WATER
        ? props.allTaps
        : props.allFoodOrgs;
    const closest = getClosest(data, {
      lat: props.userLocation.lat,
      lon: props.userLocation.lng
    });
    const place = new Promise(() => {
      props.setSelectedPlace(closest.id);
    });
    place
      .then(
        props.setMapCenter({
          lat: closest.lat,
          lng: closest.lon
        })
      )
      .then(props.toggleInfoWindow(true));
  }

  return (
    <div
      className={`${styles.toolbar} ${
        isMobile ? styles.mobileToolbar : styles.desktopToolbar
      }`}
    >
      {!isMobile && (
        <h3
          className={`
            ${styles.title}
            ${
              props.phlaskType === PHLASK_TYPE_WATER
                ? styles.waterTitle
                : styles.foodTitle
            }
          `}
        >
          {props.phlaskType === PHLASK_TYPE_WATER ? "Water Map" : "Food Map"}
        </h3>
      )}
      <div className={styles.filterButton}>
        <button aria-label="show filters">
          {props.phlaskType === PHLASK_TYPE_WATER ? <Filter /> : <FoodFilter />}
        </button>
      </div>
      <button
        className={`${styles.toolbarButton} ${
          styles.waterButton
        } ${props.phlaskType !== PHLASK_TYPE_WATER && styles.disabled}`}
        onClick={() => {
          switchType(PHLASK_TYPE_WATER);
        }}
      >
        <WaterIcon />
      </button>
      {isMobile && (
        <button className={styles.closestTapButton}>
          <img
            className="img"
            src={phlaskImg}
            alt=""
            onClick={setClosest}
          ></img>
        </button>
      )}
      <button
        className={`${styles.toolbarButton} ${
          styles.foodButton
        } ${props.phlaskType === PHLASK_TYPE_WATER && styles.disabled}`}
        onClick={() => {
          switchType(PHLASK_TYPE_FOOD);
        }}
      >
        <FoodIcon />
      </button>
      <button onClick={handleShow} className={styles.infoButton}>
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="2x"
          color="#999"
          className={styles.infoIcon}
        />
      </button>
      <TutorialModal
        show={showModal}
        handleClose={handleClose}
        handleNext={handleNext}
        handlePrev={handlePrev}
        step={modalStep}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  phlaskType: state.phlaskType,
  allTaps: state.allTaps,
  allFoodOrgs: state.allFoodOrgs,
  userLocation: state.userLocation
});

const mapDispatchToProps = {
  togglePhlaskType,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER,
  setSelectedPlace,
  toggleInfoWindow,
  setMapCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
