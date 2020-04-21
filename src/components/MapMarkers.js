import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getTaps } from "../actions";
import PropTypes from "prop-types"

export class MapMarkers extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTaps()
  }

  getIcon(access) {
    // if (this.props.unfilteredTaps.includes(access) === true) {
    //   switch (access) {
    //     case "Public":
    //       return "https://i.imgur.com/fsofse7.png";
    //     case "Private-Shared":
    //       return "https://i.imgur.com/MMsmsHG.png";
    //     case "Private":
    //       return "https://i.imgur.com/oLPMQtg.png";
    //     case "Restricted":
    //       return "https://i.imgur.com/T93TDTO.png";
    //     case "Semi-public":
    //       return "https://i.imgur.com/MMsmsHG.png";
    //     case "TrashAcademy":
    //       return "https://i.imgur.com/fXTeEKL.png";
    //     default:
    //       return "https://i.imgur.com/kKXG3TO.png";
    //   }
    // } else {
    //   return "https://i.imgur.com/kKXG3TO.png";
    // }
    return "https://i.imgur.com/kKXG3TO.png";
  }

  render() {
    console.log(this.props)
    if(this.props.filteredTaps) {
      return (
        <React.Fragment>
          {this.props.filteredTaps
            /* {toggledTaps */
            .map((tap, index) => (
              <Marker
                map={this.props.map}
                google={this.props.google}
                mapCenter={this.props.mapCenter}
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
          ))};
        </React.Fragment>
      );
    }
    else return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    filtered: state.filtered,
    handicap: state.handicap,
    allTaps: state.allTaps,
    filteredTaps: state.filteredTaps
  }
};

const mapDispatchToProps = { getTaps };

// const mapDispatchToProps = (dispatch) => {
//   return{
//     getTaps: () => dispatch(getTaps())
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(MapMarkers);
