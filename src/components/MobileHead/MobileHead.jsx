import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import noop from 'utils/noop';
import CloseIcon from 'components/icons/CloseIcon';
import { HeaderContext } from 'contexts/HeaderContext';
import FilterIcon from 'icons/FilterIcon';
import PhlaskIcon from 'icons/PhlaskV2';
import SearchIcon from 'icons/SearchIcon';
import {
  setToolbarModal,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_SEARCH
} from 'actions/actions';
import NavigationButtons from 'components/NavigationButtons/NavigationButtons';

const MobileHead = () => {
  const dispatch = useDispatch();
  const headerContext = React.useContext(HeaderContext);
  const {
    setShowMapControls,
    shownPage,
    menuClicked,
    toggleMenuExpand,
    menuExpand
  } = headerContext;

  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'transparent',
          position: 'absolute',
          maxWidth: '100%',
          zIndex: '9',
          width: '100%'
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            padding: '0 0 0 0'
          }}
        >
          <Box sx={{ height: 'fit-content', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <IconButton
                sx={{
                  margin: '15px'
                }}
                onClick={toggleMenuExpand}
                data-cy="head-sidebar-button"
              >
                <CloseIcon close={menuExpand} />
              </IconButton>
              <Button
                sx={{
                  margin: '15px'
                }}
                onClick={() => setShowMapControls(true)}
              >
                <PhlaskIcon width="154px" height="39px" />
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  onClick={() => {
                    dispatch(
                      setToolbarModal(
                        toolbarModal !== TOOLBAR_MODAL_SEARCH
                          ? TOOLBAR_MODAL_SEARCH
                          : TOOLBAR_MODAL_NONE
                      )
                    );
                  }}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    if (toolbarModal !== TOOLBAR_MODAL_FILTER) {
                      dispatch(setToolbarModal(TOOLBAR_MODAL_FILTER));
                    } else {
                      dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
                    }
                  }}
                >
                  <FilterIcon />
                </IconButton>
              </Box>
            </Box>
            <NavigationButtons
              isOpen={menuExpand}
              onItemClick={page => menuClicked(page)}
            />
          </Box>
        </Paper>
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={Boolean(shownPage)}
        onOpen={noop}
        onClose={() => menuClicked(shownPage)}
      >
        <Box sx={theme => ({ padding: theme.spacing(1) })}>{shownPage}</Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHead;
