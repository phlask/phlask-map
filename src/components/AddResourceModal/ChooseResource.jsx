import React from "react";
import styles from "./AddResourceModal.module.scss";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactComponent as WaterIconCR } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as FoodIconCR } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIconCR } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as ToiletIconCR } from '../icons/ToiletIconChooseResource.svg';

function ChooseResource({ setFormStep }) {
  return (
    <div className={styles.dialog}>
      <h2 className={styles.greyHeader}>Add a Resource</h2>
      <h3 className={styles.subHeader}>Choose the type of resource you like<br/>to add and submit the form.</h3>
      <div className={styles.buttonWrapper}>
          <Button
            className={styles.modalButton}
            variant= "water"
            onClick={() => setFormStep("addWaterTap")}
          >
          <WaterIconCR/>
            <span>Water</span>
          </Button>
          <Button
            className={styles.modalButton}
            variant="food"
            onClick={() => setFormStep("addFood")}
          >
            <FoodIconCR/>
            Food
          </Button>
          <Button
            className={styles.modalButton}
            variant="bathrooms"
            onClick={() => setFormStep("addBathroom")}
          >
            <ToiletIconCR/>
            Bathroom
          </Button>
          {/* this copy is different than the copy from the figma page,
          this might be a bit more clear? can make a point to ask 
          about this next week */}
          <Button
            className={styles.modalButton}
            variant="foraging"
            onClick={() => setFormStep("addForaging")}
          >
            <ForagingIconCR/>
            Foraging
          </Button>
      </div>
    </div>
  );
}

export default ChooseResource;
