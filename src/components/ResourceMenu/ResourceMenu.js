import { Box, Dialog, List, Slide } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  TOGGLE_RESOURCE_MENU
} from '../../actions/actions';
import { ReactComponent as FoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconV2.svg';
import { ReactComponent as ToiletIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconV2.svg';
import ListItemEntry from './ListItemEntry';

const listItems = [
  {
    resourceType: 'Water',
    icon: <WaterIcon />,
    actionLabel: PHLASK_TYPE_WATER
  },
  { resourceType: 'Food', icon: <FoodIcon />, actionLabel: PHLASK_TYPE_FOOD },
  {
    resourceType: 'Foraging',
    icon: <ForagingIcon />,
    actionLabel: PHLASK_TYPE_FORAGING
  },
  {
    resourceType: 'Bathroom',
    icon: <ToiletIcon />,
    actionLabel: PHLASK_TYPE_BATHROOM
  }
];

const ResourceMenu = () => {
  const dispatch = useDispatch();

  const isResourceMenuShown = useSelector(state => state.isResourceMenuShown);

  const toggleResourceMenu = () => {
    dispatch({ type: TOGGLE_RESOURCE_MENU, isShown: isResourceMenuShown });
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
              <ListItemEntry
                key={entry.resourceType}
                resourceType={entry.resourceType}
                icon={entry.icon}
                actionLabel={entry.actionLabel}
              />
            ))}
          </List>
        </Slide>
      </Dialog>
    </Box>
  );
};

export default ResourceMenu;
