import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import {
  SET_PHLASK_TYPE,
  SET_TOOLBAR_MODAL,
  TOOLBAR_MODAL_NONE
} from '../../actions/actions';
import { handleGA } from './chooseResourceHelper';

const ListItemEntry = props => {
  const dispatch = useDispatch();

  const switchResourceType = type => {
    handleGA(type);
    dispatch({
      type: SET_PHLASK_TYPE,
      mode: type
    });
    dispatch({
      type: SET_TOOLBAR_MODAL,
      mode: TOOLBAR_MODAL_NONE
    });
  };

  const ResourceIcon = props.smallIcon;
  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        switchResourceType(props.actionLabel);
      }}
    >
      <ListItemIcon>
        <ResourceIcon />
      </ListItemIcon>
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
