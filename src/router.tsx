import { createBrowserRouter } from 'react-router';
import App from 'App';

export const router = createBrowserRouter([
  {
    index: true,
    element: <App />
  }
]);
