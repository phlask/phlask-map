import {
  Box,
  Dialog,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as FoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconV2.svg';
import { ReactComponent as ToiletIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconV2.svg';
import {
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  TOGGLE_PHLASK_TYPE,
  TOGGLE_RESOURCE_MENU
} from '../../actions/actions';
import ReactGA from 'react-ga';

const ListItemEntry = ({ resourceType, icon, actionLabel }) => {
  const dispatch = useDispatch();

  const isResourceMenuShown = useSelector(state => state.isResourceMenuShown);

  const toggleResourceMenu = () => {
    dispatch({ type: TOGGLE_RESOURCE_MENU, isShown: isResourceMenuShown });
  };

  function handleGA(type) {
    ReactGA.event({
      category: `ResourceMenu`,
      action: 'MapChangedTo',
      label: `${type}`
    });
  }

  const switchType = type => {
    handleGA(type);
    dispatch({
      type: TOGGLE_PHLASK_TYPE,
      mode: type
    });
    toggleResourceMenu();
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        switchType(actionLabel);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={'flex-start'}>
          <Box mx={1.25} bgcolor={'white'} p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {resourceType}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

const ResourceMenu = () => {
  const dispatch = useDispatch();

  const isResourceMenuShown = useSelector(state => state.isResourceMenuShown);

  const toggleResourceMenu = () => {
    dispatch({ type: TOGGLE_RESOURCE_MENU, isShown: isResourceMenuShown });
  };

  return (
    <Box>
      <Dialog
        open={isResourceMenuShown}
        onClose={() => toggleResourceMenu()}
        PaperProps={{
          style: {
            background: 'transparent',
            boxShadow: 'none',
            position: 'absolute',
            bottom: '0vh',
            left: '0vh',
            transform: 'translate(-13%, -28%)'
          }
        }}
      >
        <List sx={{ maxWidth: 210 }}>
          <ListItemEntry
            resourceType={'Water'}
            icon={<WaterIcon />}
            actionLabel={PHLASK_TYPE_WATER}
          />
          <ListItemEntry
            resourceType={'Food'}
            icon={<FoodIcon />}
            actionLabel={PHLASK_TYPE_FOOD}
          />
          <ListItemEntry
            resourceType={'Foraging'}
            icon={<ForagingIcon />}
            actionLabel={PHLASK_TYPE_FORAGING}
          />
          <ListItemEntry
            resourceType={'Bathroom'}
            icon={<ToiletIcon />}
            actionLabel={PHLASK_TYPE_BATHROOM}
          />
        </List>
      </Dialog>
    </Box>
  );
};

export default ResourceMenu;
