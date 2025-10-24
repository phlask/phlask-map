import { CssBaseline, ThemeProvider } from '@mui/material';
import { APIProvider } from '@vis.gl/react-google-maps';
import GeolocationTracker from 'components/GeolocationTracker/GeolocationTracker';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import theme from 'theme';

const Providers = ({ children }: PropsWithChildren) => (
  <APIProvider
    apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
    libraries={['places']}
  >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GeolocationTracker />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  </APIProvider>
);

export default Providers;
