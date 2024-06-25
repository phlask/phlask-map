import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Action from '../../actions/actions';

const ListItemEntry = (props) => {
  const dispatch = useDispatch();

  function handleGA(type) {
    // ReactGA.event({
    //   category: `ResourceMenu`,
    //   action: 'MapChangedTo',
    //   label: `${type}`
    // });
  }

  const switchType = type => {
    handleGA(type);
    dispatch({
      type: Action.TOGGLE_RESOURCE_TYPE,
      mode: type
    });
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        switchType(props.actionLabel);
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={'flex-start'}>
          <Box mx={1.25} bgcolor={'white'} p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {props.resourceType}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

export default ListItemEntry;
