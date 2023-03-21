import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import ReactGA from 'react-ga4';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../actions/actions';
import { isResourceMenuShownSelector } from '../../hooks/selectors';

const ListItemEntry = ({ resourceType, icon, actionLabel }) => {
  const dispatch = useDispatch();
  const isResourceMenuShown = useSelector(isResourceMenuShownSelector);

  const toggleResourceMenu = () => {
    dispatch({
      type: Action.TOGGLE_RESOURCE_MENU,
      isShown: isResourceMenuShown
    });
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
      type: Action.TOGGLE_PHLASK_TYPE,
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
