// redeploying for test link -- akk 
// import useIsMobile from 'hooks/useIsMobile';
// import MobileHead from 'components/MobileHead/MobileHead';
import { HeaderProvider } from 'contexts/HeaderContext'; // Import the HeaderContext component
// import DesktopHead from '../DesktopHead/DesktopHead';

const Head = () => {
  // const isMobile = useIsMobile();

  return (
    <HeaderProvider>
      
      {/* {isMobile ? <MobileHead /> : <DesktopHead />} comment for new link*/}
      <></>
    </HeaderProvider>
  );
};

export default Head;
