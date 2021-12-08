import React, { Component } from "react";
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
import IndieFoodMarker from "./IndieFoodMarker";

export class MapMarkersFood extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.allFoodOrgs.length) {
      this.props.getFoodOrgs();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.visibleTaps === this.props.visibleTaps ? false : true;
  }

  getIcon(access) {
    if (!this.props.accessTypesHidden.includes(access)) {
      switch (access) {
        case "Food Site":
          return require("../images/food-marker-icons/food-site.png");
        case "School":
          return require("../images/food-marker-icons/school.png");
        case "Charter School":
          return require("../images/food-marker-icons/charter-school.png");
        case "PHA Community Center":
          return require("../images/food-marker-icons/pha.png");
        default:
          return "../images/foodIcon.png";
      }
    } else {
      return { foodIcon };
    }
  }

  onMarkerClick(org) {
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(org);
    this.props.setMapCenter(org.position);
  }

  render() {
    // console.log("rendered MapMarkers")
    if (this.props.visibleTaps) {
      if (this.props) {
        return (
          <React.Fragment>
            <Marker
              map={this.props.map}
              google={this.props.google}
              key="current_pos"
              name={"Current Pos"}
              position={this.props.mapCenter}
              // onClick={this.onMarkerClick}
            />
            {this.props.visibleTaps.map((org, index) => (
              <IndieFoodMarker
                key={index}
                org={org}
                google={this.props.google}
                map={this.props.map}
              />
            ))}
          </React.Fragment>
        );
      }
    } else return null;
  }
}

const makeMapStateToProps = () => {
  const getVisibleTaps = makeGetVisibleTaps();
  const mapStateToProps = (state, props) => {
    return {
      visibleTaps: getVisibleTaps(state, props),
      //   filtered: state.tapFilters.filtered,
      //   handicap: state.tapFilters.handicap,
      accessTypesHidden: state.foodFilters.accessTypesHidden,
      allFoodOrgs: state.allFoodOrgs,
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

export default connect(makeMapStateToProps, mapDispatchToProps)(MapMarkersFood);
