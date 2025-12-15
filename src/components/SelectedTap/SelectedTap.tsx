import { useCallback, useEffect, useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { SwipeableDrawer } from '@mui/material';
import { setSelectedPlace } from 'actions/actions';
import SelectedTapHours from 'components/SelectedTapHours/SelectedTapHours';

import sampleImg from 'components/images/phlask-tessellation.png';
import sampleImg2x from 'components/images/phlask-tessellation@2x.png';
import SelectedTapDetails from 'components/SelectedTapDetails/SelectedTapDetails';

import { getUserLocation } from 'reducers/user';
import useAppSelector from 'hooks/useSelector';
import useAppDispatch from 'hooks/useDispatch';
import noop from 'utils/noop';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

const SelectedTap = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const [walkingDuration, setWalkingDuration] = useState(0);
  // TODO: Connect this feature
  // https://github.com/phlask/phlask-map/issues/649
  const [_isEditing, setIsEditing] = useState<boolean | null>(false);

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

  const onClose = () => {
    dispatch(setSelectedPlace(null));
  };

  useEffect(() => {
    getWalkingDurationAndTimes();
  }, [getWalkingDurationAndTimes]);

  return (
    <div>
      <div id="tap-info-container-mobile">
        <SwipeableDrawer
          open={Boolean(selectedPlace)}
          anchor={isMobile ? 'bottom' : 'right'}
          onOpen={noop}
          onClose={onClose}
          transitionDuration={300}
          slotProps={{
            backdrop: { onClick: noop },
            paper: {
              square: false,
              sx: theme => ({
                height: '60vh',
                [theme.breakpoints.up('md')]: {
                  height: '100%',
                  width: '30%'
                }
              })
            }
          }}
        >
          {selectedPlace && (
            <SelectedTapDetails
              image={tempImages.tapImg}
              estWalkTime={walkingDuration}
              selectedPlace={selectedPlace}
              onStartEdit={handleStartEdit}
              onClose={onClose}
            >
              <SelectedTapHours selectedPlace={selectedPlace} />
            </SelectedTapDetails>
          )}
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default SelectedTap;
