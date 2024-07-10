import { useCallback, useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
} from '../../actions/actions';
import SelectedTapHours from '../SelectedTapHours/SelectedTapHours';

import sampleImg from '../images/phlask-tessellation.png';
import sampleImg2x from '../images/phlask-tessellation@2x.png';
import './SelectedTap.css';

import { Paper, SwipeableDrawer } from '@mui/material';

import SelectedTapDetails from '../SelectedTapMobile/SelectedTapDetails';

import useIsMobile from 'hooks/useIsMobile';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

const SelectedTap = () => {
  const dispatch = useDispatch();
  const refSelectedTap = useRef();
  const isMobile = useIsMobile();

  const [previewHeight, setPreviewHeight] = useState(0);
  const [infoExpansionStyle, setInfoExpansionStyle] = useState({});
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);

  const [walkingDuration, setWalkingDuration] = useState(0);
  const [infoCollapseMobile, setInfoCollapseMobile] = useState(false);

  const showingInfoWindow = useSelector(
    state => state.filterMarkers.showingInfoWindow
  );
  const infoIsExpanded = useSelector(
    state => state.filterMarkers.infoIsExpanded
  );

  const selectedPlace = useSelector(state => state.filterMarkers.selectedPlace);
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const userLocation = useSelector(state => state.filterMarkers.userLocation);

  const getWalkingDurationAndTimes = useCallback(() => {
    if (
      !selectedPlace?.latitude ||
      !selectedPlace?.longitude ||
      !userLocation?.lat ||
      !userLocation?.lng
    )
      return;
    const orsAPIKey =
      '5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc';
    fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsAPIKey}&start=${userLocation?.lng},
    ${userLocation?.lat}&end=${selectedPlace?.longitude},${selectedPlace?.latitude}`)
      .then(response => response.json())
      .then(data => {
        if (!data.features) return;
        // duration is returned in seconds
        let duration = Math.round(
          data.features[0].properties.summary.duration / 60
        );
        // distance is returned in m = 0.00062 mi
        let distance = (
          data.features[0].properties.summary.distance * 0.00062
        ).toFixed(1);

        setWalkingDuration(duration);
      });
  }, [
    selectedPlace?.latitude,
    selectedPlace?.longitude,
    userLocation?.lat,
    userLocation?.lng
  ]);

  const handleToggleInfoExpanded = shouldExpand => {
    if (!shouldExpand) {
      // Start animation before unmounting description
      setTimeout(() => {
        setIsDescriptionShown(shouldExpand);
      }, 600);
      // Expand or Collapse
      animateInfoExpansion(shouldExpand);
      // Close if in preview mode
      if (infoIsExpanded) {
        handleToggleInfoWindow({
          isShown: false,
          infoWindowClass: isMobile
            ? 'info-window-out'
            : 'info-window-out-desktop'
        });
      }
    } else {
      // Set height on first render to animate expansion
      if (Object.keys(infoExpansionStyle).length < 1) {
        setInfoExpansionStyle({
          height: previewHeight
        });

        setIsDescriptionShown(shouldExpand);

        animateInfoExpansion(shouldExpand);
      } else {
        setIsDescriptionShown(shouldExpand);

        animateInfoExpansion(shouldExpand);
      }
    }
  };

  const handleToggleInfoWindow = isShown => {
    let infoWindowClass = 'info-window-';
    infoWindowClass += isShown ? 'in' : 'out';
    if (!isMobile) infoWindowClass += '-desktop';

    dispatch(
      toggleInfoWindowClass({
        isShown,
        infoWindowClass
      })
    );
    // Animate in
    if (isShown) {
      dispatch(
        toggleInfoWindow({
          isShown,
          infoWindowClass: isMobile
            ? 'info-window-out'
            : 'info-window-out-desktop'
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

  const animateInfoExpansion = shouldExpand => {
    setInfoExpansionStyle({ height: shouldExpand ? '80%' : previewHeight });
    dispatch(toggleInfoExpanded(shouldExpand));
  };

  const handleGA = useCallback(() => {
    ReactGA.event({
      category: `Tap - ${resourceType}`,
      action: 'InfoShown',
      label: `${selectedPlace?.name}, ${selectedPlace?.address}`
    });
  }, [resourceType, selectedPlace?.address, selectedPlace?.name]);

  useEffect(() => {
    handleGA();
    getWalkingDurationAndTimes();
    setPreviewHeight(refSelectedTap.current?.clientHeight ?? 0);
  }, [handleGA, getWalkingDurationAndTimes]);

  useEffect(() => {
    if (showingInfoWindow) {
      if (
        isMobile &&
        previewHeight !== refSelectedTap.current.clientHeight &&
        !isDescriptionShown
      ) {
        setPreviewHeight(refSelectedTap.current.clientHeight);
      }
    }
  }, [isDescriptionShown, isMobile, previewHeight, showingInfoWindow]);

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
              PaperProps={{ square: false }}
            >
              <SelectedTapDetails
                image={tempImages.tapImg}
                estWalkTime={walkingDuration}
                selectedPlace={selectedPlace}
                infoCollapse={infoCollapseMobile}
                setInfoCollapse={setInfoCollapseMobile}
                isMobile
              >
                <SelectedTapHours
                  infoIsExpanded={infoIsExpanded}
                  selectedPlace={selectedPlace}
                />
              </SelectedTapDetails>
            </SwipeableDrawer>
          )}
        </div>
      )}
      {!isMobile && showingInfoWindow && (
        <div>
          {/* Desktop dialog panel */}
          <Paper
            sx={{
              position: 'absolute',
              right: '32px',
              top: '20px',
              width: '708px',
              height: '700px',
              borderRadius: '10px'
            }}
          >
            <SelectedTapDetails
              image={tempImages.tapImg}
              estWalkTime={walkingDuration}
              selectedPlace={selectedPlace}
              infoCollapse={infoCollapseMobile}
              setInfoCollapse={setInfoCollapseMobile}
              isMobile={false}
              closeModal={() => handleToggleInfoWindow(false)}
            >
              <SelectedTapHours
                infoIsExpanded={true}
                selectedPlace={selectedPlace}
              />
            </SelectedTapDetails>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default SelectedTap;
