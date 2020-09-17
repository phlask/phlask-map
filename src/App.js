import React from "react";
import ReactGA from "react-ga";
// import { connect } from 'react-redux'
// import { resizeWindow } from './actions'
import "./App.css";

import MapPage from "./components/MapPage";

function App(props) {
  // window.addEventListener('resize',props.resizeWindow)
  ReactGA.initialize("UA-160741705-1");
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

// const mapDispatchToProps = { resizeWindow }

// export default connect(null,mapDispatchToProps)(App);
export default App;
