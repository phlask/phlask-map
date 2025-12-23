import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import noop from 'utils/noop';
import CloseIcon from 'components/icons/CloseIcon';
import { HeaderContext } from 'contexts/HeaderContext';
import FilterIcon from 'icons/FilterIcon';
import SearchIcon from 'icons/SearchIcon';
import NavigationButtons from 'components/NavigationButtons/NavigationButtons';
import { PhlaskV2 } from 'icons';
import { useToolbarContext } from 'contexts/ToolbarContext';

const MobileHead = () => {
  const headerContext = React.useContext(HeaderContext);
  const { shownPage, onMenuItemClick, isMenuOpen, onMenuClose, onMenuOpen } =
    headerContext;

  const { toggle } = useToolbarContext();
  return (
    <>
      <Box
        sx={{
          backgroundColor: 'transparent',
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
                <PhlaskV2 width="154px" height="39px" />
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => toggle('search')}>
                  <SearchIcon />
                </IconButton>
                <IconButton
                  data-cy="button-filter-mobile"
                  onClick={() => toggle('filter')}
                >
                  <FilterIcon />
                </IconButton>
              </Box>
            </Box>
            <NavigationButtons
              isOpen={isMenuOpen}
              onItemClick={page => onMenuItemClick(page)}
            />
          </Box>
        </Paper>
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={Boolean(shownPage)}
        onOpen={noop}
        onClose={() => onMenuItemClick(null)}
      >
        <Box sx={theme => ({ padding: theme.spacing(1) })}>{shownPage}</Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHead;
