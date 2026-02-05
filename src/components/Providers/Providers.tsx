import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import ToolbarContextProvider from './ToolbarContextProvider';
import EditResourceProvider from './EditResourceProvider';
import queryClient from 'services/queryClient';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <APIProvider
      apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
      libraries={['places']}
    >
      <ToolbarContextProvider>
        <EditResourceProvider>
          <ThemeProvider>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </EditResourceProvider>
      </ToolbarContextProvider>
    </APIProvider>
  </QueryClientProvider>
);

export default Providers;
