import { createSelector } from "reselect";

import { hours } from "../helpers/hours";

const getTapFilters = state => state.tapFilters;

const getTaps = state => state.allTaps;

const makeGetVisibleTaps = () => {
  return createSelector([getTapFilters, getTaps], (tapFilters, allTaps) => {
    let filteredTaps = allTaps;

    // Default filters
    filteredTaps = Object.keys(filteredTaps)
      .filter(key => {
        return (
          allTaps[key].permanently_closed !== undefined &&
          allTaps[key].permanently_closed !== true
        );
      })
      .reduce((obj, key) => {
        obj[key] = allTaps[key];
        return obj;
      }, []);

    // If we want to filter for filtered taps (water filter)
    if (tapFilters.filtered) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => allTaps[key].filtration === "Yes")
        .reduce((obj, key) => {
          obj[key] = allTaps[key];
          return obj;
        }, []);
    }

    // If we want to filter for handicap-accessible taps
    if (tapFilters.handicap) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => filteredTaps[key].handicap === "Yes")
        .reduce((obj, key) => {
          obj[key] = filteredTaps[key];
          return obj;
        }, []);
    }

    // If we want to filter for taps that offer sparkling water
    if (tapFilters.sparkling) {
      filteredTaps = Object.keys(filteredTaps)
        .filter(key => filteredTaps[key].sparkling === "yes")
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
