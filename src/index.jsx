import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

let basepath = '';
// Test-specific routing logic
let host = window.location.host;
if (host === 'test.phlask.me') {
  basepath = window.location.pathname;
}

let path = window.location.hash.slice(1);
if (path) {
  window.location.hash = '';
  window.history.replaceState({}, '', `${basepath}${path}`);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={basepath}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
