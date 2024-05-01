import { Marker } from 'google-maps-react';
import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
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
  phlaskType
}) => {
  const selectedPlace = useSelector(state => state.selectedPlace.name);
  console.log(selectedPlace);

  useEffect(() => {
    if (!allTaps.length && getTaps) getTaps();
  }, [allTaps, getTaps]);
  // if (!visibleTaps.length) return null;

  return (
    <>
      {visibleTaps.map((tap, index) => {
        if (
          filterHelper(
            filterTags[phlaskType][0][0],
            tap['tap_type'] == 'Drinking Fountain' ||
              tap['tap_type'] == 'Bottle filler and fountain'
          ) &&
          filterHelper(
            filterTags[phlaskType][0][1],
            tap['tap_type'] == 'Bottle filler and fountain'
          ) &&
          filterHelper(
            filterTags[phlaskType][0][2],
            tap['tap_type'] == 'Sink'
          ) &&
          filterHelper(
            filterTags[phlaskType][1][0],
            tap['handicap'] == 'Yes'
          ) &&
          filterHelper(
            filterTags[phlaskType][1][1],
            tap['filtration'] == 'Yes'
          ) &&
          filterHelper(filterTags[phlaskType][1][2], tap['vessel'] == 'Yes') &&
          filterHelper(
            filterTags[phlaskType][2] == 0,
            tap['access'] == 'Public'
          ) &&
          filterHelper(
            filterTags[phlaskType][2] == 1,
            tap['access'] == 'Restricted' ||
              tap['access'] == 'Private' ||
              tap['access'] == 'Private-Shared'
          )
        ) {
          return (
            <IndieMarker
              key={index}
              tap={tap}
              google={google}
              map={map}
              selectedTap={selectedPlace}
            />
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
