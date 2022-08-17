import React from "react";
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
} from "../../actions/actions";
import MapMarkers from "./MapMarkers";
import MapMarkersFood from "./MapMarkersFood";

const MapMarkersMapper = ({ phlaskType, map, google, mapCenter }) => {
  const marker = {
    [PHLASK_TYPE_WATER]: (
      // Water
      <MapMarkers map={map} google={google} mapCenter={mapCenter} />
    ),
    [PHLASK_TYPE_FOOD]: (
      // Food

      <MapMarkersFood map={map} google={google} mapCenter={mapCenter} />
    ),
    [PHLASK_TYPE_FORAGING]: (
      // Foraging
      <></>
    ),
    [PHLASK_TYPE_BATHROOM]: (
      // BATHROOM
      <></>
    ),
  }[phlaskType];

  return marker;
};

export default MapMarkersMapper;
