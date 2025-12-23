import { useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { SwipeableDrawer } from '@mui/material';
import SelectedTapHours from 'components/SelectedTapHours/SelectedTapHours';

import sampleImg from 'components/images/phlask-tessellation.png';
import sampleImg2x from 'components/images/phlask-tessellation@2x.png';
import SelectedTapDetails from 'components/SelectedTapDetails/SelectedTapDetails';

import noop from 'utils/noop';
import useSelectedPlace from 'hooks/useSelectedResource';
import { useQuery } from '@tanstack/react-query';
import { getResourceById } from 'db';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

const SelectedTap = () => {
  const isMobile = useIsMobile();
  const { selectedPlace, setSelectedPlace } = useSelectedPlace();

  const { data } = useQuery({
    queryKey: ['selected-place', selectedPlace],
    queryFn: () => getResourceById(selectedPlace!),
    enabled: !!selectedPlace
  });

  // TODO: Connect this feature
  // https://github.com/phlask/phlask-map/issues/649
  const [_isEditing, setIsEditing] = useState<boolean | null>(false);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const onClose = () => {
    setSelectedPlace(null);
  };

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
          {data && (
            <SelectedTapDetails
              image={tempImages.tapImg}
              selectedPlace={data}
              onStartEdit={handleStartEdit}
              onClose={onClose}
            >
              <SelectedTapHours selectedPlace={data} />
            </SelectedTapDetails>
          )}
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default SelectedTap;
