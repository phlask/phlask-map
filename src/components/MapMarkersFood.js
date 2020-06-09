import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter } from "../actions";
import makeGetVisibleTaps from '../selectors/foodOrgSelectors';
import foodIcon from './images/food-marker-icons/food-site.png'

export class MapMarkersFood extends Component {

  UNSAFE_componentWillMount() {
    this.props.getFoodOrgs()
  }
  
  shouldComponentUpdate(nextProps){
    return nextProps.visibleTaps === this.props.visibleTaps
      ? false
      : true
  }

  getIcon(access) {
    if (!this.props.accessTypesHidden.includes(access)) {
      switch (access) {
        case "Food Site":
          return require('./images/food-marker-icons/food-site.png')
        case "School":
          return require('./images/food-marker-icons/school.png')
        case "Charter School":
          return require('./images/food-marker-icons/charter-school.png')
        case "PHA Community Center":
          return require('./images/food-marker-icons/pha.png')
        default:
          return "./images/foodIcon.png";
      }
    } 
    else {
      return {foodIcon};
    }
  }
  
  onMarkerClick(org){
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(org);
    this.props.setMapCenter(org.position);
  }

  render() {
    // console.log(this.props)
    if(this.props.visibleTaps) {
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
            {this.props.visibleTaps
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
                  idRequired={org.id_required === 'yes' ? true : false}
                  kidOnly={org.kid_only === 'yes' ? true : false}
                  description={org.description}
                  img={org.images}
                  onClick={this.onMarkerClick.bind(this)}
                  position={{ lat: org.lat, lng: org.lon }}
                  icon={this.getIcon(org.access)}
                />
            ))}
          </React.Fragment>
        );
      }
    }
    else return null;
  }
}

const makeMapStateToProps = () => {
  const getVisibleTaps = makeGetVisibleTaps()
  const mapStateToProps = (state, props) => {
    return {
      visibleTaps: getVisibleTaps(state, props),
    //   filtered: state.tapFilters.filtered,
    //   handicap: state.tapFilters.handicap,
      accessTypesHidden: state.foodFilters.accessTypesHidden,
      mapCenter: state.mapCenter
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter };

export default connect(makeMapStateToProps, mapDispatchToProps)(MapMarkersFood);
