import React from 'react';
import { Marker } from 'google-maps-react';
import { connect } from 'react-redux';
import {
  getFoodOrgs,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
} from '../../actions/actions';
import makeGetVisibleTaps from '../../selectors/foodOrgSelectors';
import foodIcon from '../images/food-marker-icons/food-site.png';
import FoodOtherFilterIcon from '../icons/FoodOtherFilterIcon';
import FoodSchoolFilterIcon from '../icons/FoodSchoolFilterIcon';
import FoodRecreationFilterIcon from '../icons/FoodRecreationFilterIcon';
import FoodCongregationFilterIcon from '../icons/FoodCongregationFilterIcon';
import '../IndieMarker/IndieMarker.css';
import { cleanUpForRedux } from './utils';

import foodMarkerIconV2 from '../icons/FoodMarkerIconV2';

class IndieMarker extends React.Component {
  state = {
    icon: '',
    shouldUpdate: true
  };

  componentWillUnmount() {
    // console.log("unmount");
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
    // console.log("Did Update");
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
        case 'Food Site':
          return !isForSelection ? (
            { url: foodMarkerIconV2(48, 48) }
          ) : (
            <FoodOtherFilterIcon />
          );
        case 'School':
          return !isForSelection ? (
            { url: foodMarkerIconV2(48, 48) }
          ) : (
            <FoodSchoolFilterIcon />
          );
        case 'Charter School':
          return !isForSelection ? (
            { url: foodMarkerIconV2(48, 48) }
          ) : (
            <FoodRecreationFilterIcon />
          );
        case 'PHA Community Center':
          return !isForSelection ? (
            { url: foodMarkerIconV2(48, 48) }
          ) : (
            <FoodCongregationFilterIcon />
          );
        default:
          return !isForSelection ? (
            { url: foodMarkerIconV2(48, 48) }
          ) : (
            <FoodOtherFilterIcon />
          );
      }
    } else {
      return { foodIcon };
    }
  }

  onMarkerClick() {
    this.props.toggleInfoWindow(true);
    this.props.setSelectedPlace(
      cleanUpForRedux({
        ...this.props.org,
        idRequired: this.props.org.id_required === 'yes',
        kidOnly: this.props.org.kid_only === 'yes',
        img: this.props.org.images
      })
    );
  }

  render() {
    // console.log("rendered marker");

    return (
      // Doesn't Render Marker as child of div,
      // so can't use this method to style individual Markers
      !this.props.visibleTaps.includes(this.props.org) ? (
        []
      ) : (
        <div>
          <Marker
            map={this.props.map}
            google={this.props.google}
            mapCenter={this.props.mapCenter}
            onClick={this.onMarkerClick.bind(this)}
            position={{ lat: this.props.org.lat, lng: this.props.org.lon }}
            icon={{ url: foodMarkerIconV2(48, 48) }}
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
