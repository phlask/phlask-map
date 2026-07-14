import { Box, Fade, Stack } from '@mui/material';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import ContributeModal from 'components/ContributeModal/ContributeModal';
import Filter from 'components/Filter/Filter';
import Head from 'components/Head/Head';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedResource from 'components/SelectedResource/SelectedResource';
import Toolbar from 'components/Toolbar/Toolbar';
import { useToolbarContext } from 'contexts/ToolbarContext';

const Overlay = () => {
  const { toolbarModal } = useToolbarContext();

  const shouldShowSearchBar = toolbarModal === 'search';

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
        sx={{
          position: 'fixed',
          bottom: '25px',
          left: '25px',
          zIndex: 2,
          maxWidth: '765px'
        }}
        gap={2}
      >
        <Fade in={shouldShowSearchBar} mountOnEnter timeout={300}>
          <Box>
            <SearchBar open={shouldShowSearchBar} />
          </Box>
        </Fade>

        <Toolbar />
      </Stack>

      <ChooseResourceType />
      <Filter />

      <ContributeModal />
      <SelectedResource />
    </>
  );
};

export default Overlay;
