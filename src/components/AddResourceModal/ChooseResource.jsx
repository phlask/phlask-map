import React from 'react';
import styles from './AddResourceModal.module.scss';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as WaterIconCR } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as FoodIconCR } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIconCR } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as ToiletIconCR } from '../icons/ToiletIconChooseResource.svg';
import { isMobile } from 'react-device-detect';

function ChooseResource({ setFormStep }) {
  const dispatch = useDispatch();

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
