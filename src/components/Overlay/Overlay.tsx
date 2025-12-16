import { Box, Fade, Stack } from '@mui/material';
import { useMap } from '@vis.gl/react-google-maps';
import { TOOLBAR_MODAL_SEARCH } from 'actions/actions';
import AddResourceModalV2 from 'components/AddResourceModal/AddResourceModalV2';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import Filter from 'components/Filter/Filter';
import Head from 'components/Head/Head';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedTap from 'components/SelectedTap/SelectedTap';
import Toolbar from 'components/Toolbar/Toolbar';
import useAppSelector from 'hooks/useSelector';

type OverlayProps = {
  onSearch: (location: google.maps.LatLngLiteral) => void;
};

const Overlay = ({ onSearch }: OverlayProps) => {
  const map = useMap();
  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );

  const searchForLocation = (location: google.maps.LatLngLiteral) => {
    if (!map) {
      return;
    }

    map.panTo(location);
    map.setZoom(16);
    onSearch({ lat: Number(location.lat), lng: Number(location.lng) });
  };

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
        <Fade
          in={toolbarModal === TOOLBAR_MODAL_SEARCH}
          mountOnEnter
          timeout={300}
        >
          <Box>
            <SearchBar search={location => searchForLocation(location)} />
          </Box>
        </Fade>

        <ChooseResourceType />
        <Filter />
        <AddResourceModalV2 />
        <Toolbar />
      </Stack>

      <SelectedTap />
    </>
  );
};

export default Overlay;
