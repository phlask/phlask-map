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
import IndieFoodMarker from './IndieFoodMarker';

export function MapMarkersFood({
  allFoodOrgs = [],
  getFoodOrgs,
  visibleTaps = [],
  mapCenter,
  google,
  map
}) {
  React.useEffect(() => {
    if (!allFoodOrgs.length && getFoodOrgs) {
      getFoodOrgs();
    }
  }, [allFoodOrgs, getFoodOrgs]);

  if (!visibleTaps?.length) return null;
  return (
    <>
      <Marker
        map={map}
        google={google}
        key="current_pos"
        name="Current Pos"
        position={mapCenter}
      />
      {visibleTaps.map((org, index) => (
        <IndieFoodMarker key={index} org={org} google={google} map={map} />
      ))}
    </>
  );
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

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(
  React.memo(
    MapMarkersFood,
    (prevProps, nextProps) =>
      prevProps.visibleTaps?.length === nextProps.visibleTaps?.length
  )
);
