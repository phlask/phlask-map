import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import DesktopWaterIcon from 'icons/WaterIconChooseResource';
import MobileFoodIcon from 'icons/FoodIconV2';
import MobileForagingIcon from 'icons/ForagingIconV2';
import MobileBathroomIcon from 'icons/ToiletIconV2';

import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from 'types/ResourceEntry';

import {
  resetFilterFunction,
  setResourceType,
  setToolbarModal,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE
} from 'actions/actions';

const MobileResourceButton = ({ type, mobileIcon: MobileIcon, textLabel }) => {
  const dispatch = useDispatch();

  const switchType = newType => {
    dispatch(setResourceType(newType));
    dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        dispatch(resetFilterFunction());
        switchType(type);
      }}
    >
      <ListItemIcon>
        <MobileIcon />
      </ListItemIcon>
      <ListItemText>
        <Grid container justifyContent="flex-start">
          <Box mx={1.25} bgcolor="white" p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {textLabel}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

const MobileChooseResourceType = () => {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  return (
    <Box>
      <Dialog
        slotProps={{ backdrop: { transitionDuration: 400 } }}
        open={toolbarModal === TOOLBAR_MODAL_RESOURCE}
        onClose={() => dispatch(setToolbarModal(TOOLBAR_MODAL_NONE))}
        PaperProps={{
          sx: {
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
          in={toolbarModal === TOOLBAR_MODAL_RESOURCE}
          mountOnEnter
          unmountOnExit
        >
          <List sx={{ maxWidth: 210 }}>
            <MobileResourceButton
              mobileIcon={DesktopWaterIcon}
              textLabel="Water"
              type={WATER_RESOURCE_TYPE}
            />
            <MobileResourceButton
              mobileIcon={MobileForagingIcon}
              textLabel="Foraging"
              type={FORAGE_RESOURCE_TYPE}
            />
            <MobileResourceButton
              mobileIcon={MobileFoodIcon}
              textLabel="Food"
              type={FOOD_RESOURCE_TYPE}
            />
            <MobileResourceButton
              mobileIcon={MobileBathroomIcon}
              textLabel="Bathroom"
              type={BATHROOM_RESOURCE_TYPE}
            />
          </List>
        </Slide>
      </Dialog>
    </Box>
  );
};

export default MobileChooseResourceType;
