import React from "react";
import ReactGA from "react-ga";
import { Switch, Route } from "react-router";
// import { connect } from 'react-redux'
// import { resizeWindow } from './actions'
import "./App.css";
import MapPage from "./components/MapPage";
import Mission from "./components/pages/Mission";
import Project from "./components/pages/Project";
import Share from "./components/pages/Share";
import Contribute from "./components/pages/Contribute";
import Head from "./components/Head";
import Div100vh from "react-div-100vh";

const trackingIdProd = "UA-180456355-1"
const trackingIdBeta = "UA-180456355-2"
const trackingIdTest = "UA-180456355-3"

function App(props) {
  // window.addEventListener('resize',props.resizeWindow)

  switch(window.location.hostname) {
    case 'phlask.me':
        ReactGA.initialize(trackingIdProd);
        break
    case 'beta.phlask.me':
        ReactGA.initialize(trackingIdBeta);
        break
    default:
        ReactGA.initialize(trackingIdTest);
  }

  ReactGA.pageview(window.location.pathname + window.location.search);
  return (

    <Div100vh>
      <div className="page-wrapper">
        <Head />
        <Switch>
          <Route exact path="/">
            <MapPage />
          </Route>
          <Route path="/mission">
            <Mission />
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/share">
            <Share />
          </Route>
          <Route path="/contribute">
            <Contribute />
          </Route>
        </Switch>
      </div>
    </Div100vh>
  );
}

// const mapDispatchToProps = { resizeWindow }

// export default connect(null,mapDispatchToProps)(App);
export default App;
