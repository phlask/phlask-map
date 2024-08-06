import React from 'react';

import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import noop from 'utils/noop';
import CloseIcon from '../../components/icons/CloseIcon';
import DropLink from '../../components/Buttons/DropLink';
import { HeaderContext } from '../../contexts/HeaderContext';
import { ReactComponent as FilterIcon } from '../../components/icons/FilterIcon.svg';
import { ReactComponent as PhlaskIcon } from '../../components/icons/PHLASK_v2.svg';
import { ReactComponent as SearchIcon } from '../../components/icons/SearchIcon.svg';
import { ReactComponent as PhlaskNoTextIcon } from '../../components/icons/PhlaskNoText.svg';
import { ReactComponent as UsersIcon } from '../../components/icons/UsersIcon.svg';
import { ReactComponent as IDIcon } from '../../components/icons/ModalIDRequired.svg';
import {
  setToolbarModal,
  TOOLBAR_MODAL_FILTER,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_SEARCH
} from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';

function MobileHead() {
  const dispatch = useDispatch();
  const headerContext = React.useContext(HeaderContext);
  const {
    setShowMapControls,
    shownPage,
    menuClicked,
    toggleMenuExpand,
    menuExpand,
    verticalAnimFinished1,
    verticalAnimFinished2,
    setVerticalAnimFinished1,
    setVerticalAnimFinished2
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
                    if (toolbarModal != TOOLBAR_MODAL_FILTER) {
                      dispatch(
                        setToolbarModal({
                          toolbarModal: TOOLBAR_MODAL_FILTER
                        })
                      );
                    } else {
                      dispatch(
                        setToolbarModal({ toolbarModal: TOOLBAR_MODAL_NONE })
                      );
                    }
                  }}
                >
                  <FilterIcon />
                </IconButton>
              </Box>
            </Box>
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
                  About Phlask
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
}

export default MobileHead;
