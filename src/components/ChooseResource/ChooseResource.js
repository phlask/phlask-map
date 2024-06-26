import useIsMobile from 'hooks/useIsMobile';

import DesktopChooseResource from './DesktopChooseResource';
import MobileChooseResource from './MobileChooseResource';

const ChooseResource = () => {

  const isMobile = useIsMobile();

  return (
    <>{isMobile ? <MobileChooseResource /> : <DesktopChooseResource />}</>
  );
};

export default ChooseResource;
