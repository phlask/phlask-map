import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import MobileWaterIcon from 'icons/WaterIconV2';
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

const MobileResourceButton = ({ type, icon, textLabel }) => {
  const dispatch = useDispatch();

  const switchType = newType => {
    dispatch(setResourceType(newType));
    dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
  };

  return (
    <ListItemButton
      data-cy={`button-resource-${type.toLowerCase()}`}
      sx={{ alignItems: 'center', gap: 1.5 }}
      onClick={() => {
        dispatch(resetFilterFunction());
        switchType(type);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText sx={{ alignSelf: 'flex-end' }}>
        <Box mx={1.25} bgcolor="white" p={0.25} borderRadius={1} px={1}>
          <Typography variant="body1" fontSize={15}>
            {textLabel}
          </Typography>
        </Box>
      </ListItemText>
    </ListItemButton>
  );
};

const MobileChooseResourceType = () => {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  return (
    <Box>
      <Modal
        open={toolbarModal === TOOLBAR_MODAL_RESOURCE}
        onClose={() => dispatch(setToolbarModal(TOOLBAR_MODAL_NONE))}
        slotProps={{ backdrop: { sx: { opacity: '0.1 !important' } } }}
      >
        <Slide
          direction="up"
          in={toolbarModal === TOOLBAR_MODAL_RESOURCE}
          mountOnEnter
          unmountOnExit
        >
          <List
            sx={{
              maxWidth: 210,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              fontSize: 55,
              position: 'absolute',
              bottom: 138,
              left: 4
            }}
          >
            <MobileResourceButton
              icon={<MobileWaterIcon />}
              textLabel="Water"
              type={WATER_RESOURCE_TYPE}
            />
            <MobileResourceButton
              icon={<MobileForagingIcon />}
              textLabel="Foraging"
              type={FORAGE_RESOURCE_TYPE}
            />
            <MobileResourceButton
              icon={<MobileFoodIcon />}
              textLabel="Food"
              type={FOOD_RESOURCE_TYPE}
            />
            <MobileResourceButton
              icon={<MobileBathroomIcon />}
              textLabel="Bathroom"
              type={BATHROOM_RESOURCE_TYPE}
            />
          </List>
        </Slide>
      </Modal>
    </Box>
  );
};

export default MobileChooseResourceType;
