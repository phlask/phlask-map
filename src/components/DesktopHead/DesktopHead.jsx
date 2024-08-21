import React from 'react';
import { Box, IconButton, Paper, Collapse, Button } from '@mui/material';
import CloseIcon from '../../components/icons/CloseIcon';
import PhlaskIcon from '../../components/icons/PHLASK_v2.svg?react';
import PhlaskNoTextIcon from '../../components/icons/PhlaskNoText.svg?react';
import UsersIcon from '../../components/icons/UsersIcon.svg?react';
import IDIcon from '../../components/icons/ModalIDRequired.svg?react';
import { HeaderContext } from '../../contexts/HeaderContext';
import DropLink from '../../components/Buttons/DropLink';

export const DesktopHead = props => {
  const headerContext = React.useContext(HeaderContext);
  const {
    shownPage,
    menuClicked,
    toggleMenuExpand,
    menuExpand,
    setShowMapControls,
    showMapControls,
    verticalAnimFinished1,
    verticalAnimFinished2,
    setVerticalAnimFinished1,
    setVerticalAnimFinished2
  } = headerContext;
  return (
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
              <PhlaskIcon width="154" height="39" />
            </Button>
          </Box>
          <Collapse
            in={Boolean(shownPage)}
            timeout="auto"
            onEntered={() => {
              if (shownPage) {
                setVerticalAnimFinished1(true);
              }
            }}
          ></Collapse>
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
                data-cy="sidebar-about-button"
              >
                About
              </DropLink>
              <DropLink
                onClick={() => menuClicked('join')}
                startIcon={<UsersIcon />}
                data-cy="sidebar-jointeam-button"
              >
                Join the team
              </DropLink>
              <DropLink
                onClick={() => menuClicked('contact')}
                startIcon={<IDIcon />}
                data-cy="sidebar-contact-button"
              >
                Contact
              </DropLink>
            </Box>
          </Collapse>
          <Collapse
            in={Boolean(shownPage)}
            timeout="auto"
            onEntered={() => {
              if (shownPage) {
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
        <Collapse
          orientation="horizontal"
          in={Boolean(shownPage)}
          timeout="auto"
        >
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
};
