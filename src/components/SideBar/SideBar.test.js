import { createRoot, createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { SideBar } from './SideBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SideBar />);
  root.unmount();
});
