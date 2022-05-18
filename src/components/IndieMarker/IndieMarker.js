import React from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import {
  getTaps,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
} from "../../actions/actions";
import makeGetVisibleTaps from "../../selectors/tapSelectors";
import "./IndieMarker.css";
import phlaskMarkerIcon from "../icons/PhlaskMarkerIcon";
import phlaskFilterIcon from "../icons/PhlaskFilterIcon";
import { isMobile } from "react-device-detect";

class IndieMarker extends React.Component {
  state = {
    icon: "",
    shouldUpdate: true,
    markerVisibility: {
      visibility: this.props.visibleTaps.includes(this.props.tap)
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
      ? nextProps.visibleTaps.includes(this.props.tap) ===
        this.props.visibleTaps.includes(this.props.tap)
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
        icon: this.getIcon(this.props.tap.access)
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
        case "Public":
        case "Private-Shared":
        case "Private":
        case "Restricted":
        case "Semi-public":
          return !isForSelection
            ? { url: phlaskMarkerIcon(access, 48, 48) }
            : phlaskFilterIcon(access, 35, 35);
        case "TrashAcademy":
          return "https://i.imgur.com/fXTeEKL.png";
        default:
          return "https://i.imgur.com/kKXG3TO.png";
      }
    } else {
      return "https://i.imgur.com/kKXG3TO.png";
    }
  }

  onMarkerClick(tap) {
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(tap);
    //this.props.setMapCenter(tap.position);
    if (isMobile) {
      // https://stackoverflow.com/questions/10656743/how-to-offset-the-center-point-in-google-maps-api-v3
      const latlng = new this.props.google.maps.LatLng(
        tap.position.lat,
        tap.position.lng
      );
      const offsetx = 0;
      // offset by half the height of modal minus height of the marker icon
      let modalHeight = 0;
      try {
        modalHeight = document.getElementById("tap-info-container-mobile")
          .offsetHeight;
      } catch (error) {
        console.log("There was an error getting element in IndieMarker. This was lazily fixed for now.")
      }
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
      this.props.setMapCenter(tap.position);
    }
  }

  render() {
    console.log("rendered marker");

    return (
      // Doesn't Render Marker as child of div,
      // so can't use this method to style individual Markers
      !this.props.visibleTaps.includes(this.props.tap) ? (
        []
      ) : (
        <div
        // className="testMarker"
        // style={this.state.markerVisibility}
        >
          <Marker
            access={this.props.tap.access}
            map={this.props.map}
            google={this.props.google}
            mapCenter={this.props.mapCenter}
            key={this.props.key}
            name={this.props.tap.tapnum}
            organization={this.props.tap.organization}
            address={this.props.tap.address}
            hours={this.props.tap.hours}
            description={this.props.tap.description}
            filtration={this.props.tap.filtration}
            handicap={this.props.tap.handicap}
            service={this.props.tap.service}
            sparkling={
              "sparkling" in this.props.tap ? this.props.tap.sparkling : "no"
            }
            tap_type={this.props.tap.tap_type}
            norms_rules={this.props.tap.norms_rules}
            vessel={this.props.tap.vessel}
            img={this.props.tap.images}
            onClick={this.onMarkerClick.bind(this)}
            position={{ lat: this.props.tap.lat, lng: this.props.tap.lon }}
            icon={this.getIcon(this.props.tap.access)}
            infoIcon={this.getIcon(this.props.tap.access, true)}
            // The lat and lon properties were added to support the object-based
            // setting for SET_SELECTED_PLACE redux action. Object structure consistency is needed in order
            // for getWalkingDurationAndTimes() in the SelectedTap component to work properly.
            lat={this.props.tap.lat}
            lon={this.props.tap.lon}
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
      accessTypesHidden: state.tapFilters.accessTypesHidden,
      allTaps: state.allTaps,
      mapCenter: state.mapCenter
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  getTaps,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
};

export default connect(makeMapStateToProps, mapDispatchToProps)(IndieMarker);
