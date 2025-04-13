import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'App';
import AnalyticsWrapper from 'analytics';

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
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <AnalyticsWrapper>
      <App />
    </AnalyticsWrapper>
  </StrictMode>
);
