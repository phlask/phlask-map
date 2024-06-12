import { Box, Button, Collapse, Paper } from '@mui/material';
import React, { useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHANGE_RESOURCE_TYPE,
  TOOLBAR_MODAL_RESOURCE,
  TOOLBAR_MODAL_NONE,
  setToolbarModal
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
    >
      <Icon className={styles.icon} width="45px" height="45px" />
      <p className={styles.label}>{props.text}</p>
    </Button>
  );
};

export default function ChooseResource(props) {
  const dispatch = useDispatch();

  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  const ref = useRef(null);

  const handleClickOutside = () => {
    dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {!isMobile && (
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
                  onClick={() => {
                    dispatch({
                      type: CHANGE_RESOURCE_TYPE,
                      resourceType: WATER_RESOURCE_TYPE
                    });
                  }}
                />
                <ResourceButton
                  icon={ForagingIcon}
                  color="#5DA694"
                  text="Foraging"
                  onClick={() => {
                    dispatch({
                      type: CHANGE_RESOURCE_TYPE,
                      resourceType: FORAGE_RESOURCE_TYPE
                    });
                  }}
                />
                <ResourceButton
                  icon={FoodIcon}
                  color="#FF9A55"
                  text="Food"
                  onClick={() => {
                    dispatch({
                      type: CHANGE_RESOURCE_TYPE,
                      resourceType: FOOD_RESOURCE_TYPE
                    });
                  }}
                />
                <ResourceButton
                  icon={BathroomIcon}
                  color="#9E9E9E"
                  text="Bathroom"
                  onClick={() => {
                    dispatch({
                      type: CHANGE_RESOURCE_TYPE,
                      resourceType: BATHROOM_RESOURCE_TYPE
                    });
                  }}
                />
              </Box>
            </Box>
          </Collapse>
        </Paper>
      )}
      {isMobile && <Paper></Paper>}
    </>
  );
}
