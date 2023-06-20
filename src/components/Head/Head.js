import {
  AppBar,
  Box,
  Button,
  Collapse,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Paper,
  Popover,
  Stack,
  styled,
  Grow,
  Tabs,
  Tab
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Sidebar from '../SideBar/SideBar';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import { ReactComponent as MenuIcon } from '../icons/HamburgerMenu.svg';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../icons/PhlaskNoText.svg';
import { ReactComponent as SearchIcon } from '../icons/SearchIcon.svg';
import { ReactComponent as SlidersIcon } from '../icons/SlidersIcon.svg';
import { ReactComponent as IDIcon } from '../icons/ModalIDRequired.svg';
import { ReactComponent as PlusCircleIcon } from '../icons/PlusCircle.svg';
import { ReactComponent as UsersIcon } from '../icons/UsersIcon.svg';
import { borderRadius } from '@mui/system';
import { isMobile } from 'react-device-detect';
import Contribute from '../Pages/Contribute';
import Mission from '../Pages/Mission';
import Share from '../Pages/Share';
import Project from '../Pages/Project';

const DropLink = styled(Button)(({ theme }) => ({
  color: '#2D3748',
  backgroundColor: 'transparent',
  width: 'fit-content',
  textDecoration: 'none',
  padding: '0 10px 0 0',
  margin: '10px 0 10px 25px',
  borderRadius: '24px',
  '& span': {
    fontSize: '16px',
    marginLeft: '10px',
    borderRadius: '24px'
  },
  '& li': {
    padding: '0px',
    justifyContent: 'center'
  },
  '& svg': {
    width: '40px',
    height: '41px'
  },
  '&:hover': {
    backgroundColor: '#0a58ca',
    color: '#ffffff'
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

  const handlePopover = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

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
    }
  }, [isNotMapPage, setShowMapControls]);

  return (
    <>
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
                    marginLeft: isMobile ? 'auto' : '25px'
                  }}
                >
                  <IconButton onClick={toggleSearchBar}>
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    sx={{ marginRight: '-8px' }}
                    onClick={toggleFilterModal}
                  >
                    <SlidersIcon />
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
            elevation = {3}
            sx={{
              padding: '15px',
              backgroundColor: '#fff',
              width: '310px',
              height: '75px',
              boxShadow: '0 1px 0 rgba(0, 0, 0.12, 0.12), 0 1px 0 rgba(0, 0, 0.24, 0.24)',
            }}
          >
            <IconButton
              onClick={handlePopover}
            >
              <MenuIcon />
            </IconButton>
            <Button 
              href="/" 
              sx={{
                marginLeft: '20px'
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
            open={open}
            onClose={handleClose}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom'
                }}
              >
                <Paper>
                  <Router>
                    <Tabs orientation="vertical">
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
                        How to PHLASK
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
                        to="/project"
                        startIcon={<IDIcon />}
                      >
                        Acknowledgements
                      </DropLink>
                    </Tabs>

                    <Switch>
                      <Route path={`/about`}>
                        <Mission />
                      </Route>
                      <Route path={`/share`}>
                        <Share />
                      </Route>
                      <Route path={`/contribute`}>
                        <Contribute />
                      </Route>
                      <Route path={`/project`}>
                        <Project />
                      </Route>
                    </Switch>
                  </Router>
                </Paper>
              </Grow>
            )}
          </Popover>
        </Box>
      )}
    </>
  );
}
