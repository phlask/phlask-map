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
import {
  ActiveOverlaySectionContext,
  type OverlaySection
} from 'contexts/ActiveOverlaySectionContext';
import useIsMobile from 'hooks/useIsMobile';
import useAppSelector from 'hooks/useSelector';
import { useState, type ReactNode } from 'react';

type OverlayProps = {
  children: ReactNode;
  onSearch: (location: google.maps.LatLngLiteral) => void;
};

const Overlay = ({ onSearch, children }: OverlayProps) => {
  const [activeOverlaySection, setActiveOverlaySection] =
    useState<OverlaySection | null>(null);
  const isMobile = useIsMobile();
  const map = useMap();
  const resourceType = useAppSelector(
    state => state.filterMarkers.resourceType
  );
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
    <ActiveOverlaySectionContext
      value={[activeOverlaySection, setActiveOverlaySection]}
    >
      <Stack
        zIndex={theme => theme.zIndex.appBar}
        position="fixed"
        height="100vh"
        width="100vw"
        justifyContent="space-between"
        sx={theme => ({
          pointerEvents: !isMobile ? 'none' : 'all',
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

          <Stack maxWidth="765px" gap={2}>
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
            <Filter resourceType={resourceType} />
            <AddResourceModalV2 />
            <Toolbar />
          </Stack>
        </Stack>
        {
          // On mobile, we want the map to be part of this container
          // so that it reacts to pointer events
          isMobile && children
        }
      </Stack>

      {
        // On desktop, pointer events are disabled
        !isMobile && children
      }
    </ActiveOverlaySectionContext>
  );
};

export default Overlay;
