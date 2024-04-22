import React from 'react';
import {
  ListItemIcon,
  styled,
} from '@mui/material';
import { isMobile } from 'react-device-detect';
import About from '../Pages/About.js';
import Contact from '../Pages/Contact.js';
import Join from '../Pages/Join.js';
import MobileHead from '../MobileHead/MobileHead';
import { HeaderProvider } from '../../contexts/HeaderContext'; // Import the HeaderContext component
import { DesktopHead } from '../DesktopHead/DesktopHead'



const NavIcon = styled(ListItemIcon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  '& svg': {
    width: '30px',
    height: 'auto'
  }
}));

export default function Head(props) {

  const pagePaths = /(\/mission)|(\/share)|(\/project)|(\/contribute)/;
  const isNotMapPage = () => {
    return window.location.pathname.match(pagePaths);
  };

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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@700&family=Inter:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <HeaderProvider>
        {isMobile ? (<MobileHead />) : (<DesktopHead />)}
      </HeaderProvider>
    </>
  );
}