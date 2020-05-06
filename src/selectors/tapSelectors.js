import { createSelector } from "reselect"

const getTapFilters = (state) => state.tapFilters

const getTaps = (state) => state.allTaps

const makeGetVisibleTaps = () => {
  return createSelector(
    [getTapFilters, getTaps],
    (tapFilters, allTaps) => {
        let filteredTaps = allTaps
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