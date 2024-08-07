import MobileHead from '../MobileHead/MobileHead';
import { HeaderProvider } from '../../contexts/HeaderContext'; // Import the HeaderContext component
import { DesktopHead } from '../DesktopHead/DesktopHead';
import useIsMobile from 'hooks/useIsMobile.js';

export default function Head(props) {
  const isMobile = useIsMobile();

  return (
    <HeaderProvider>
      {isMobile ? <MobileHead /> : <DesktopHead />}
    </HeaderProvider>
  );
}
