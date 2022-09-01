import {
  Box,
  Dialog,
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

const ResourceMenu = () => {
  const dispatch = useDispatch();

  const isResourceMenuShown = useSelector(state => state.isResourceMenuShown);

  const toggleResourceMenu = () => {
    dispatch({ type: TOGGLE_RESOURCE_MENU, isShown: isResourceMenuShown });
  };

  const switchType = type => {
    // handleGA(type);
    dispatch({
      type: TOGGLE_PHLASK_TYPE,
      mode: type
    });
    toggleResourceMenu();
  };

  // function handleGA(type) {
  //   ReactGA.event({
  //     category: `ResourceMenu`,
  //     action: "MapChangedTo",
  //     label: `${type}`,
  //   });
  // }

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
            transform: 'translate(-20%, -15%)'
          }
        }}
      >
        <List sx={{ maxWidth: 210 }}>
          <ListItemButton
            sx={{ alignItems: 'end' }}
            onClick={() => {
              switchType(PHLASK_TYPE_WATER);
            }}
          >
            <ListItemIcon>
              <WaterIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                textAlign={'center'}
                color={'black'}
                mx={1.5}
                bgcolor={'white'}
                p={0.5}
                borderRadius={1}
                px={1}
              >
                Water
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ alignItems: 'end' }}
            onClick={() => switchType(PHLASK_TYPE_FOOD)}
          >
            <ListItemIcon>
              <FoodIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                textAlign={'center'}
                mx={1.5}
                bgcolor={'white'}
                p={0.5}
                borderRadius={1}
                px={1}
              >
                Food
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ alignItems: 'end' }}
            onClick={() => switchType(PHLASK_TYPE_FORAGING)}
          >
            <ListItemIcon>
              <ForagingIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                textAlign={'center'}
                mx={1.5}
                bgcolor={'white'}
                p={0.5}
                borderRadius={1}
                px={1}
              >
                Foraging
              </Typography>
            </ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ alignItems: 'end' }}
            onClick={() => switchType(PHLASK_TYPE_BATHROOM)}
          >
            <ListItemIcon>
              <ToiletIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body1"
                textAlign={'center'}
                mx={1.5}
                mb={0}
                bgcolor={'white'}
                p={0.5}
                borderRadius={1}
                px={1}
              >
                Bathroom
              </Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Dialog>
    </Box>
  );
};

export default ResourceMenu;
