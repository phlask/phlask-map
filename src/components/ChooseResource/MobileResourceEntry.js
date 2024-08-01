import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setResourceType,
  setToolbarModal,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';

const MobileResourceEntry = props => {
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
    dispatch(setResourceType(type));
    dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => switchType(props.resourceType)}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={'flex-start'}>
          <Box mx={1.25} bgcolor={'white'} p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {props.resourceTextLabel}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

export default MobileResourceEntry;
