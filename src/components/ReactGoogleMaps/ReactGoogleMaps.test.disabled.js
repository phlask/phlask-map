import { createRoot, createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactGoogleMaps } from './ReactGoogleMaps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<ReactGoogleMaps />);
  root.unmount();
});
