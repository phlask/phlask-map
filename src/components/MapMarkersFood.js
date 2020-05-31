import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter } from "../actions";
import makeGetVisibleTaps from '../selectors/foodOrgSelectors';
import foodIcon from './foodIcon.png'

export class MapMarkersFood extends Component {

  UNSAFE_componentWillMount() {
    this.props.getFoodOrgs()
  }
  
  shouldComponentUpdate(nextProps){
    return nextProps.allFoodOrgs === this.props.allFoodOrgs
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
  
  onMarkerClick(org){
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(org);
    this.props.setMapCenter(org.position);
  }

  render() {
    // console.log(this.props)
    // if(this.props.visibleTaps) {
        if( this.props ){
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
          {this.props.allFoodOrgs
            .map((org, index) => (
              <Marker
                access={org.access}
                map={this.props.map}
                google={this.props.google}
                mapCenter={this.props.mapCenter}
                key={index}
                organization={org.organization}
                address={org.address}
                hours={org.hours}
                description={org.description}
                img={org.images}
                onClick={this.onMarkerClick.bind(this)}
                position={{ lat: org.lat, lng: org.lon }}
                icon={{
                    url: 'https://i.imgur.com/kKXG3TO.png'
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
        allFoodOrgs: state.allFoodOrgs,
    //   visibleTaps: getVisibleTaps(state, props),
    //   filtered: state.tapFilters.filtered,
    //   handicap: state.tapFilters.handicap,
    //   accessTypesHidden: state.tapFilters.accessTypesHidden,
      mapCenter: state.mapCenter
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter };

export default connect(makeMapStateToProps, mapDispatchToProps)(MapMarkersFood);
