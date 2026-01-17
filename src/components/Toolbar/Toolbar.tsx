import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import { useMap } from '@vis.gl/react-google-maps';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';
import useSelectedResource from 'hooks/useSelectedResource';
import type { UserLocation } from 'hooks/queries/useGetUserLocationQuery';
import useActiveResources from 'hooks/useActiveResources';

const Toolbar = () => {
  const map = useMap();
  const { setSelectedResource } = useSelectedResource();
  const isMobile = useIsMobile();
  const { data: resources } = useActiveResources();

  const onNearMeClick = async (userLocation: UserLocation | null) => {
    if (!userLocation) {
      return;
    }

    const closest = getClosest(resources, userLocation);
    if (!closest) return;

    setSelectedResource(closest);
    if (map) {
      map.panTo({
        lat: closest.latitude,
        lng: closest.longitude
      });
    }
  };

  if (isMobile) {
    return <MobileToolbar onNearMeClick={onNearMeClick} />;
  }

  return <DesktopToolbar onNearMeClick={onNearMeClick} />;
};

export default Toolbar;
