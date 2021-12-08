import React from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import {
  getFoodOrgs,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
} from "../../actions/actions";
import makeGetVisibleTaps from "../../selectors/foodOrgSelectors";
import foodIcon from "../images/food-marker-icons/food-site.png";
import foodOtherMarkerIcon from "../icons/FoodOtherMarkerIcon";
import foodSchoolMarkerIcon from "../icons/FoodSchoolMarkerIcon";
import foodRecreationMarkerIcon from "../icons/FoodRecreationMarkerIcon";
import foodCongregationMarkerIcon from "../icons/FoodCongregationMarkerIcon";
import FoodOtherFilterIcon from "../icons/FoodOtherFilterIcon";
import FoodSchoolFilterIcon from "../icons/FoodSchoolFilterIcon";
import FoodRecreationFilterIcon from "../icons/FoodRecreationFilterIcon";
import FoodCongregationFilterIcon from "../icons/FoodCongregationFilterIcon";
import "../IndieMarker/IndieMarker.css";
import { isMobile } from "react-device-detect";

class IndieMarker extends React.Component {
  state = {
    icon: "",
    shouldUpdate: true,
    markerVisibility: {
      visibility: this.props.visibleTaps.includes(this.props.org)
        ? "visible"
        : "hidden"
    }
  };

  componentWillUnmount() {
    console.log("unmount");
  }

  shouldComponentUpdate(nextProps) {
    // return this.props.accessTypesHidden.includes(this.props.tap.access) === nextProps.accessTypesHidden.includes(this.props.tap.access)
    // return nextProps.visibleTaps.includes(this.props.tap) === this.props.visibleTaps.includes(this.props.tap)
    // After initial icon is set, shouldUpdate is false.
    // Checks to see if this tap was updated in props
    return !this.state.shouldUpdate
      ? nextProps.visibleTaps.includes(this.props.org) ===
        this.props.visibleTaps.includes(this.props.org)
        ? false
        : true
      : true;
  }

  componentDidUpdate(prevProps) {
    console.log("Did Update");

    // if(this.props.visibleTaps === prevProps.visibleTaps){
    //   this.setState(this.getIcon(this.props.tap.access))
    // }
  }

  componentDidMount() {
    this.setState(
      {
        icon: this.getIcon(this.props.org.access)
      },
      () => {
        this.setState({
          shouldUpdate: false
        });
      }
    );
  }

  getIcon(access, isForSelection = false) {
    if (!this.props.accessTypesHidden.includes(access)) {
      switch (access) {
        case "Food Site":
          return !isForSelection ? (
            { url: foodOtherMarkerIcon(48, 48) }
          ) : (
            <FoodOtherFilterIcon />
          );
        case "School":
          return !isForSelection ? (
            { url: foodSchoolMarkerIcon(48, 48) }
          ) : (
            <FoodSchoolFilterIcon />
          );
        case "Charter School":
          return !isForSelection ? (
            { url: foodRecreationMarkerIcon(48, 48) }
          ) : (
            <FoodRecreationFilterIcon />
          );
        case "PHA Community Center":
          return !isForSelection ? (
            { url: foodCongregationMarkerIcon(48, 48) }
          ) : (
            <FoodCongregationFilterIcon />
          );
        default:
          return !isForSelection ? (
            { url: foodOtherMarkerIcon(48, 48) }
          ) : (
            <FoodOtherFilterIcon />
          );
      }
    } else {
      return { foodIcon };
    }
  }

  onMarkerClick(org) {
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(org);
    //this.props.setMapCenter(org.position);
    if (isMobile) {
      // https://stackoverflow.com/questions/10656743/how-to-offset-the-center-point-in-google-maps-api-v3
      const latlng = new this.props.google.maps.LatLng(
        org.position.lat,
        org.position.lng
      );
      const offsetx = 0;
      // offset by half the height of modal minus height of the marker icon
      const modalHeight = document.getElementById("tap-info-container-mobile")
        .offsetHeight;
      const offsety = Math.floor(modalHeight / 2 - 20);
      var scale = Math.pow(2, this.props.map.getZoom());
      var worldCoordinateCenter = this.props.map
        .getProjection()
        .fromLatLngToPoint(latlng);
      var pixelOffset = new this.props.google.maps.Point(
        offsetx / scale || 0,
        offsety / scale || 0
      );
      var worldCoordinateNewCenter = new this.props.google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
      );
      var newCenter = this.props.map
        .getProjection()
        .fromPointToLatLng(worldCoordinateNewCenter);
      const newLatlng = { lat: newCenter.lat(), lng: newCenter.lng() };
      this.props.setMapCenter(newLatlng);
    } else {
      this.props.setMapCenter(org.position);
    }
  }

  render() {
    console.log("rendered marker");

    return (
      // Doesn't Render Marker as child of div,
      // so can't use this method to style individual Markers
      !this.props.visibleTaps.includes(this.props.org) ? (
        []
      ) : (
        <div
        // className="testMarker"
        // style={this.state.markerVisibility}
        >
          <Marker
            access={this.props.org.access}
            map={this.props.map}
            google={this.props.google}
            mapCenter={this.props.mapCenter}
            key={this.props.key}
            organization={this.props.org.organization}
            address={this.props.org.address}
            hours={this.props.org.hours}
            idRequired={this.props.org.id_required === "yes" ? true : false}
            kidOnly={this.props.org.kid_only === "yes" ? true : false}
            description={this.props.org.description}
            img={this.props.org.images}
            onClick={this.onMarkerClick.bind(this)}
            position={{ lat: this.props.org.lat, lng: this.props.org.lon }}
            icon={this.getIcon(this.props.org.access)}
            infoIcon={this.getIcon(this.props.org.access, true)}
            // The lat and lon properties were added to support the object-based
            // setting for SET_SELECTED_PLACE redux action. Object structure consistency is needed in order
            // for getWalkingDurationAndTimes() in the SelectedTap component to work properly.
            lat={this.props.org.lat}
            lon={this.props.org.lon}
          />
        </div>
      )
    );
  }
}

const makeMapStateToProps = () => {
  const getVisibleTaps = makeGetVisibleTaps();
  const mapStateToProps = (state, props) => {
    return {
      visibleTaps: getVisibleTaps(state, props),
      // filtered: state.tapFilters.filtered,
      // handicap: state.tapFilters.handicap,
      accessTypesHidden: state.foodFilters.accessTypesHidden,
      allTaps: state.allFoodOrgs,
      mapCenter: state.mapCenter
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  getFoodOrgs,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
};

export default connect(makeMapStateToProps, mapDispatchToProps)(IndieMarker);
