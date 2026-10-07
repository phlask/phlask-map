import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';
import useSelectedResource from 'hooks/useSelectedResource';
import useActiveResources from 'hooks/useActiveResources';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';
import getUserLocation from 'utils/getUserLocation';
import { useSearchParams } from 'react-router';
import { useMap } from '@vis.gl/react-google-maps';
import { toast } from 'react-toastify';
import { Alert } from '@mui/material';
import { useToolbarContext } from 'contexts/ToolbarContext';

const Toolbar = () => {
  const map = useMap();
  const [_, setSearchParams] = useSearchParams();
  const { setSelectedResource } = useSelectedResource();
  const isMobile = useIsMobile();
  const { data: resources } = useActiveResources();
  const { activeSearchLocation, onChangeActiveSearchLocation } =
    useActiveSearchLocation();
  const { setToolbarModal } = useToolbarContext();

  const onNearMeClick = async () => {
    const [userLocation, isLocationServiceDisabled] = await getUserLocation();
    let location: google.maps.LatLngLiteral;
    if (!isLocationServiceDisabled) {
      location = userLocation;
    } else if (activeSearchLocation) {
      location = activeSearchLocation;
    } else {
      return toast(
        <Alert severity="warning">
          You need to enable location services or search for a location first
        </Alert>,
        {
          toastId: 'enable-location-services',
          onOpen: () => setToolbarModal('search')
        }
      );
    }

    const closest = getClosest(resources, location);
    if (!closest) {
      return toast(
        <Alert severity="error">
          Couldn't find a nearby resource that matches your search. Adjust your
          filters and try again
        </Alert>,
        { toastId: 'no-nearby-location-found' }
      );
    }

    if (closest.gp_id) {
      setToolbarModal('search');
    }

    setSearchParams(prev => {
      setSelectedResource(closest, prev);
      onChangeActiveSearchLocation(
        {
          lat: closest.latitude,
          lng: closest.longitude,
          placeId: closest.gp_id || undefined
        },
        prev
      );

      return prev;
    });

    if (!map) {
      return;
    }

    map.panTo({
      lat: closest.latitude,
      lng: closest.longitude
    });
  };

  if (isMobile) {
    return <MobileToolbar onNearMeClick={onNearMeClick} />;
  }

  return <DesktopToolbar onNearMeClick={onNearMeClick} />;
};

export default Toolbar;
