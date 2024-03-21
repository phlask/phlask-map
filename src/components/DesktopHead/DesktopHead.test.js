import React from 'react';
import ReactDOM from 'react-dom';
import { DesktopHead } from './DesktopHead.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DesktopHead />, div);
    ReactDOM.unmountComponentAtNode(div);
});
