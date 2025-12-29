import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import { useMap } from '@vis.gl/react-google-maps';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';
import useSelectedResource from 'hooks/useSelectedResource';
import useGetResourcesQuery from 'hooks/queries/useGetResourcesQuery';
import useResourceType from 'hooks/useResourceType';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';

const Toolbar = () => {
  const map = useMap();
  const { setSelectedResource } = useSelectedResource();
  const isMobile = useIsMobile();
  const { data: userLocation } = useGetUserLocationQuery();
  const { resourceType } = useResourceType();

  const { data: resources = [] } = useGetResourcesQuery({ resourceType });

  const onNearMeClick = async () => {
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
