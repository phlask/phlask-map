import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useCallback } from 'react';
import Div100vh from 'react-div-100vh';
import './App.css';
import { initAnalytics, logPageView } from './analytics';
import Head from './components/Head/Head';
import MapPage from './components/MapPage/MapPage';
import theme from './theme';
import { useDispatch } from 'react-redux';
import { userDataSlice } from 'reducers/user';

/**
 * Handle checking geolocation on an interval.
 *
 * @param {NodeJS.Interval} interval Interval to clear on callback run.
 * @param {(status: boolean) => void} setter Setter to run when the callbacks run.
 */
function geolocationInterval(interval, setter) {
  navigator.geolocation.getCurrentPosition(
    () => {
      setter(true);
      clearInterval(interval);
    },
    () => {
      setter(false);
      clearInterval(interval);
    }
  );
}

/**
 * Check geolocation perms and set an onchange handler.
 * @async
 * @param {(status: boolean) => void} setter Setter to run based on initial query.
 */
async function queryGeolocationPerms(setter) {
  const perms = await navigator.permissions.query({ name: 'geolocation' });
  setter(perms.state === 'granted');
  perms.addEventListener('change', () => {
    setter(perms.state === 'granted');
  });
}

function App(props) {
  initAnalytics();
  logPageView();
  const dispatch = useDispatch();
  const setEnabled = useCallback(
    payload => {
      dispatch(userDataSlice.actions.updateUserLocationEnabled(payload));
    },
    [dispatch]
  );
  useEffect(() => {
    let interval;
    /**
     * This one is a doosy...
     * Basically Firefox doesn't think temporary permissions should trigger the Permissions API onchange event (Which is dumb).
     * This is a workaround that periodically checks for a users location until they respond to the prompt, when it cancels the interval.
     *
     * The main downside here is that we are constantly triggering the access prompt.
     * There is an edge case where a user might click close to when the interval reruns.
     * This will reprompt and make it seem like the prompt didn't close properly.
     *
     * Here is a bugzilla ticket relating to this: https://bugzilla.mozilla.org/show_bug.cgi?id=1719651
     * Hopefully Mozilla changes their mind and will properly handle temporary permissions
     */
    // TODO: Revisit this logic if Mozilla comes to their senses
    if (navigator.userAgent.includes('Firefox')) {
      interval = setInterval(() => {
        geolocationInterval(interval, setEnabled);
      }, 2000);
      geolocationInterval(interval, setEnabled);
      // This is the sensible way to handle it...
    } else {
      queryGeolocationPerms(setEnabled);
    }
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Div100vh>
        <div className="page-wrapper">
          <Head />
          <MapPage />
        </div>
      </Div100vh>
    </ThemeProvider>
  );
}

export default App;
