import { createBrowserRouter } from 'react-router';
import App from 'App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/about',
    element: <App />
  },
  {
    path: '/contact',
    element: <App />
  },
  {
    path: '/join',
    element: <App />
  },
  {
    path: '*',
    element: <App />
  }
]);
