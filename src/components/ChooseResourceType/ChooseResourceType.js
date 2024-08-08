import useIsMobile from 'hooks/useIsMobile';
import DesktopChooseResourceType from './DesktopChooseResourceType';
import MobileChooseResourceType from './MobileChooseResourceType';

const ChooseResourceType = props => {

  const isMobile = useIsMobile();

  return (
    <>{!isMobile ?
      <DesktopChooseResourceType resourceTypeInfo={props.resourceTypeInfo} />
      :
      <MobileChooseResourceType resourceTypeInfo={props.resourceTypeInfo} />}
    </>
  );
};

export default ChooseResourceType;
