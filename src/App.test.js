import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

jest.mock('react-ga');

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  root.unmount();
});
