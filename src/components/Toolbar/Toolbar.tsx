import { TOOLBAR_MODAL_NONE, type ToolbarModalType } from 'actions/actions';

import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import { useMap } from '@vis.gl/react-google-maps';
import useAppSelector from 'hooks/useSelector';
import useAppDispatch from 'hooks/useDispatch';
import { getUserLocation } from 'reducers/user';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';
import useSelectedPlace from 'hooks/useSelectedResource';
import useGetResourcesQuery from 'hooks/useGetResourcesQuery';
import useResourceType from 'hooks/useResourceType';
import { getToolbarModal, setToolbarModal } from 'reducers/toolbar';

const Toolbar = () => {
  const map = useMap();
  const { setSelectedPlace } = useSelectedPlace();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const toolbarModal = useAppSelector(getToolbarModal);
  const userLocation = useAppSelector(getUserLocation);
  const { resourceType } = useResourceType();

  const { data: resources = [] } = useGetResourcesQuery({ resourceType });

  const toolbarClicked = (modal: ToolbarModalType) => {
    if (toolbarModal === modal) dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
    else dispatch(setToolbarModal(modal));
  };

  const onNearMeClick = async () => {
    // If the user clicks very fast, it crashes.
    // NOTE: This was left as an acceptable scenario for now,
    // as it is difficult for a user to do this reliably due to the popup of the location panel.
    // This may be reproducible on Desktop.
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
    return (
      <MobileToolbar
        onNearMeClick={onNearMeClick}
        onItemClick={item => toolbarClicked(item)}
      />
    );
  }

  return (
    <DesktopToolbar
      onNearMeClick={onNearMeClick}
      onItemClick={item => toolbarClicked(item)}
    />
  );
};

export default Toolbar;
