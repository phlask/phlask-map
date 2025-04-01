import { createRoot, createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Head } from './Head';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<Head />);
  root.unmount();
});
