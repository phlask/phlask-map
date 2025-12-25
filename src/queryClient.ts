import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default queryClient;

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;
