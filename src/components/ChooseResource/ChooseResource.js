import React from 'react';
import { isMobile } from 'react-device-detect';

import ChooseResourceDesktop from './ChooseResourceDesktop';
import ChooseResourceMobile from './ChooseResourceMobile';

const ChooseResource = () => {
  return (
    <>{!isMobile ? <ChooseResourceDesktop /> : <ChooseResourceMobile />}</>
  );
};

export default ChooseResource;
