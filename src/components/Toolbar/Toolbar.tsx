import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import { useMap } from '@vis.gl/react-google-maps';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';
import useSelectedPlace from 'hooks/useSelectedResource';
import useGetResourcesQuery from 'hooks/useGetResourcesQuery';
import useResourceType from 'hooks/useResourceType';
import useUserLocation from 'hooks/useUserLocation';

const Toolbar = () => {
  const map = useMap();
  const { setSelectedPlace } = useSelectedPlace();
  const isMobile = useIsMobile();
  const { data: userLocation } = useUserLocation();
  const { resourceType } = useResourceType();

  const { data: resources = [] } = useGetResourcesQuery({ resourceType });

  const onNearMeClick = async () => {
    const closest = getClosest(resources, userLocation);
    if (!closest) return;

    setSelectedPlace(closest);
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
