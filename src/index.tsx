import { StrictMode } from 'react';
import { createRoot, type Container } from 'react-dom/client';
import App from 'App';
import Providers from 'components/Providers/Providers';

let basepath = '';
// Test-specific routing logic
const { host } = window.location;
if (host === 'test.phlask.me') {
  basepath = window.location.pathname;
}

const path = window.location.hash.slice(1);
if (path) {
  window.location.hash = '';
  window.history.replaceState({}, '', `${basepath}${path}`);
}

const rootElement = document.getElementById('root');
// We use a non-null assertion here because we are sure that an element with id root exists
if (!rootElement) {
  throw new Error(
    "Couldn't load the React application on a non-existing element with id 'root'."
  );
}

const root = createRoot(rootElement satisfies Container);

root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
