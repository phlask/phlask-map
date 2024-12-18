import React from 'react';
import { Box, IconButton, Paper, Collapse, Button } from '@mui/material';
import CloseIcon from 'components/icons/CloseIcon';
import PhlaskIcon from 'icons/PhlaskV2';
import PhlaskNoTextIcon from 'icons/PhlaskNoText';
import UsersIcon from 'icons/UsersIcon';
import IDIcon from 'icons/ModalIdRequired';
import { HeaderContext } from 'contexts/HeaderContext';
import NavigationButtons from 'components/NavigationButtons/NavigationButtons';

const DesktopHead = props => {
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

  const buttonStyles = {
    color: '#2D3748',
    backgroundColor: 'transparent',
    width: 'fit-content',
    textDecoration: 'none',
    margin: '10px 10px',
    borderRadius: '24px',
    padding: '0 20px',
    fontSize: '16px'
  };

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
          />
          <NavigationButtons
            onItemClick={page => menuClicked(page)}
            isOpen={menuExpand}
          />
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
            />
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

export default DesktopHead;
