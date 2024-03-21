import {
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemIcon,
  Paper,
  styled,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  setToolbarModal,
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
} from '../../actions/actions';
import { ReactComponent as IDIcon } from '../icons/ModalIDRequired.svg';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../icons/PhlaskNoText.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';
import { ReactComponent as UsersIcon } from '../icons/UsersIcon.svg';
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

function Head(props) {
  const dispatch = useDispatch();

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
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Exo:wght@700&family=Inter:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <HeaderProvider>
        {isMobile ? (<MobileHead page={page} />) : (<DesktopHead page={page} />)}
      </HeaderProvider>
    </div>
  );
}

const mapStateToProps = state => ({
  toolbarModal: state.toolbarModal
});

const mapDispatchToProps = {
  TOOLBAR_MODAL_CONTRIBUTE,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_SEARCH,
  TOOLBAR_MODAL_NONE,
  setToolbarModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);