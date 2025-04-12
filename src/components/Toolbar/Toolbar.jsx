import { useDispatch, useSelector } from 'react-redux';
import {
  TOOLBAR_MODAL_NONE,
  setLastResourcePan,
  setSelectedPlace,
  setToolbarModal,
  toggleInfoWindow
} from 'actions/actions';

import useIsMobile from 'hooks/useIsMobile';
import getClosest from 'utils/getClosest';
import selectFilteredResource from 'selectors/resourceSelectors';
import { useMap } from '@vis.gl/react-google-maps';
import { getUserLocation } from 'reducers/user';
import MobileToolbar from './MobileToolbar';
import DesktopToolbar from './DesktopToolbar';

const Toolbar = () => {
  const map = useMap();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const filteredResources = useSelector(selectFilteredResource);
  const userLocation = useSelector(getUserLocation);

  const toolbarClicked = modal => {
    if (toolbarModal === modal) dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
    else dispatch(setToolbarModal(modal));
  };

  const onNearMeClick = async () => {
    // If the user clicks very fast, it crashes.
    // NOTE: This was left as an acceptable scenario for now,
    // as it is difficult for a user to do this reliably due to the popup of the location panel.
    // This may be reproducible on Desktop.
    const closest = getClosest(filteredResources, {
      lat: userLocation.latitude,
      lon: userLocation.longitude
    });
    if (!closest) return;

    dispatch(
      setLastResourcePan({
        lat: closest.latitude,
        lng: closest.longitude
      })
    );
    dispatch(setSelectedPlace(closest));
    if (map) {
      map.panTo({
        lat: closest.latitude,
        lng: closest.longitude
      });
    }
    dispatch(
      toggleInfoWindow({
        isShown: true,
        infoWindowClass: isMobile ? 'info-window-in' : 'info-window-in-desktop'
      })
    );
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
