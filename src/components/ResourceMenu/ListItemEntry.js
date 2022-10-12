import {
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOGGLE_PHLASK_TYPE,
  TOGGLE_RESOURCE_MENU
} from '../../actions/actions';

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

export default ListItemEntry;
