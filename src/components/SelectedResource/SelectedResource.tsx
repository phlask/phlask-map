import useIsMobile from 'hooks/useIsMobile';
import { SwipeableDrawer } from '@mui/material';

import SelectedResourceDetails from 'components/SelectedResourceDetails/SelectedResourceDetails';

import noop from 'utils/noop';
import useSelectedResource from 'hooks/useSelectedResource';
import { useGetSelectedResourceQuery } from 'hooks/queries/useGetSelectedResourceQuery';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { useResourceEditContext } from 'contexts/ResourceEditContext';
import type { ResourceEntry } from 'types/ResourceEntry';
import { IS_EDIT_RESOURCE_FEATURE_ENABLED } from 'constants/flags';

const SelectedResource = () => {
  const isMobile = useIsMobile();
  const { setSelectedResource } = useSelectedResource();
  const { data, isError, isEnabled } = useGetSelectedResourceQuery();
  const { setToolbarModal } = useToolbarContext();
  const { setResourceEditCandidate: setResourceRevision } =
    useResourceEditContext();

  const handleStartEdit = (resource: ResourceEntry) => {
    if (!IS_EDIT_RESOURCE_FEATURE_ENABLED) {
      return;
    }

    setToolbarModal('contribute');
    setSelectedResource(null);
    setResourceRevision({
      ...resource,
      date_created: '',
      last_modified: ''
    });
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
        onClose={onClose}
        onStartEdit={handleStartEdit}
      />
    </SwipeableDrawer>
  );
};

export default SelectedResource;
