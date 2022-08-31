import React, { Component } from 'react';
import { Marker } from 'google-maps-react';
import IndieMarker from '../IndieMarker/IndieMarker';
import { connect } from 'react-redux';
import {
  getTaps,
  toggleInfoWindow,
  setSelectedPlace,
  setMapCenter
} from '../../actions/actions';
import makeGetVisibleTaps from '../../selectors/tapSelectors';

export function MapMarkers({
  allTaps = [],
  visibleTaps = [],
  getTaps,
  map,
  google,
  mapCenter
}) {
  React.useEffect(() => {
    if (!allTaps.length && getTaps) getTaps();
  }, [allTaps, getTaps]);

  if (!visibleTaps.length) return null;
  return (
    <>
      <Marker
        map={map}
        google={google}
        key="current_pos"
        name="Current Pos"
        position={mapCenter}
      />
      {visibleTaps.map((tap, index) => (
        <IndieMarker key={index} tap={tap} google={google} map={map} />
      ))}
    </>
  );
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

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(
  React.memo(
    MapMarkers,
    (prevState, nextState) =>
      prevState.visibleTaps.length === nextState.visibleTaps.length
  )
);
