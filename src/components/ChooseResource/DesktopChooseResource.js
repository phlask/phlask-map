import { Box, Button, Collapse, Paper } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_NONE,
  setToolbarModal,
  setResourceType
} from '../../actions/actions';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE
} from '../../types/ResourceEntry';
import styles from './ChooseResource.module.scss';
import { ReactComponent as BathroomIcon } from '../icons/BathroomIconChooseResource.svg';
import { ReactComponent as FoodIcon } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconChooseResource.svg';
import useOnClickOutside from '../../components/AddResourceModal/useOnClickOutside.js';


const ResourceButton = props => {
  const Icon = props.icon;
  return (
    <Button
      sx={{
        margin: '12px',
        backgroundColor: props.color,
        '&:hover': { backgroundColor: props.color },
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5px',
        placeItems: 'center',
        borderRadius: '8px'
      }}
      onClick={props.onClick}
      data-cy={props["data-cy"]}
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{props.text}</p>
    </Button>
  );
};

function DesktopChooseResource(props) {

  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleClickOutside = () => {
    if (toolbarModal === TOOLBAR_MODAL_RESOURCE) {
      dispatch(setToolbarModal(TOOLBAR_MODAL_NONE))
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <Paper
        sx={{
          position: 'absolute',
          left: '32px',
          bottom: '133px',
          width: '686px',
          borderRadius: '10px'
        }}
        ref={ref}
      >
        <Collapse
          in={toolbarModal == TOOLBAR_MODAL_RESOURCE}
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
              <ResourceButton
                icon={WaterIcon}
                color="#5286E9"
                text="Water"
                onClick={() => dispatch(setResourceType(WATER_RESOURCE_TYPE))}
                data-cy="button-water-data-selector"
              />
              <ResourceButton
                icon={ForagingIcon}
                color="#5DA694"
                text="Foraging"
                onClick={() => dispatch(setResourceType(FORAGE_RESOURCE_TYPE))}
                data-cy="button-foraging-data-selector"
              />
              <ResourceButton
                icon={FoodIcon}
                color="#FF9A55"
                text="Food"
                onClick={() => dispatch(setResourceType(FOOD_RESOURCE_TYPE))}
                data-cy="button-food-data-selector"
              />
              <ResourceButton
                icon={BathroomIcon}
                color="#9E9E9E"
                text="Bathroom"
                onClick={() => dispatch(setResourceType(BATHROOM_RESOURCE_TYPE))}
                data-cy="button-bathroom-data-selector"
              />
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </>
  );
}

export default DesktopChooseResource;
