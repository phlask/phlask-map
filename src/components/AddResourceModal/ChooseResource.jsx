import React from 'react';
import styles from './AddResourceModal.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  CHANGE_PHLASK_TYPE,
  PHLASK_TYPE_NONE,
  PHLASK_TYPE_BATHROOM,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_FORAGING,
  PHLASK_TYPE_WATER,
  TOOLBAR_MODAL_RESOURCE
} from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as WaterIconCR } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as FoodIconCR } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIconCR } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as ToiletIconCR } from '../icons/ToiletIconChooseResource.svg';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

function ChooseResource({ setFormStep }) {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.toolbarModal);

  const changePhlaskType = phlaskType => {
    dispatch({ type: 'SET_TOOLBAR_MODAL', phlaskType: phlaskType });
  };

  const theme = useTheme();
  return (
    <div className={isMobile ? styles.dialog : styles.dialogDesktop}>
      <h2 className={isMobile ? styles.greyHeader : styles.greyHeaderDesktop}>
        {isMobile ? 'Add a Resource' : 'Add a Site'}
      </h2>
      <h3 className={isMobile ? styles.subHeader : styles.subHeaderDesktop}>
        Choose the type of resource you like
        <br />
        to add and submit the form.
      </h3>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'water' : 'waterDesktop'}
          onClick={() => setFormStep('addWaterTap')}
          sx={{
            textTransform: 'capitalize',
            fontSize: '20px',
            lineHeight: '1'
          }}
        >
          <WaterIconCR />
          <span>Water</span>
        </Button>
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'food' : 'foodDesktop'}
          onClick={() => setFormStep('addFood')}
          sx={{
            textTransform: 'capitalize',
            fontSize: '20px',
            lineHeight: '1'
          }}
        >
          <FoodIconCR />
          Food
        </Button>
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'bathrooms' : 'bathroomsDesktop'}
          onClick={() => setFormStep('addBathroom')}
          sx={{
            textTransform: 'capitalize',
            fontSize: '20px',
            lineHeight: '1'
          }}
        >
          <ToiletIconCR />
          Bathrooms
        </Button>
        <Button
          // this copy is different than the copy from the figma page,
          // this might be a bit more clear? can make a point to ask
          // about this next week

          className={styles.modalButton}
          variant={isMobile ? 'foraging' : 'foragingDesktop'}
          onClick={() => setFormStep('addForaging')}
          sx={{
            textTransform: 'capitalize',
            fontSize: '20px',
            lineHeight: '1'
          }}
        >
          <ForagingIconCR />
          Foraging
        </Button>
      </div>
    </div>
  );
}

export default ChooseResource;
