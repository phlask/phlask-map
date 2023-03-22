import React from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import MapPage from './components/MapPage/MapPage';
import Mission from './components/Pages/Mission';
import Project from './components/Pages/Project';
import Share from './components/Pages/Share';
import Contribute from './components/Pages/Contribute';
import Head from './components/Head/Head';
import Div100vh from 'react-div-100vh';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';
import { logPageView, initAnalytics } from './analytics';

function App(props) {
  initAnalytics();

  logPageView();
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
