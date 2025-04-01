import { createRoot, createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

it('does not render due to Google Maps JS API library', () => {
  const div = document.createElement('div');

  expect(() => {
    const root = createRoot(div);
    root.render(<SearchBar />);
  }).toThrow();

  const root = createRoot(div);
  root.unmount();
});
