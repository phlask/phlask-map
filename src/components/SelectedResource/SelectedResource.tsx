import { useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';
import { SwipeableDrawer } from '@mui/material';

import SelectedResourceDetails from 'components/SelectedResourceDetails/SelectedResourceDetails';

import noop from 'utils/noop';
import useSelectedResource from 'hooks/useSelectedResource';
import { useGetSelectedResourceQuery } from 'hooks/queries/useGetSelectedResourceQuery';
import SEO from 'components/SEO/SEO';

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

  const getSEOProps = () => {
    if (!data) return {};
    const resourceName = data.name || 'Unnamed Resource';
    const type = data.resource_type.charAt(0) + data.resource_type.slice(1).toLowerCase();
    const address = data.address ? ` at ${data.address}` : '';
    
    return {
      title: `${resourceName} (${type})`,
      description: `Find ${type.toLowerCase()} resources like ${resourceName}${address} in Philadelphia on PHLASK.`,
      canonicalUrl: `https://phlask.me/?r=${data.id}`
    };
  };

  return (
    <>
      {isEnabled && data && <SEO {...getSEOProps()} />}
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
    </>
  );
};

export default SelectedResource;
