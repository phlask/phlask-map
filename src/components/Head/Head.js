import {
  AppBar,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Paper,
  Popper,
  styled,
  Grow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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

const SidebarLink = styled(NavLink)(({ theme }) => ({
  color: '#2D3748',
  textDecoration: 'none',
  '&.active': {
    color: '#2D3748',
    textDecoration: 'none'
  },
  '& span': {
    fontSize: '16px',
    marginLeft: '10px'
  }
}));

const NavIcon = styled(ListItemIcon)(({ theme }) => ({
  marginLeft: '25px',
  width: '30px',
  height: '30px',
  '& svg': {
    width: '30px',
    height: 'auto'
  }
}));

export default function Head() {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showMapControls, setShowMapControls] = useState(true);
  const isSearchShown = useSelector(state => state.isSearchShown);
  const isFilterShown = useSelector(state => state.isFilterShown);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const handleClose = () => {
    setMenuOpen(false);
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
      <AppBar
        sx={{
          width: '310px',
          height: '75px',
          margin: '25px auto 0 25px',
          left: '0',
          right: 'auto',
          borderRadius: '10px'
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: '#fff',
            color: '#fff',
            boxShadow:
              '0 1px 0 rgba(0, 0, 0.12, 0.12), 0 1px 0 rgba(0, 0, 0.24, 0.24)',
            display: 'flex',
            justifyContent: 'space-evenly',
            borderRadius: menuOpen ? '10px 10px 0 0' : '10px',
            height: '100%'
          }}
        >
          <IconButton
            onClick={toggleMenu}
            sx={{
              position: 'relative',
              left: '-10px',
              right: '6px'
            }}
          >
            <MenuIcon style={{ display: menuOpen ? 'none' : 'block' }} />
            <CloseIcon style={{ display: menuOpen ? 'block' : 'none' }} />
          </IconButton>
          <Link to="/" onClick={() => setShowMapControls(true)}>
            <PhlaskIcon
              sx={{
                position: 'relative',
                top: '-10px'
              }}
            />
          </Link>
          <Popper
            anchorEl={document.getElementsByTagName('header')[0]}
            open={menuOpen}
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
                <Paper
                  sx={{
                    width: '310px',
                    padding: '1rem 0',
                    borderRadius: '0 0 10px 10px'
                  }}
                >
                  <MenuList>
                    <SidebarLink to="mission" onClick={handleClose}>
                      <MenuItem>
                        <NavIcon>
                          <PhlaskNoTextIcon />
                        </NavIcon>
                        <ListItemText>About</ListItemText>
                      </MenuItem>
                    </SidebarLink>

                    <SidebarLink to="share" onClick={handleClose}>
                      <MenuItem>
                        <NavIcon>
                          <PlusCircleIcon />
                        </NavIcon>
                        <ListItemText sx={{ paddingBottom: '5px' }}>
                          How to PHLASK
                        </ListItemText>
                      </MenuItem>
                    </SidebarLink>

                    <SidebarLink to="contribute" onClick={handleClose}>
                      <MenuItem>
                        <NavIcon>
                          <UsersIcon />
                        </NavIcon>
                        <ListItemText>Join the team</ListItemText>
                      </MenuItem>
                    </SidebarLink>

                    <SidebarLink to="project" onClick={handleClose}>
                      <MenuItem>
                        <NavIcon>
                          <IDIcon />
                        </NavIcon>
                        <ListItemText>Acknowledgements</ListItemText>
                      </MenuItem>
                    </SidebarLink>
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
      <FilterDrawer />
    </>
  );
}
