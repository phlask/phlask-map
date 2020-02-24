import * as actions from "../actions";

const initialState = {
  filtered: false,
  handicap: false,
  allTaps: [],
  filteredTaps: []
};

export default (state = initialState, act) => {
  switch (act.type) {
    case actions.SET_TOGGLE_STATE:
      let updatedTaps = [...state.allTaps];

      if (act.toggle === "filtered") {
        if (act.toggleState === true) {
          const filteredTaps = Object.keys(updatedTaps)
            .filter(key => updatedTaps[key].filtration === "Yes")
            .reduce((obj, key) => {
              obj[key] = updatedTaps[key];
              return obj;
            }, []);
          updatedTaps = filteredTaps;

          if (state.handicap === true) {
            // filter by both filtered and handicap
            updatedTaps = Object.keys(filteredTaps)
              .filter(key => filteredTaps[key].handicap === "Yes")
              .reduce((obj, key) => {
                obj[key] = filteredTaps[key];
                return obj;
              }, []);
          }
        } else if (act.toggleState === false) {
          // resetting filtered toggle (sent false state) need to add all taps back in
          //  but need to check for handicap state
          if (state.handicap === true) {
            // filter by both filtered and handicap
            updatedTaps = Object.keys(updatedTaps)
              .filter(key => updatedTaps[key].handicap === "Yes")
              .reduce((obj, key) => {
                obj[key] = updatedTaps[key];
                return obj;
              }, []);
          }
        }
        const newState = {
          ...state,
          filtered: act.toggleState,
          filteredTaps: updatedTaps
        };
        return newState;
      } else {
        if (act.toggle === "handicap") {
          if (act.toggleState === true) {
            const handicapTaps = Object.keys(updatedTaps)
              .filter(key => updatedTaps[key].handicap === "Yes")
              .reduce((obj, key) => {
                obj[key] = updatedTaps[key];
                return obj;
              }, []);
            updatedTaps = handicapTaps;

            if (state.filtered === true) {
              // filter by both filtered and handicap
              updatedTaps = Object.keys(handicapTaps)
                .filter(key => handicapTaps[key].filtration === "Yes")
                .reduce((obj, key) => {
                  obj[key] = handicapTaps[key];
                  return obj;
                }, []);
            }
          } else if (act.toggleState === false) {
            // resetting handicap toggle (sent false state) need to add all taps back in
            //  but need to check for filtered state
            if (state.filtered === true) {
              updatedTaps = Object.keys(updatedTaps)
                .filter(key => updatedTaps[key].handicap === "Yes")
                .reduce((obj, key) => {
                  obj[key] = updatedTaps[key];
                  return obj;
                }, []);
            }
          }
        }
        const newState = {
          ...state,
          handicap: act.toggleState,
          filteredTaps: updatedTaps
        };
        return newState;
      }

    case actions.GET_TAPS_SUCCESS:
      return { ...state, allTaps: act.allTaps, filteredTaps: act.allTaps };
    
    default:
      return state
  }
};

// tapsToggleState = () => {
//   const taps = { ...this.state.taps };
//   if (this.props.filtered && this.props.handicap) {
//     const filteredtaps = Object.keys(taps)
//       .filter(key => taps[key].filtration === "Yes")
//       .reduce((obj, key) => {
//         obj[key] = taps[key];
//         return obj;
//       }, {});

//     const adaTaps = Object.keys(filteredtaps)
//       .filter(key => filteredtaps[key].handicap === "Yes")
//       .reduce((obj, key) => {
//         obj[key] = filteredtaps[key];
//         return obj;
//       }, {});
//     this.setState({ filteredTaps: adaTaps });
//     // return adataps;
//   } else if (this.props.filtered) {
//     // const filteredtaps = taps.filter(tap => tap.filtration === "yes");
//     const filteredTaps = Object.keys(taps)
//       .filter(key => taps[key].filtration === "Yes")
//       .reduce((obj, key) => {
//         obj[key] = taps[key];
//         return obj;
//       }, {});
//     this.setState({ filteredTaps });

//     // return filteredtaps;
//   } else if (this.props.ada) {
//     // const adataps = taps.filter(tap => tap.handicap === "yes");
//     const adaTaps = Object.keys(taps)
//       .filter(key => taps[key].handicap === "Yes")
//       .reduce((obj, key) => {
//         obj[key] = taps[key];
//         return obj;
//       }, {});
//     this.setState({ filteredTaps: adaTaps });

//     // return adataps;
//   } else {
//     this.setState({ filteredTaps: taps });
//     console.log(this.state.filteredTaps);
//   }
// };
