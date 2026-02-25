import { useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { SwipeableDrawer } from '@mui/material';

import SelectedResourceDetails from 'components/SelectedResourceDetails/SelectedResourceDetails';

import noop from 'utils/noop';
import useSelectedResource from 'hooks/useSelectedResource';
import { useGetSelectedResourceQuery } from 'hooks/queries/useGetSelectedResourceQuery';

const SelectedResource = () => {
  const isMobile = useIsMobile();
  const { setSelectedResource } = useSelectedResource();
  const { data, isError, isEnabled } = useGetSelectedResourceQuery();

  // TODO: Connect this feature
  // https://github.com/phlask/phlask-map/issues/649
  const [_isEditing, setIsEditing] = useState<boolean | null>(false);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const onClose = () => {
    setSelectedResource(null);
  };

  return (
    <SwipeableDrawer
      open={isEnabled}
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
              width: '40%'
            }
          })
        }
      }}
    >
      <SelectedResourceDetails
        resource={data}
        isError={isError}
        onStartEdit={handleStartEdit}
        onClose={onClose}
      />
    </SwipeableDrawer>
  );
};

export default SelectedResource;
