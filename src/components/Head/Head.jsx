import useIsMobile from 'hooks/useIsMobile';
import MobileHead from '../MobileHead/MobileHead';
import { HeaderProvider } from '../../contexts/HeaderContext'; // Import the HeaderContext component
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
