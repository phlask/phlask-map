import {
  AppBar,
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemIcon,
  Paper,
  Toolbar,
  styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import About from '../Pages/About.js';
import Contact from '../Pages/Contact.js';
import Join from '../Pages/Join.js';
import Sidebar from '../SideBar/SideBar';
import { ReactComponent as FilterIcon } from '../icons/FilterIcon.svg';
import { ReactComponent as MenuIcon } from '../icons/HamburgerMenu.svg';
import { ReactComponent as IDIcon } from '../icons/ModalIDRequired.svg';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../icons/PhlaskNoText.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';
import { ReactComponent as UsersIcon } from '../icons/UsersIcon.svg';

const CloseIconBar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '4px',
  width: '24px',
  height: '2px',
  backgroundColor: '#2D3748',
  borderRadius: '1px',
  transitionDuration: '0.5s',
  transitionProperty: 'transform opacity'
}));

const CloseIcon = props => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '32px',
        height: '32px'
      }}
    >
      <CloseIconBar
        sx={{
          top: '7px',
          transform: `translateY(${props.close ? 8 : 0}px) rotate(${
            props.close ? 45 : 0
          }deg)`
        }}
      />
      <CloseIconBar
        sx={{
          top: '15px',
          transform: `rotate(${props.close ? 45 : 0}deg)`,
          opacity: `${props.close ? 0 : 1}`
        }}
      />
      <CloseIconBar
        sx={{
          top: '23px',
          transform: `translateY(${props.close ? -8 : 0}px) rotate(${
            props.close ? -45 : 0
          }deg)`
        }}
      />
    </Box>
  );
};

const DropLink = styled(Button)(({ theme }) => ({
  color: '#2D3748',
  backgroundColor: 'transparent',
  width: 'fit-content',
  textDecoration: 'none',
  margin: '10px 25px',
  borderRadius: '24px',
  padding: '0 20px',
  fontSize: '16px',
  '& span': {
    borderRadius: '24px'
  },
  '& svg': {
    width: '36px',
    height: '36px',
    margin: '4px 0'
  },
  '&:hover': {
    backgroundColor: '#5286E9',
    color: '#fff'
  },
  '&:nth-child(1):hover svg path': {
    stroke: '#fff',
    fill: '#fff'
  },
  '&:nth-child(2):hover svg path': {
    stroke: '#fff'
  },
  '&:nth-child(3):hover svg path': {
    stroke: '#fff'
  },
  '&:nth-child(4):hover svg path': {
    stroke: '#fff'
  }
}));

const NavIcon = styled(ListItemIcon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  '& svg': {
    width: '30px',
    height: 'auto'
  }
}));

export default function Head() {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMapControls, setShowMapControls] = useState(false);
  const [menuExpand, setMenuExpand] = useState(false);
  const [pageExpand, setPageExpand] = useState(false);
  const [verticalAnimFinished1, setVerticalAnimFinished1] = useState(false);
  const [verticalAnimFinished2, setVerticalAnimFinished2] = useState(false);
  const [shownPage, setShownPage] = useState(null);
  const isSearchShown = useSelector(state => state.isSearchShown);
  const isFilterShown = useSelector(state => state.isFilterShown);
  const open = Boolean(anchorEl);

  const toggleMenuExpand = event => {
    if (menuExpand) {
      setVerticalAnimFinished1(false);
      setVerticalAnimFinished2(false);
      setPageExpand(false);
      setShownPage(null);
    }
    setMenuExpand(!menuExpand);
  };

  const toggleSearchBar = () => {
    dispatch({
      type: 'TOGGLE_SEARCH_BAR'
      // isShown: !isSearchShown
    });
  };

  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };

  const showSidebar = () => {
    setSidebarOpen(true);
  };

  const menuClicked = page => {
    if (page == shownPage) {
      setVerticalAnimFinished1(false);
      setVerticalAnimFinished2(false);
      setPageExpand(false);
      setShownPage(null);
    } else {
      setPageExpand(true);
      setShownPage(page);
    }
  };

  const pagePaths = /(\/mission)|(\/share)|(\/project)|(\/contribute)/;
  const isNotMapPage = () => {
    return window.location.pathname.match(pagePaths);
  };

  //On render, check if on map page to show or hide map controls
  useEffect(() => {
    if (isNotMapPage()) {
      setShowMapControls(false);
    } else {
      setShowMapControls(true);
    }
  }, [isNotMapPage, setShowMapControls]);

  let page = null;
  switch (shownPage) {
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
      {isMobile ? (
        <>
          <Sidebar
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            showControls={setShowMapControls}
          />
          <AppBar>
            <Toolbar
              sx={{
                backgroundColor: '#fff',
                color: '#fff',
                boxShadow:
                  '0 1px 0 rgba(0, 0, 0.12, 0.12), 0 1px 0 rgba(0, 0, 0.24, 0.24)',
                display: 'flex'
              }}
            >
              <IconButton
                onClick={setSidebarOpen}
                sx={{
                  position: 'relative',
                  left: '-10px',
                  right: '6px'
                }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" onClick={() => setShowMapControls(true)}>
                <PhlaskIcon
                  sx={{
                    position: 'relative',
                    top: '-10px'
                  }}
                />
              </Link>

              {showMapControls ? (
                <Box
                  sx={{
                    position: 'relative',
                    marginLeft: 'auto'
                  }}
                >
                  <IconButton onClick={toggleSearchBar}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    sx={{ marginRight: '-8px' }}
                    onClick={toggleFilterModal}
                  >
                    <FilterIcon />
                  </IconButton>
                </Box>
              ) : null}
            </Toolbar>
          </AppBar>
          <FilterDrawer />
        </>
      ) : (
        <Box
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            maxWidth: '100%',
            zIndex: '9',
            margin: '25px auto 0 25px'
          }}
        >
          <Paper
            sx={{
              display: 'grid',
              gridAutoRows: 'min-content',
              gridTemplateColumns: '310px 1fr',
              borderRadius: '10px'
            }}
          >
            <Box sx={{ height: 'fit-content' }}>
              <Box width={310}>
                <IconButton
                  sx={{
                    margin: '15px'
                  }}
                  onClick={toggleMenuExpand}
                >
                  <CloseIcon close={menuExpand} />
                </IconButton>
                <Button
                  href="/"
                  sx={{
                    margin: '15px'
                  }}
                  onClick={() => setShowMapControls(true)}
                >
                  <PhlaskIcon
                    sx={{
                      position: 'relative',
                      top: '-10px'
                    }}
                  />
                </Button>
              </Box>
              <Collapse
                in={pageExpand}
                timeout="auto"
                onEntered={() => {
                  if (pageExpand) {
                    setVerticalAnimFinished1(true);
                  }
                }}
              >
                <Box sx={{ height: '50px' }}></Box>
              </Collapse>
              <Collapse in={menuExpand} timeout="auto">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <DropLink
                    onClick={() => menuClicked('about')}
                    startIcon={<PhlaskNoTextIcon />}
                  >
                    About
                  </DropLink>
                  <DropLink
                    onClick={() => menuClicked('join')}
                    startIcon={<UsersIcon />}
                  >
                    Join the team
                  </DropLink>
                  <DropLink
                    onClick={() => menuClicked('contact')}
                    startIcon={<IDIcon />}
                  >
                    Contact
                  </DropLink>
                </Box>
              </Collapse>
              <Collapse
                in={pageExpand}
                timeout="auto"
                onEntered={() => {
                  if (pageExpand) {
                    setVerticalAnimFinished2(true);
                  }
                }}
              >
                <Box
                  sx={{
                    height:
                      'calc(100vh - 50px - 25px - 274px - 76px - 32px - 25px)'
                  }}
                ></Box>
              </Collapse>
            </Box>
            <Collapse
              orientation="horizontal"
              in={pageExpand}
              timeout="auto"
            >
              <Box
                sx={{
                  width: 'min(900px, calc(100vw - 25px - 25px - 310px))',
                  padding: '25px'
                }}
              >
                {verticalAnimFinished1 && verticalAnimFinished2 && page}
              </Box>
            </Collapse>
          </Paper>
        </Box>
      )}
    </div>
  );
}
