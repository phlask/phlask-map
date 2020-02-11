import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
  authDomain: "phlask-web-map.firebaseapp.com",
  databaseURL: "https://phlask-web-map.firebaseio.com",
  projectId: "phlask-web-map",
  storageBucket: "phlask-web-map.appspot.com",
  messagingSenderId: "428394983826"
};

firebase.initializeApp(config);

export const SET_TOGGLE_STATE = "SET_TOGGLE_STATE";
export const setToggleState = (toggle, toggleState) => ({
  type: SET_TOGGLE_STATE,
  toggle,
  toggleState
});

export const GET_TAPS_SUCCESS = "GET_TAPS_SUCCESS";
export const getTapsSuccess = allTaps => ({
  type: GET_TAPS_SUCCESS,
  allTaps
});

export const getTaps = () => dispatch => {
  return firebase
    .database()
    .ref("/")
    .once("value")
    .then(snapshot => {
      var allTaps = [];
      var item;
      for (item in snapshot.val()) {
        if (snapshot.val()[item].access === "WM") {
          continue;
        }
        if (snapshot.val()[item].active === "N") {
          continue;
        }
        if (snapshot.val()[item].access === "TrashAcademy") {
          continue;
        }
        allTaps.push(snapshot.val()[item]);
      }
      dispatch(getTapsSuccess(allTaps));
    });
  // .then(allTaps => dispatch(getTapsSuccess(allTaps)));
};
