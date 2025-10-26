import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesktopWaterIcon from 'icons/WaterIconChooseResource';
import DesktopBathroomIcon from 'icons/BathroomIconChooseResource';
import DesktopFoodIcon from 'icons/FoodIconChooseResource';
import DesktopForagingIcon from 'icons/ForagingIconChooseResource';
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
import useOnClickOutside from '../AddResourceModal/useOnClickOutside';
import styles from './ChooseResourceType.module.scss';

const DesktopResourceButton = ({
  desktopIcon: Icon,
  color,
  type,
  textLabel
}) => {
  const dispatch = useDispatch();

  return (
    <Button
      sx={{
        margin: '12px',
        backgroundColor: color,
        '&:hover': { backgroundColor: color },
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5px',
        placeItems: 'center',
        borderRadius: '8px'
      }}
      onClick={() => {
        dispatch(resetFilterFunction());
        dispatch(setResourceType(type));
      }}
      data-cy={`button-${type}-data-selector`}
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{textLabel}</p>
      <div tabIndex="0" role="button">
          <Button>Edit</Button>
      </div>
    </Button>
  );
};

const DesktopChooseResourceType = () => {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const ref = useRef(null);
  // We're using a direct DOM link here because we aren't doing anything the React runtime needs to know about.
  const btnRef = document.querySelector('#resource-type-select-button');

  const handleClickOutside = () => {
    if (toolbarModal === TOOLBAR_MODAL_RESOURCE) {
      dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
    }
  };

  useOnClickOutside(ref, handleClickOutside, [btnRef]);

  return (
    <Paper
      sx={{
        position: 'absolute',
        left: '32px',
        bottom: '133px',
        width: '766px',
        borderRadius: '10px'
      }}
      ref={ref}
    >
      <Collapse
        in={toolbarModal === TOOLBAR_MODAL_RESOURCE}
        orientation="vertical"
        timeout="auto"
      >
        <Box sx={{ padding: '40px' }}>
          <Box>
            <h1 className={styles.header}>Show Resource Type</h1>
            <p className={styles.description}>
              Choose the type of resource you
              <br />
              would like to see on screen
            </p>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <DesktopResourceButton
              desktopIcon={DesktopWaterIcon}
              color="#5286E9"
              type={WATER_RESOURCE_TYPE}
              textLabel="Water"
            />

            <DesktopResourceButton
              desktopIcon={DesktopForagingIcon}
              color="#5DA694"
              type={FORAGE_RESOURCE_TYPE}
              textLabel="Foraging"
            />

            <DesktopResourceButton
              desktopIcon={DesktopFoodIcon}
              color="#FF9A55"
              type={FOOD_RESOURCE_TYPE}
              textLabel="Food"
            />

            <DesktopResourceButton
              desktopIcon={DesktopBathroomIcon}
              color="#9E9E9E"
              type={BATHROOM_RESOURCE_TYPE}
              textLabel="Bathroom"
            />
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default DesktopChooseResourceType;
