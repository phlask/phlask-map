import React from 'react';
import styles from './AddResourceModal.module.scss';
import Button from '@mui/material/Button';
import { ReactComponent as WaterIconCR } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as FoodIconCR } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIconCR } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as ToiletIconCR } from '../icons/ToiletIconChooseResource.svg';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ChooseResource({ setFormStep }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div className={isMobile ? styles.dialog : styles.dialogDesktop}>
      <h2 className={isMobile ? styles.greyHeader : styles.greyHeaderDesktop}>
        Add a Resource
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
        >
          <WaterIconCR />
          <span>Water</span>
        </Button>
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'food' : 'foodDesktop'}
          onClick={() => setFormStep('addFood')}
        >
          <FoodIconCR />
          Food
        </Button>
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'bathrooms' : 'bathroomsDesktop'}
          onClick={() => setFormStep('addBathroom')}
        >
          <ToiletIconCR />
          Bathroom
        </Button>
        {/* this copy is different than the copy from the figma page,
          this might be a bit more clear? can make a point to ask 
          about this next week */}
        <Button
          className={styles.modalButton}
          variant={isMobile ? 'foraging' : 'foragingDesktop'}
          onClick={() => setFormStep('addForaging')}
        >
          <ForagingIconCR />
          Foraging
        </Button>
      </div>
    </div>
  );
}

export default ChooseResource;
