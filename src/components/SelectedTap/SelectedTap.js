import { useCallback, useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
} from '../../actions/actions';
import SelectedTapHours from '../SelectedTapHours/SelectedTapHours';
import SelectedTapIcons from '../SelectedTapIcons/SelectedTapIcons';
import sampleImg from '../images/phlask-tessellation.png';
import sampleImg2x from '../images/phlask-tessellation@2x.png';
import phlaskBlue from '../images/phlaskBlue.png';
import phlaskGreen from '../images/phlaskGreen.png';
import './SelectedTap.css';
import styles from './SelectedTap.module.scss';

import { Paper, SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import SelectedTapMobile from '../SelectedTapMobile/SelectedTapMobile';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from '@mui/icons-material/Close';

import { WATER_RESOURCE_TYPE } from '../../types/ResourceEntry';
import useIsMobile from 'hooks/useIsMobile';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

const SelectedTap = () => {
  const dispatch = useDispatch();
  const refContentArea = useRef();
  const refSelectedTap = useRef();
  const isMobile = useIsMobile();

  const [previewHeight, setPreviewHeight] = useState(0);
  const [infoExpansionStyle, setInfoExpansionStyle] = useState({});
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);
  const [tapNormsAndRules, setTapNormsAndRules] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(600);
  const [testIcons, setTestIcons] = useState({
    access: phlaskBlue,
    accessibility: phlaskGreen
  });
  const [walkingDuration, setWalkingDuration] = useState(0);
  const [walkingDistance, setWalkingDistance] = useState(0);
  const [infoCollapseMobile, setInfoCollapseMobile] = useState(false);

  const showingInfoWindow = useSelector(
    state => state.filterMarkers.showingInfoWindow
  );
  const infoIsExpanded = useSelector(
    state => state.filterMarkers.infoIsExpanded
  );
  const infoWindowClass = useSelector(
    state => state.filterMarkers.infoWindowClass
  );
  const selectedPlace = useSelector(state => state.filterMarkers.selectedPlace);
  const resourceType = useSelector(state => state.filterMarkers.resourceType);
  const userLocation = useSelector(state => state.filterMarkers.userLocation);

  const getWalkingDurationAndTimes = useCallback(() => {
    if (!selectedPlace) return;
    const orsAPIKey =
      '5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc';
    fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsAPIKey}&start=${userLocation.lng},
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
        setWalkingDistance(distance);
      });
  }, [selectedPlace, userLocation?.lat, userLocation.lng]);

  const handleToggleInfoExpanded = shouldExpand => {
    if (!shouldExpand) {
      // Start animation before unmounting description
      setTimeout(() => {
        setIsDescriptionShown(shouldExpand);
      }, animationSpeed);
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

  const handleSwipe = direction => {
    if (direction === 'top') {
      handleToggleInfoExpanded(true);
    } else if (direction === 'bottom') {
      handleToggleInfoExpanded(false);
    }
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
              <SelectedTapMobile
                image={tempImages.tapImg}
                estWalkTime={walkingDuration}
                selectedPlace={selectedPlace}
                infoCollapse={infoCollapseMobile}
                setInfoCollapse={setInfoCollapseMobile}
              >
                <SelectedTapHours
                  infoIsExpanded={infoIsExpanded}
                  selectedPlace={selectedPlace}
                />
              </SelectedTapMobile>
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
              height: '700px'
            }}
          >
            {/* <DialogTitle>Dialog Title</DialogTitle> */}

            <IconButton
              aria-label="close"
              onClick={() => {
                handleToggleInfoWindow(false);
              }}
              sx={{
                position: 'absolute',
                left: '45px',
                top: 20,
                color: '#000000'
              }}
              size="large"
            >
              <CloseIcon
                sx={{
                  fontSize: 34
                }}
              />
            </IconButton>

            <IconButton
              aria-label="close"
              onClick={() => {
                handleToggleInfoWindow(true);
              }}
              sx={{
                float: 'right',
                right: '150px',
                top: 20,
                color: '#000000'
              }}
              // size="large"
            >
              <IosShareIcon
                sx={{
                  fontSize: 34
                }}
              />
            </IconButton>

            <IconButton
              aria-label="close"
              onClick={() => {
                handleToggleInfoWindow(true);
              }}
              sx={{
                float: 'right',
                top: 20,
                color: '#000000'
              }}
            >
              <MoreHorizIcon
                sx={{
                  fontSize: 34
                }}
              />
            </IconButton>

            {/* Location Name */}
            <div
              ref={refContentArea}
              className={
                infoIsExpanded ? styles.tapContentExpanded : styles.tapContent
              }
            >
              {/* Main Image */}

              <div id="tap-info-img-box-desktop">
                <img-alt
                  id="tap-info-img"
                  src={tempImages.tapImg}
                  srcSet={
                    tempImages.tapImg + ', ' + tempImages.tapImg2x + ' 2x'
                  }
                ></img-alt>
              </div>
              {/* Main Image */}

              <div id="tap-head-info">
                {/* Tap Type Icon */}
                <div id="tap-type-icon-container">
                  <div id="tap-type-icon">
                    {resourceType === WATER_RESOURCE_TYPE ? (
                      <img
                        className="tap-info-icon-img"
                        src={selectedPlace?.infoIcon}
                        alt=""
                      ></img>
                    ) : (
                      selectedPlace?.infoIcon
                    )}
                  </div>
                </div>

                {/* Name & Address */}
                <div id="org-name-and-address-desktop">
                  <div
                    id="tap-organization-name"
                    data-cy="tap-organization-name"
                  >
                    {selectedPlace?.name}
                  </div>
                  {selectedPlace?.address && (
                    <h5 id="tap-info-address">{selectedPlace.address}</h5>
                  )}
                </div>

                <SelectedTapHours
                  infoIsExpanded={infoIsExpanded}
                  selectedPlace={selectedPlace}
                />
              </div>
              {/* Walk Time & Info Icons  */}
              <div className={styles.walkTime}>
                Estimated Walk Time: {walkingDuration} mins ({walkingDistance}{' '}
                mi)
              </div>

              <SelectedTapIcons place={selectedPlace} />

              {/* Description */}
              <div>
                <div>
                  <div className={styles.description}>
                    <div id="tap-info-description">
                      <div className={styles.section}>
                        <h3>Description</h3>
                        <div>
                          {selectedPlace?.description
                            ? selectedPlace?.description
                            : 'Happy PHLasking'}
                        </div>
                      </div>

                      {selectedPlace?.tapStatement && (
                        <div className={styles.section}>
                          <h3>Statement</h3>
                          <div>{selectedPlace.tapStatement}</div>
                        </div>
                      )}
                      {selectedPlace?.norms_rules && (
                        <div className={styles.section}>
                          <h3>Norms &amp; Rules</h3>
                          <div>{selectedPlace?.norms_rules}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default SelectedTap;
