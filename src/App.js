import React from "react";
import ReactGA from "react-ga";
import { Switch, Route } from "react-router";
import "./App.css";
import MapPage from "./components/MapPage/MapPage";
import Mission from "./components/Pages/Mission";
import Project from "./components/Pages/Project";
import Share from "./components/Pages/Share";
import Contribute from "./components/Pages/Contribute";
import Head from "./components/Head/Head";
import Div100vh from "react-div-100vh";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

const trackingIdProd = "UA-180456355-1";
const trackingIdBeta = "UA-180456355-2";
const trackingIdTest = "UA-180456355-3";

function App(props) {
  switch (window.location.hostname) {
    case "phlask.me":
      ReactGA.initialize(trackingIdProd);
      break;
    case "beta.phlask.me":
      ReactGA.initialize(trackingIdBeta);
      break;
    default:
      ReactGA.initialize(trackingIdTest);
  }

  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
