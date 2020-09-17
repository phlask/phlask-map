import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { waterConfig, foodConfig } from "./firebase/firebaseConfig";
import * as firebase from "firebase";
import "./custom.scss";
// import { resizeWindow } from './actions'

if (!firebase.length) {
  firebase.initializeApp(waterConfig);
  firebase.initializeApp(foodConfig, "food");
}

// window.addEventListener('resize', resizeWindow())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
