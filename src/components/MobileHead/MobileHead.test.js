import React from 'react';
import ReactDOM from 'react-dom';
import { MobileHead } from './MobileHead';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MobileHead />, div);
    ReactDOM.unmountComponentAtNode(div);
});
