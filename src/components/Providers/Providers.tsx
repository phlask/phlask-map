import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import theme from 'theme';
import ToolbarContextProvider from './ToolbarContextProvider';
import queryClient from 'queryClient';
import ActiveSearchLocationProvider from './ActiveSearchLocationProvider';

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <APIProvider
      apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
      libraries={['places']}
    >
      <ToolbarContextProvider>
        <ActiveSearchLocationProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ActiveSearchLocationProvider>
      </ToolbarContextProvider>
    </APIProvider>
  </QueryClientProvider>
);

export default Providers;
