import useIsMobile from 'hooks/useIsMobile';
import DesktopChooseResourceType from './DesktopChooseResourceType';
import MobileChooseResourceType from './MobileChooseResourceType';

const ChooseResourceType = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileChooseResourceType />;
  }

  return <DesktopChooseResourceType />;
};

export default ChooseResourceType;
