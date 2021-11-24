import React from "react";
import styles from "./AddResourceModal.module.scss";
import { Modal, Button } from "react-bootstrap";

function ChooseResource({ setFormStep }) {
  return (
    <div className={styles.modalContent}>
      <Modal.Header className={styles.modalHeader} closeButton></Modal.Header>
      <h1 className={styles.greyHeader}>Add a Resource</h1>
      <Button
        className={styles.modalButton}
        variant="primary"
        onClick={() => setFormStep("addWaterTap")}
      >
        Water Tap
      </Button>
      <Button
        className={styles.modalButton}
        variant="primary"
        onClick={() => setFormStep("addFood")}
      >
        Food
      </Button>
      <Button
        className={styles.modalButton}
        variant="primary"
        onClick={() => setFormStep("addBathroom")}
      >
        Bathroom
      </Button>
      {/* this copy is different than the copy from the figma page,
        this might be a bit more clear? can make a point to ask 
        about this next week */}
      <Button
        className={styles.modalButton}
        variant="primary"
        onClick={() => setFormStep("addForaging")}
      >
        Foraging
      </Button>
    </div>
  );
}

export default ChooseResource;
