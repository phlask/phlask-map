import useIsMobile from 'hooks/useIsMobile';

import DesktopChooseResourceType from './DesktopChooseResourceType';
import MobileChooseResourceType from './MobileChooseResourceType';

const ChooseResource = () => {

  const isMobile = useIsMobile();

  return (
    <>{isMobile ? <MobileChooseResourceType /> : <DesktopChooseResourceType />}</>
  );
};

export default ChooseResource;
