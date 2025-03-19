import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { initAnalytics, logPageView } from 'analytics';
import Head from 'components/Head/Head';
import ReactGoogleMaps from 'components/ReactGoogleMaps/ReactGoogleMaps';
import theme from 'theme';
import store from 'store';
import { Provider } from 'react-redux';
import GeolocationTracker from 'components/GeolocationTracker/GeolocationTracker';

const App = () => {
  initAnalytics();
  logPageView();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GeolocationTracker />
        <CssBaseline />
        <div className="page-wrapper">
          <Head />
          <ReactGoogleMaps />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
