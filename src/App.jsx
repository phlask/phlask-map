import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { initAnalytics, logPageView } from 'analytics';
import Head from 'components/Head/Head';
import MapPage from 'components/MapPage/MapPage';
import theme from 'theme';
import store from 'store';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateUserLocationEnabled } from './reducers/user';

const App = () => {
  initAnalytics();
  logPageView();
  const dispatch = useDispatch();
  useEffect(() => {
    function setUserLocationEnabled(payload) {
      dispatch(updateUserLocationEnabled(payload));
    }
    async function queryGeolocationPerms() {
      const perms = await navigator.permissions.query({ name: 'geolocation' });
      setUserLocationEnabled(perms.state === 'granted');
      perms.addEventListener('change', () => {
        setUserLocationEnabled(perms.state === 'granted');
      });
    }
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
        navigator.geolocation.getCurrentPosition(
          () => {
            setUserLocationEnabled(true);
            clearInterval(interval);
          },
          () => {
            setUserLocationEnabled(false);
            clearInterval(interval);
          }
        );
      }, 2000);
      // We also want to run this once at the start of the interval to kick off the prompts
      navigator.geolocation.getCurrentPosition(
        () => {
          setUserLocationEnabled(true);
          clearInterval(interval);
        },
        () => {
          setUserLocationEnabled(false);
          clearInterval(interval);
        }
      );
      // This is the sensible way to handle it...
    } else {
      queryGeolocationPerms();
    }
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="page-wrapper">
          <Head />
          <MapPage />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
