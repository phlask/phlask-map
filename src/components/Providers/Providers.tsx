import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import ToolbarContextProvider from './ToolbarContextProvider';
import queryClient from 'services/queryClient';
import ThemeProvider from './ThemeProvider';
import { env } from 'config';

const REACT_GOOGLE_MAPS_API_KEY = env.VITE_REACT_GOOGLE_MAPS_API_KEY;

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <APIProvider apiKey={REACT_GOOGLE_MAPS_API_KEY} libraries={['places']}>
        <ToolbarContextProvider>
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ToolbarContextProvider>
      </APIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
