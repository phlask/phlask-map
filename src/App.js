import React from "react";
import ReactGA from 'react-ga';

import "./App.css";

import MapPage from "./components/MapPage";

function App() {
  ReactGA.initialize('UA-160741705-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    // <Switch>
    //   <Route path="/MapPage">
    //     <MapPage />
    //   </Route>
    //   <Route path="/">
    //     <MapPage />
    //   </Route>
    // </Switch>
    <MapPage />
  );
}

export default App;
