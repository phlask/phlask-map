/// <reference types="google.maps" />

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/react-query').QueryClient;
  }
}
