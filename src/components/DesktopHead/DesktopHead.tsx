import React from 'react';
import { Box, IconButton, Paper, Collapse, Button, Stack } from '@mui/material';
import CloseIcon from 'components/Head/CloseIcon';
import PhlaskIcon from 'icons/PhlaskV2';
import { HeaderContext } from 'contexts/HeaderContext';
import NavigationButtons from 'components/NavigationButtons/NavigationButtons';

const DesktopHead = () => {
  const headerContext = React.useContext(HeaderContext);
  const { shownPage, onMenuItemClick, isMenuOpen, onMenuClose, onMenuOpen } =
    headerContext;

  return (
    <Stack direction="row" height="fit-content">
      <Paper
        sx={{
          borderRadius: '10px'
        }}
      >
        <Box>
          <Box width={310}>
            <IconButton
              sx={{
                margin: '15px'
              }}
              onClick={isMenuOpen ? onMenuClose : onMenuOpen}
              data-cy="head-sidebar-button"
            >
              <CloseIcon isOpen={isMenuOpen} />
            </IconButton>
            <Button
              sx={{
                margin: '15px'
              }}
            >
              <PhlaskIcon width="154" height="39" />
            </Button>
          </Box>
          <Collapse in={Boolean(shownPage)} timeout="auto" />
          <NavigationButtons
            onItemClick={page => onMenuItemClick(page)}
            isOpen={isMenuOpen}
          />
        </Box>
      </Paper>
      <Collapse
        orientation="horizontal"
        in={Boolean(shownPage)}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 400, exit: 0 }}
      >
        <Paper
          sx={{
            padding: '25px',
            width: 'min(900px, calc(100vw - 25px - 25px - 310px))',
            display: 'flex'
          }}
        >
          {shownPage}
        </Paper>
      </Collapse>
    </Stack>
  );
};

export default DesktopHead;
