import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import ToolbarContextProvider from './ToolbarContextProvider';
import queryClient from 'services/queryClient';
import ThemeProvider from './ThemeProvider';

const REACT_GOOGLE_MAPS_API_KEY = import.meta.env
  .VITE_REACT_GOOGLE_MAPS_API_KEY;
const Providers = ({ children }: PropsWithChildren) => {
  if (!REACT_GOOGLE_MAPS_API_KEY) {
    const message = import.meta.env.DEV
      ? 'Google Maps API key is missing! Make sure that `VITE_REACT_GOOGLE_MAPS_API_KEY` is defined in a `.env` file. Refer to `.example.env`.'
      : 'An unexpected error happened with maps. Please try again later.';
    throw new Error(message);
  }
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
