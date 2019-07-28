<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import * as serviceWorker from './serviceWorker';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
>>>>>>> develop

ReactDOM.render(<App />, document.getElementById('root'));

<<<<<<< HEAD
ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
=======
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
>>>>>>> develop
