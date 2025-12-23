import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';
import type { PropsWithChildren } from 'react';
import theme from 'theme';
import ToolbarContextProvider from './ToolbarContextProvider';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <APIProvider
      apiKey="AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I"
      libraries={['places']}
    >
      <ToolbarContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ToolbarContextProvider>
    </APIProvider>
  </QueryClientProvider>
);

export default Providers;
