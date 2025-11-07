import { useCallback, useEffect, useRef, useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { Paper, SwipeableDrawer } from '@mui/material';
import { toggleInfoWindow, toggleInfoWindowClass } from 'actions/actions';
import SelectedTapHours from 'components/SelectedTapHours/SelectedTapHours';

import sampleImg from 'components/images/phlask-tessellation.png';
import sampleImg2x from 'components/images/phlask-tessellation@2x.png';
import SelectedTapDetails from 'components/SelectedTapDetails/SelectedTapDetails';

import './SelectedTap.css';
import { getUserLocation } from 'reducers/user';
import useAppSelector from 'hooks/useSelector';
import useAppDispatch from 'hooks/useDispatch';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

const SelectedTap = () => {
  const dispatch = useAppDispatch();
  const refSelectedTap = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // const [previewHeight, setPreviewHeight] = useState(0);

  const [walkingDuration, setWalkingDuration] = useState(0);
  const [infoCollapseMobile, setInfoCollapseMobile] = useState(false);
  // TODO: Connect this feature
  // https://github.com/phlask/phlask-map/issues/649
  const [_isEditing, setIsEditing] = useState<boolean | null>(false);

  const showingInfoWindow = useAppSelector(
    state => state.filterMarkers.showingInfoWindow
  );

  const selectedPlace = useAppSelector(
    state => state.filterMarkers.selectedPlace
  );
  const userLocation = useAppSelector(getUserLocation);

  const getWalkingDurationAndTimes = useCallback(() => {
    if (
      !selectedPlace?.latitude ||
      !selectedPlace?.longitude ||
      !userLocation?.latitude ||
      !userLocation?.longitude
    )
      return;
    const orsAPIKey =
      '5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc';
    fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsAPIKey}&start=${userLocation?.longitude},
    ${userLocation?.latitude}&end=${selectedPlace?.longitude},${selectedPlace?.latitude}`)
      .then(response => response.json())
      .then(data => {
        if (!data.features) return;
        // duration is returned in seconds
        const duration = Math.round(
          data.features[0].properties.summary.duration / 60
        );

        setWalkingDuration(duration);
      });
  }, [
    selectedPlace?.latitude,
    selectedPlace?.longitude,
    userLocation?.latitude,
    userLocation?.longitude
  ]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleToggleInfoWindow = (isShown: boolean) => {
    let infoWindowClass = 'info-window-';
    infoWindowClass += isShown ? 'in' : 'out';
    if (!isMobile) infoWindowClass += '-desktop';

    dispatch(toggleInfoWindowClass({ infoWindowClass }));
    // Animate in
    if (isShown) {
      dispatch(
        toggleInfoWindow({
          isShown,
          infoWindowClass: isMobile
            ? 'info-window-in'
            : 'info-window-in-desktop'
        })
      );
    }
    // Animate Out
    else {
      dispatch(
        toggleInfoWindow({
          isShown: false,
          infoWindowClass: isMobile
            ? 'info-window-out'
            : 'info-window-out-desktop'
        })
      );
      setInfoCollapseMobile(false);
    }
  };

  useEffect(() => {
    getWalkingDurationAndTimes();
  }, [getWalkingDurationAndTimes]);

  return (
    <div>
      {isMobile && (
        <div ref={refSelectedTap} id="tap-info-container-mobile">
          {selectedPlace && (
            <SwipeableDrawer
              anchor="bottom"
              open={showingInfoWindow}
              onOpen={() => handleToggleInfoWindow(true)}
              onClose={() => handleToggleInfoWindow(false)}
              slotProps={{
                paper: { square: false, sx: { height: '80vh' } }
              }}
            >
              <SelectedTapDetails
                image={tempImages.tapImg}
                estWalkTime={walkingDuration}
                selectedPlace={selectedPlace}
                infoCollapse={infoCollapseMobile}
                setInfoCollapse={setInfoCollapseMobile}
                onStartEdit={handleStartEdit}
              >
                <SelectedTapHours selectedPlace={selectedPlace} />
              </SelectedTapDetails>
            </SwipeableDrawer>
          )}
        </div>
      )}
      {!isMobile && showingInfoWindow && selectedPlace && (
        <div>
          {/* Desktop dialog panel */}
          <Paper
            sx={{
              right: '32px',
              top: '20px',
              width: '708px',
              height: '700px',
              borderRadius: '10px',
              maxHeight: '100%',
              overflow: 'auto',
              pointerEvents: 'auto'
            }}
          >
            <SelectedTapDetails
              image={tempImages.tapImg}
              estWalkTime={walkingDuration}
              selectedPlace={selectedPlace}
              infoCollapse={infoCollapseMobile}
              setInfoCollapse={setInfoCollapseMobile}
              closeModal={() => handleToggleInfoWindow(false)}
              onStartEdit={handleStartEdit}
            >
              <SelectedTapHours selectedPlace={selectedPlace} />
            </SelectedTapDetails>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default SelectedTap;
