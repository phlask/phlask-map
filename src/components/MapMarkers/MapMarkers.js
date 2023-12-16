import { Marker } from 'google-maps-react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getTaps,
  setMapCenter,
  setSelectedPlace,
  toggleInfoWindow
} from '../../actions/actions';
import makeGetVisibleTaps from '../../selectors/tapSelectors';
import IndieMarker from '../IndieMarker/IndieMarker';

const filterHelper = (activeTag, conditionMet) => {
  return (activeTag && conditionMet) || !activeTag;
};

const MapMarkers = ({
  allTaps = [],
  visibleTaps = [],
  getTaps,
  map,
  google,
  mapCenter,
  filterTags,
  filterType
}) => {
  useEffect(() => {
    if (!allTaps.length && getTaps) getTaps();
  }, [allTaps, getTaps]);
  // if (!visibleTaps.length) return null;

  return (
    <>
      {visibleTaps.map((tap, index) => {
        if (
          filterHelper(
            filterTags[filterType][0][0],
            tap['tap_type'] == 'Drinking Fountain' ||
              tap['tap_type'] == 'Bottle filler and fountain'
          ) &&
          filterHelper(
            filterTags[filterType][0][1],
            tap['tap_type'] == 'Bottle filler and fountain'
          ) &&
          filterHelper(
            filterTags[filterType][0][2],
            tap['tap_type'] == 'Sink'
          ) &&
          filterHelper(
            filterTags[filterType][1][0],
            tap['handicap'] == 'Yes'
          ) &&
          filterHelper(
            filterTags[filterType][1][1],
            tap['filtration'] == 'Yes'
          ) &&
          filterHelper(filterTags[filterType][1][2], tap['vessel'] == 'Yes') &&
          filterHelper(
            filterTags[filterType][2] == 0,
            tap['access'] == 'Public'
          ) &&
          filterHelper(
            filterTags[filterType][2] == 1,
            tap['access'] == 'Restricted' ||
              tap['access'] == 'Private' ||
              tap['access'] == 'Private-Shared'
          )
        ) {
          return (
            <IndieMarker key={index} tap={tap} google={google} map={map} />
          );
        }
      })}
    </>
  );
};

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
