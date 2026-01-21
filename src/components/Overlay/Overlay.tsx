import { Box, Fade, Stack } from '@mui/material';
import AddResourceModal from 'components/AddResourceModal/AddResourceModal';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import Filter from 'components/Filter/Filter';
import Head from 'components/Head/Head';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedResource from 'components/SelectedResource/SelectedResource';
import Toolbar from 'components/Toolbar/Toolbar';
import { useToolbarContext } from 'contexts/ToolbarContext';

const Overlay = () => {
  const { toolbarModal } = useToolbarContext();

  return (
    <>
      <Stack
        sx={theme => ({
          zIndex: theme.zIndex.appBar,
          position: 'fixed',
          width: '100vw',
          [theme.breakpoints.up('md')]: {
            width: 'auto',
            top: '25px',
            left: '25px'
          }
        })}
        justifyContent="space-between"
        flex={1}
        height="fit-content"
      >
        <Head />
      </Stack>

      <Stack
        sx={theme => ({
          position: 'fixed',
          bottom: '25px',
          left: '25px',
          zIndex: theme.zIndex.appBar,
          maxWidth: '765px'
        })}
        gap={2}
      >
        <Fade in={toolbarModal === 'search'} mountOnEnter timeout={300}>
          <Box>
            <SearchBar open={toolbarModal === 'search'} />
          </Box>
        </Fade>

        <Toolbar />
      </Stack>

      <ChooseResourceType />
      <Filter />
      <AddResourceModal />
      <SelectedResource />
    </>
  );
};

export default Overlay;
