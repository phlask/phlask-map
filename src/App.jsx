import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import Div100vh from 'react-div-100vh';
import './App.css';
import { initAnalytics, logPageView } from './analytics';
import Head from './components/Head/Head';
import MapPage from './components/MapPage/MapPage';
import theme from './theme';

function App(props) {
  initAnalytics();
  logPageView();
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
