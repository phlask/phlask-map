import useIsMobile from 'hooks/useIsMobile';
import MobileHead from 'components/MobileHead/MobileHead';
import HeaderProvider from 'components/Head/HeaderProvider';
import DesktopHead from '../DesktopHead/DesktopHead';

const Head = () => {
  const isMobile = useIsMobile();

  return (
    <HeaderProvider>
      {isMobile ? <MobileHead /> : <DesktopHead />}
    </HeaderProvider>
  );
};

export default Head;
