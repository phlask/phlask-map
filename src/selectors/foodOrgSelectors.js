import { createSelector } from "reselect"

import { hours } from '../components/hours.js'

const getTapFilters = (state) => state.foodFilters

const getTaps = (state) => state.allFoodOrgs

const makeGetVisibleTaps = () => {
  return createSelector(
    [getTapFilters, getTaps],
    (tapFilters, allTaps) => {
      
      let filteredTaps = allTaps
      // If we want to filter for Food Sites
      // if (tapFilters.accessTypesHidden) {
      //     filteredTaps = Object.keys(filteredTaps)
      //         .filter(key => allTaps[key].access === "Food Site")
      //         .reduce((obj, key) => {
      //         obj[key] = allTaps[key];
      //         return obj;
      //         }, []);
      // }

      // // If we want to filter for Schools
      // if (tapFilters.accessTypesHidden) {
      //     filteredTaps = Object.keys(filteredTaps)
      //       .filter(key => filteredTaps[key].access === "School")
      //       .reduce((obj, key) => {
      //         obj[key] = filteredTaps[key];
      //         return obj;
      //       }, []);
      // }
      
      // // If we want to filter for Charter Schools
      // if (tapFilters.accessTypesHidden) {
      //   filteredTaps = Object.keys(filteredTaps)
      //     .filter(key => filteredTaps[key].access === "Charter School")
      //     .reduce((obj, key) => {
      //       obj[key] = filteredTaps[key];
      //       return obj;
      //     }, []);
      // }
      // // If we want to filter for PHA Community Centers
      // if (tapFilters.accessTypesHidden) {
      //   filteredTaps = Object.keys(filteredTaps)
      //     .filter(key => filteredTaps[key].access === "PHA Community Center")
      //     .reduce((obj, key) => {
      //       obj[key] = filteredTaps[key];
      //       return obj;
      //     }, []);
      // }

      if (tapFilters.openNow) {
        filteredTaps = Object.keys(filteredTaps)
          .filter(key => {
            const today = new Date() 
            const currentDay = today.getDay()

            let selectedPlace = filteredTaps[key]

            return selectedPlace.hours !== undefined
                ?selectedPlace.hours.length >= currentDay + 1 
                    ? selectedPlace.hours[currentDay].close !== undefined
                      && selectedPlace.hours[currentDay].open !== undefined
                        ? hours.checkOpen(
                            selectedPlace.hours[currentDay].open.time, 
                            selectedPlace.hours[currentDay].close.time
                         )
                         : false
                     : false
                 : false
          })
          .reduce((obj, key) => {
            obj[key] = filteredTaps[key];
            return obj;
          }, []);
      }

      filteredTaps = Object.keys(filteredTaps)
        .filter(key => !tapFilters.accessTypesHidden.includes(filteredTaps[key].access))
        .reduce((obj, key) => {
          obj[key] = filteredTaps[key];
          return obj;
        }, []);
      return filteredTaps
    }
  )
}

export default makeGetVisibleTaps