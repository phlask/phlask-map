import { SwipeableDrawer } from '@mui/material';
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
            width: isMobile ? 'auto' : '40%',
            height: isMobile ? '70vh' : '100%'
          }
        }
      }}
    >
      {filterElement}
    </SwipeableDrawer>
  );
};

export default Filter;
