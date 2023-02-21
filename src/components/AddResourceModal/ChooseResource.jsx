import React from "react";
import styles from "./AddResourceModal.module.scss";
//import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactComponent as WaterIconCR } from '../icons/WaterIconChooseResource.svg';
import { ReactComponent as FoodIconCR } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIconCR } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as ToiletIconCR } from '../icons/ToiletIconChooseResource.svg';

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const buttonStyle = {
  width: "200px"
}

function ChooseResource({ setFormStep }) {
  return (
    <div className={styles.modalContent} style={{width: 500}}>
      <DialogTitle className={styles.modalHeader}></DialogTitle>
      <h1 className={styles.greyHeader}>Add a Resource</h1>
      <div style={style}>
        <Button
          className={styles.modalButton}
          variant= "water"
          onClick={() => setFormStep("addWaterTap")}
          style={buttonStyle}
        >
        <WaterIconCR/>
          Water Tap
        </Button>
      </div>
      <div style={style}>
        <Button
          className={styles.modalButton}
          variant="food"
          onClick={() => setFormStep("addFood")}
          style={buttonStyle}
        >
          <FoodIconCR/>
          Food
        </Button>
      </div>
      <div style={style}>
        <Button
          className={styles.modalButton}
          variant="bathrooms"
          onClick={() => setFormStep("addBathroom")}
          style={buttonStyle}
        >
          <ToiletIconCR/>
          Bathroom
        </Button>
      </div>
      <div style={style}>
        {/* this copy is different than the copy from the figma page,
        this might be a bit more clear? can make a point to ask 
        about this next week */}
        <Button
          className={styles.modalButton}
          variant="foraging"
          onClick={() => setFormStep("addForaging")}
          style={buttonStyle}
        >
          <ForagingIconCR/>
          Foraging
        </Button>
      </div>
    </div>
  );
}

export default ChooseResource;
