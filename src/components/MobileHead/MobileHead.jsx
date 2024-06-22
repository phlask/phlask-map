import React from 'react';
import { Button, Collapse, IconButton, Box, Paper } from '@mui/material';
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
    pageExpand,
    verticalAnimFinished1,
    verticalAnimFinished2,
    setVerticalAnimFinished1,
    setVerticalAnimFinished2
  } = headerContext;

  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  return (
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
                height: 'calc(100vh - 50px - 25px - 274px - 76px - 32px - 25px)'
              }}
            ></Box>
          </Collapse>
        </Box>
        <Collapse orientation="horizontal" in={pageExpand} timeout="auto">
          <Box
            sx={{
              width: 'min(900px, calc(100vw - 25px - 25px - 310px))',
              padding: '25px'
            }}
          >
            {verticalAnimFinished1 && verticalAnimFinished2 && shownPage}
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default MobileHead;
