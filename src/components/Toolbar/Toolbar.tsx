import {
  TOOLBAR_MODAL_NONE,
  type ToolbarModalType,
  setSelectedPlace,
  setToolbarModal
} from 'actions/actions';

import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import { getAllResources } from 'selectors/resourceSelectors';
import { useMap } from '@vis.gl/react-google-maps';
import useAppSelector from 'hooks/useSelector';
import useAppDispatch from 'hooks/useDispatch';
import { getUserLocation } from 'reducers/user';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';

const Toolbar = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const toolbarModal = useAppSelector(
    state => state.filterMarkers.toolbarModal
  );
  const allResources = useAppSelector(getAllResources);
  const userLocation = useAppSelector(getUserLocation);

  const toolbarClicked = (modal: ToolbarModalType) => {
    if (toolbarModal === modal) dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
    else dispatch(setToolbarModal(modal));
  };

  const onNearMeClick = async () => {
    // If the user clicks very fast, it crashes.
    // NOTE: This was left as an acceptable scenario for now,
    // as it is difficult for a user to do this reliably due to the popup of the location panel.
    // This may be reproducible on Desktop.
    const closest = getClosest(allResources, userLocation);
    if (!closest) return;

    dispatch(setSelectedPlace(closest));
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
