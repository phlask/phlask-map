import React, { Component } from "react";
import { Marker } from "google-maps-react";
import IndieMarker from "../IndieMarker/IndieMarker";
import { connect } from "react-redux";
import {
  getTaps,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
} from "../../actions/actions";
import makeGetVisibleTaps from "../../selectors/tapSelectors";

export class MapMarkers extends Component {
  state = {
    shouldUpdate: true
  };

  UNSAFE_componentWillMount() {
    if (!this.props.allTaps.length) {
      this.props.getTaps();
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.visibleTaps === this.props.visibleTaps
      ? false
      : this.state.shouldUpdate;
  }

  // Prevent from updating after initial loading of Markers
  componentDidUpdate() {
    this.setState({
      shouldUpdate: false
    });
    console.log("MM update");
  }

  getIcon(access) {
    if (!this.props.accessTypesHidden.includes(access)) {
      switch (access) {
        case "Public":
          return require("../images/tap-marker-icons/Public.png");
        case "Private-Shared":
          return require("../images/tap-marker-icons/Shared.png");
        case "Private":
          return require("../images/tap-marker-icons/Private.png");
        case "Restricted":
          return require("../images/tap-marker-icons/Restricted.png");
        case "Semi-public":
          return require("../images/tap-marker-icons/Shared.png");
        case "TrashAcademy":
          return "https://i.imgur.com/fXTeEKL.png";
        default:
          return "https://i.imgur.com/kKXG3TO.png";
      }
    } else {
      return "https://i.imgur.com/kKXG3TO.png";
    }
  }

  // onMarkerClick(tap){
  //   this.props.toggleInfoWindow(true);
  //   this.props.setSelectedPlace(tap);
  //   this.props.setMapCenter(tap.position);
  // }

  render() {
    // console.log(this.props)
    if (this.props.visibleTaps) {
      return (
        <React.Fragment>
          <Marker
            map={this.props.map}
            google={this.props.google}
            key="current_pos"
            name={"Current Pos"}
            position={this.props.mapCenter}
          />
          {this.props.visibleTaps.map((tap, index) => (
            <IndieMarker
              key={index}
              tap={tap}
              google={this.props.google}
              map={this.props.map}
              // onMarkerClick={this.onMarkerClick.bind(this)}
              // getIcon={this.getIcon}
              // accessTypesHidden={this.props.accessTypesHidden}
            />
          ))}
        </React.Fragment>
      );
    } else return null;
  }
}

// class Markers extends React.Component{

//   shouldComponentUpdate(nextProps){

//   }

//   getIcon(access) {
//     if (!this.props.accessTypesHidden.includes(access)) {
//       switch (access) {
//         case "Public":
//           return require('./images/tap-marker-icons/Public.png')
//         case "Private-Shared":
//           return require('./images/tap-marker-icons/Shared.png')
//         case "Private":
//           return require('./images/tap-marker-icons/Private.png')
//         case "Restricted":
//           return require('./images/tap-marker-icons/Restricted.png')
//         case "Semi-public":
//           return require('./images/tap-marker-icons/Shared.png')
//         case "TrashAcademy":
//           return "https://i.imgur.com/fXTeEKL.png";
//         default:
//           return "https://i.imgur.com/kKXG3TO.png";
//       }
//     } else {
//       return "https://i.imgur.com/kKXG3TO.png";
//     }
//   }

//   render(){
//     return(
//       <Marker
//                 access={this.props.tap.access}
//                 map={this.props.map}
//                 google={this.props.google}
//                 mapCenter={this.props.mapCenter}
//                 key={this.props.key}
//                 name={this.props.tap.tapnum}
//                 organization={this.props.tap.organization}
//                 address={this.props.tap.address}
//                 hours={this.props.tap.hours}
//                 description={this.props.tap.description}
//                 filtration={this.props.tap.filtration}
//                 handicap={this.props.tap.handicap}
//                 service={this.props.tap.service}
//                 sparkling={"sparkling" in this.props.tap ? this.props.tap.sparkling : "no"}
//                 tap_type={this.props.tap.tap_type}
//                 norms_rules={this.props.tap.norms_rules}
//                 vessel={this.props.tap.vessel}
//                 img={this.props.tap.images}
//                 onClick={this.props.onMarkerClick.bind(this)}
//                 position={{ lat: this.props.tap.lat, lng: this.props.tap.lon }}
//                 icon={{
//                   url: this.getIcon(this.props.tap.access)
//                 }}
//               />
//     )
//   }
// }

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

export default connect(makeMapStateToProps, mapDispatchToProps)(MapMarkers);
