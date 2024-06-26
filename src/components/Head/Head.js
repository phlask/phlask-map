import About from '../Pages/About.js';
import Contact from '../Pages/Contact.js';
import Join from '../Pages/Join.js';
import MobileHead from '../MobileHead/MobileHead';
import { HeaderProvider } from '../../contexts/HeaderContext'; // Import the HeaderContext component
import { DesktopHead } from '../DesktopHead/DesktopHead';
import useIsMobile from 'hooks/useIsMobile.js';

export default function Head(props) {
  const isMobile = useIsMobile();

  let page = null;
  switch (HeaderProvider.shownPage) {
    case 'about':
      page = <About />;
      break;
    case 'join':
      page = <Join />;
      break;
    case 'contact':
      page = <Contact />;
      break;
    default:
      break;
  }

  return (
    <>
      <HeaderProvider>
        {isMobile ? <MobileHead /> : <DesktopHead />}
      </HeaderProvider>
    </>
  );
}
