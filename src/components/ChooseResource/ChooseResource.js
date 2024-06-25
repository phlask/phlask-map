import React from 'react';
import { isMobile } from 'react-device-detect';

import DesktopChooseResource from './DesktopChooseResource';
import MobileChooseResource from './MobileChooseResource';

const ChooseResource = () => {
    return (
        <>{isMobile ? <MobileChooseResource /> : <DesktopChooseResource />}</>
    );
};

export default ChooseResource;
