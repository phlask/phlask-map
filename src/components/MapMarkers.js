import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getTaps, toggleInfoWindow, setSelectedPlace, setMapCenter } from "../actions";
import makeGetVisibleTaps from '../selectors/tapSelectors';

export class MapMarkers extends Component {

  UNSAFE_componentWillMount() {
    this.props.getTaps()
  }
  
  shouldComponentUpdate(nextProps){
    return nextProps.visibleTaps === this.props.visibleTaps
      ? false
      : true
  }

  getIcon(access) {
    if (!this.props.accessTypesHidden.includes(access)) {
      switch (access) {
        case "Public":
          return require('./images/tap-marker-icons/Public.png')
        case "Private-Shared":
          return require('./images/tap-marker-icons/Shared.png')
        case "Private":
          return require('./images/tap-marker-icons/Private.png')
        case "Restricted":
          return require('./images/tap-marker-icons/Restricted.png')
        case "Semi-public":
          return require('./images/tap-marker-icons/Shared.png')
        case "TrashAcademy":
          return "https://i.imgur.com/fXTeEKL.png";
        default:
          return "https://i.imgur.com/kKXG3TO.png";
      }
    } else {
      return "https://i.imgur.com/kKXG3TO.png";
    }
  }
  
  onMarkerClick(tap){
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(tap);
    this.props.setMapCenter(tap.position);
  }

  render() {
    // console.log(this.props)
    if(this.props.visibleTaps) {
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
          {this.props.visibleTaps
            .map((tap, index) => (
              <Marker
                access={tap.access}
                map={this.props.map}
                google={this.props.google}
                mapCenter={this.props.mapCenter}
                key={index}
                name={tap.tapnum}
                organization={tap.organization}
                address={tap.address}
                hours={tap.hours}
                description={tap.description}
                filtration={tap.filtration}
                handicap={tap.handicap}
                service={tap.service}
                sparkling={"sparkling" in tap ? tap.sparkling : "no"}
                tap_type={tap.tap_type}
                norms_rules={tap.norms_rules}
                vessel={tap.vessel}
                img={tap.images}
                onClick={this.onMarkerClick.bind(this)}
                position={{ lat: tap.lat, lng: tap.lon }}
                icon={{
                  url: this.getIcon(tap.access)
                }}
              />
          ))}
        </React.Fragment>
      );
    }
    else return null;
  }
}

const makeMapStateToProps = () => {
  const getVisibleTaps = makeGetVisibleTaps()
  const mapStateToProps = (state, props) => {
    return {
      visibleTaps: getVisibleTaps(state, props),
      filtered: state.tapFilters.filtered,
      handicap: state.tapFilters.handicap,
      accessTypesHidden: state.tapFilters.accessTypesHidden,
      mapCenter: state.mapCenter
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = { getTaps, toggleInfoWindow, setSelectedPlace, setMapCenter };

export default connect(makeMapStateToProps, mapDispatchToProps)(MapMarkers);
