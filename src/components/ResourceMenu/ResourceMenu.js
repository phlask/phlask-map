import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { isResourceMenuShownSelector } from '../../hooks/selectors';
import { ReactComponent as FoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconV2.svg';
import { ReactComponent as ToiletIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconV2.svg';
import ListItemEntry from './ListItemEntry';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from '../../types/ResourceEntry';
import { toggleResourceMenu } from '../../actions/actions';

const listItems = [
  {
    resourceType: 'Water',
    icon: <WaterIcon />,
    actionLabel: WATER_RESOURCE_TYPE
  },
  {
    resourceType: 'Food',
    icon: <FoodIcon />,
    actionLabel: FOOD_RESOURCE_TYPE
  },
  {
    resourceType: 'Foraging',
    icon: <ForagingIcon />,
    actionLabel: FORAGE_RESOURCE_TYPE
  },
  {
    resourceType: 'Bathroom',
    icon: <ToiletIcon />,
    actionLabel: BATHROOM_RESOURCE_TYPE
  }
];

const ResourceMenu = () => {
  const dispatch = useDispatch();
  const isResourceMenuShown = useSelector(isResourceMenuShownSelector);

  const handleToggleResourceMenu = () => {
    dispatch(toggleResourceMenu({ isShown: isResourceMenuShown }));
  };

  return (
    <Box>
      <Dialog
        BackdropProps={{ transitionDuration: 400 }}
        open={isResourceMenuShown}
        onClose={() => handleToggleResourceMenu()}
        PaperProps={{
          style: {
            background: 'transparent',
            overflow: 'visible',
            boxShadow: 'none',
            position: 'absolute',
            bottom: '0vh',
            left: '0vh',
            transform: 'translate(-13%, -28%)'
          }
        }}
      >
        <Slide
          direction="up"
          in={isResourceMenuShown}
          mountOnEnter
          unmountOnExit
        >
          <List sx={{ maxWidth: 210 }}>
            {listItems?.map(entry => (
              <ListItemEntry key={entry.resourceType} {...entry} />
            ))}
          </List>
        </Slide>
      </Dialog>
    </Box>
  );
};

export default ResourceMenu;
