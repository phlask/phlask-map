import {
  AppBar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Paper,
  Popover,
  Tabs,
  Toolbar,
  styled
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Contact from '../DesktopPages/Contact';
import Filter from '../Filter/Filter';
import Contribute from '../Pages/Contribute';
import Mission from '../Pages/Mission';
import Share from '../Pages/Share';
import Sidebar from '../SideBar/SideBar';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import { ReactComponent as FilterIcon } from '../icons/FilterIcon.svg';
import { ReactComponent as MenuIcon } from '../icons/HamburgerMenu.svg';
import { ReactComponent as IDIcon } from '../icons/ModalIDRequired.svg';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../icons/PhlaskNoText.svg';
import { ReactComponent as PlusCircleIcon } from '../icons/PlusCircle.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';
import { ReactComponent as UsersIcon } from '../icons/UsersIcon.svg';

const DropLink = styled(Button)(({ theme }) => ({
  color: '#2D3748',
  backgroundColor: 'transparent',
  width: 'fit-content',
  textDecoration: 'none',
  margin: '10px 25px',
  borderRadius: '24px',
  padding: '0 20px',
  '& span': {
    fontSize: '16px',
    borderRadius: '24px'
  },
  '& svg': {
    width: '36px',
    height: '36px',
    margin: '4px 0'
  },
  '&:hover': {
    backgroundColor: '#0a58ca',
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
  const isSearchShown = useSelector(state => state.isSearchShown);
  const isFilterShown = useSelector(state => state.isFilterShown);
  const open = Boolean(anchorEl);

  const handlePopover = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget.parentNode);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSidebarOpen(false);
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

  return (
    <>
      {isMobile ? (
        <>
          <Sidebar
            open={sidebarOpen}
            setOpenResourceModal={setSidebarOpen}
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
          <Filter />
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
            elevation={3}
            sx={{
              backgroundColor: '#fff',
              width: '310px',
              height: '75px',
              boxShadow:
                '0 1px 0 rgba(0, 0, 0.12, 0.12), 0 1px 0 rgba(0, 0, 0.24, 0.24)'
            }}
          >
            <IconButton
              sx={{
                margin: '15px'
              }}
              onClick={handlePopover}
            >
              <MenuIcon />
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
          </Paper>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={open}
            onClose={handleClose}
            transition
            disablePortal
          >
            <Paper>
              <Box width={310}>
                <IconButton
                  sx={{
                    margin: '15px'
                  }}
                  onClick={handlePopover}
                >
                  <CloseIcon />
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
              <Box
                sx={{
                  display: 'flex'
                }}
              >
                <Router>
                  <Tabs
                    orientation="vertical"
                    sx={{
                      padding: '0 0 15px',
                      width: '310px'
                    }}
                  >
                    <DropLink
                      component={Link}
                      to="/mission"
                      startIcon={<PhlaskNoTextIcon />}
                    >
                      About
                    </DropLink>
                    <DropLink
                      component={Link}
                      to="/share"
                      startIcon={<PlusCircleIcon />}
                    >
                      How it works
                    </DropLink>
                    <DropLink
                      component={Link}
                      to="/contribute"
                      startIcon={<UsersIcon />}
                    >
                      Join the team
                    </DropLink>
                    <DropLink
                      component={Link}
                      to="/contact"
                      startIcon={<IDIcon />}
                    >
                      Contact
                    </DropLink>
                  </Tabs>
                  <Switch>
                    <Route path={`/mission`}>
                      <Mission />
                    </Route>
                    <Route path={`/share`}>
                      <Share />
                    </Route>
                    <Route path={`/contribute`}>
                      <Contribute />
                    </Route>
                    <Route path={`/contact`}>
                      <Contact />
                    </Route>
                  </Switch>
                </Router>
              </Box>
            </Paper>
          </Popover>
        </Box>
      )}
    </>
  );
}
