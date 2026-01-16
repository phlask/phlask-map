import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import ToolbarContextProvider from './ToolbarContextProvider';
import queryClient from 'services/queryClient';
import ActiveSearchLocationProvider from './ActiveSearchLocationProvider';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <APIProvider
      apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
      libraries={['places']}
    >
      <ToolbarContextProvider>
        <ActiveSearchLocationProvider>
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ActiveSearchLocationProvider>
      </ToolbarContextProvider>
    </APIProvider>
  </QueryClientProvider>
);

export default Providers;
