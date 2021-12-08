import { createSelector } from "reselect";

import { hours } from "../helpers/hours";

const getTapFilters = state => state.foodFilters;

const getTaps = state => state.allFoodOrgs;

const makeGetVisibleTaps = () => {
  return createSelector([getTapFilters, getTaps], (tapFilters, allTaps) => {
    let filteredTaps = allTaps;

    // If we want to filter for Orgs that are Kids Only
    if (tapFilters.kidOnly) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => filteredTaps[key].kid_only === "yes")
        .reduce((obj, key) => {
          obj[key] = filteredTaps[key];
          return obj;
        }, []);
    }

    // If we want to filter for Orgs that require ID
    if (tapFilters.idRequired) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => filteredTaps[key].id_required === "yes")
        .reduce((obj, key) => {
          obj[key] = filteredTaps[key];
          return obj;
        }, []);
    }

    if (tapFilters.openNow) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => {
          const today = new Date();
          const currentDay = today.getDay();

          let selectedPlace = filteredTaps[key];

          return selectedPlace.hours !== undefined
            ? selectedPlace.hours.length >= currentDay + 1
              ? selectedPlace.hours[currentDay].close !== undefined &&
                selectedPlace.hours[currentDay].open !== undefined
                ? hours.checkOpen(
                    selectedPlace.hours[currentDay].open.time,
                    selectedPlace.hours[currentDay].close.time
                  )
                : false
              : false
            : false;
        })
        .reduce((obj, key) => {
          obj[key] = filteredTaps[key];
          return obj;
        }, []);
    }

    filteredTaps = Object.keys(filteredTaps)
      .filter(
        key => !tapFilters.accessTypesHidden.includes(filteredTaps[key].access)
      )
      .reduce((obj, key) => {
        obj[key] = filteredTaps[key];
        return obj;
      }, []);
    return filteredTaps;
  });
};

export default makeGetVisibleTaps;
