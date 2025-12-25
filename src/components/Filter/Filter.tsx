import { Box, SwipeableDrawer } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';
import useResourceType, { ResourceType } from 'hooks/useResourceType';
import { useToolbarContext } from 'contexts/ToolbarContext';
import WaterFilter from './WaterFilter';
import FoodFilter from './FoodFilter';
import ForagingFilter from './ForagingFilter';
import BathroomFilter from './BathroomFilter';

const Filter = () => {
  const isMobile = useIsMobile();
  const { resourceType } = useResourceType();

  const { toolbarModal, setToolbarModal } = useToolbarContext();

  if (!resourceType) {
    return null;
  }

  const filterElement = {
    [ResourceType.WATER]: <WaterFilter />,
    [ResourceType.FOOD]: <FoodFilter />,
    [ResourceType.FORAGE]: <ForagingFilter />,
    [ResourceType.BATHROOM]: <BathroomFilter />
  }[resourceType];

  return (
    <SwipeableDrawer
      anchor={isMobile ? 'bottom' : 'left'}
      onClose={() => {
        setToolbarModal(null);
      }}
      onOpen={noop}
      disableSwipeToOpen
      open={toolbarModal === 'filter'}
      slotProps={{
        paper: {
          sx: {
            borderRadius: '10px',
            width: isMobile ? 'auto' : '40%',
            height: isMobile ? '70vh' : '100%'
          }
        }
      }}
    >
      {isMobile ? (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: '#ffffff'
            }}
          />
        </Box>
      ) : null}
      {filterElement}
    </SwipeableDrawer>
  );
};

export default Filter;
