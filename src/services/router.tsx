import { createBrowserRouter } from 'react-router';
import App from 'App';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <App />
  }
]);
