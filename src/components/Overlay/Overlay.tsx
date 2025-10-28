import { Box, Fade, Stack } from '@mui/material';
import { useMap } from '@vis.gl/react-google-maps';
import { resetFilterFunction, TOOLBAR_MODAL_SEARCH } from 'actions/actions';
import AddResourceModalV2 from 'components/AddResourceModal/AddResourceModalV2';
import ChooseResourceType from 'components/ChooseResourceType/ChooseResourceType';
import Filter from 'components/Filter/Filter';
import Head from 'components/Head/Head';
import SearchBar from 'components/SearchBar/SearchBar';
import SelectedTap from 'components/SelectedTap/SelectedTap';
import Toolbar from 'components/Toolbar/Toolbar';
import filters from 'fixtures/filters';
import useAppDispatch from 'hooks/useDispatch';
import useAppSelector from 'hooks/useSelector';
import { useState } from 'react';

type OverlayProps = {
  onSearch: (location: google.maps.LatLngLiteral) => void;
};

const noActiveFilterTags = Object.entries(filters).reduce(
  (prev, [key, value]) => ({
    ...prev,
    [key]: value.categories.map(category => {
      if (category.type === 0) {
        return new Array(category.tags.length).fill(false);
      }
      return category.tags.length;
    })
  }),
  {}
);

const Overlay = ({ onSearch }: OverlayProps) => {
  const dispatch = useAppDispatch();
  const map = useMap();
  const resourceType = useAppSelector(
    state => state.filterMarkers.resourceType
  );
  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );
  const [activeFilterTags, setActiveFilterTags] = useState<{
    [filter: string]: string[];
  }>(JSON.parse(JSON.stringify(noActiveFilterTags)));

  const searchForLocation = (location: google.maps.LatLngLiteral) => {
    if (!map) {
      return;
    }

    map.panTo(location);
    map.setZoom(16);
    onSearch({ lat: Number(location.lat), lng: Number(location.lng) });
  };

  const clearAllTags = () => {
    setActiveFilterTags(JSON.parse(JSON.stringify(noActiveFilterTags)));
    dispatch(resetFilterFunction());
  };

  return (
    <Stack
      zIndex={theme => theme.zIndex.appBar}
      position="fixed"
      height="100vh"
      width="100vw"
      justifyContent="space-between"
      sx={theme => ({
        pointerEvents: 'none',
        [theme.breakpoints.up('md')]: {
          padding: '25px'
        }
      })}
    >
      <Stack justifyContent="space-between" flex={1} height="fit-content">
        <Stack direction="row" flex={1} justifyContent="space-between">
          <Head />
          <SelectedTap />
        </Stack>

        <Stack maxWidth="688px" gap={2}>
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
          <Filter
            resourceType={resourceType}
            filters={filters}
            clearAll={clearAllTags}
            onChange={setActiveFilterTags}
            activeTags={activeFilterTags}
          />
          <AddResourceModalV2 />
          <Toolbar />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Overlay;
