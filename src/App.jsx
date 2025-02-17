import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { initAnalytics, logPageView } from 'analytics';
import Head from 'components/Head/Head';
import MapPage from 'components/MapPage/MapPage';
import theme from 'theme';
import store from 'store';
import { Provider } from 'react-redux';

const App = () => {
  initAnalytics();
  logPageView();
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
