import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../actions/actions';
import { isResourceMenuShownSelector } from '../../hooks/selectors';
import { ReactComponent as FoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconV2.svg';
import { ReactComponent as ToiletIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconV2.svg';
import ListItemEntry from './ListItemEntry';

const listItems = [
  {
    resourceType: 'Water',
    icon: <WaterIcon />,
    actionLabel: Action.PHLASK_TYPE_WATER
  },
  {
    resourceType: 'Food',
    icon: <FoodIcon />,
    actionLabel: Action.PHLASK_TYPE_FOOD
  },
  {
    resourceType: 'Foraging',
    icon: <ForagingIcon />,
    actionLabel: Action.PHLASK_TYPE_FORAGING
  },
  {
    resourceType: 'Bathroom',
    icon: <ToiletIcon />,
    actionLabel: Action.PHLASK_TYPE_BATHROOM
  }
];

const ResourceMenu = () => {
  const dispatch = useDispatch();
  const isResourceMenuShown = useSelector(isResourceMenuShownSelector);

  const toggleResourceMenu = () => {
    dispatch({
      type: Action.TOGGLE_RESOURCE_MENU,
      isShown: isResourceMenuShown
    });
  };

  return (
    <Box>
      <Dialog
        BackdropProps={{ transitionDuration: 400 }}
        open={isResourceMenuShown}
        onClose={() => toggleResourceMenu()}
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
