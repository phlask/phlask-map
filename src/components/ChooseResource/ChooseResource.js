import React from 'react';
import { isMobile } from 'react-device-detect';

import ChooseResourceDesktop from './ChooseResourceDesktop';
import ChooseResourceMobile from './ChooseResourceMobile';

export default function ChooseResource(props) {
  return (
    <>{!isMobile ? <ChooseResourceDesktop /> : <ChooseResourceMobile />}</>
  );
}
