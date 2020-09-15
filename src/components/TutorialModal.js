/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import waterImg from "./images/waterButton.png";
import foodImg from "./images/foodButton.png";
import phlaskImg from "./images/PHLASK Button.png";
import styles from "./TutorialModal.module.scss";
import { isMobile } from "react-device-detect";

const TutorialModal = ({ handleClose, show, handleNext, step, handlePrev }) => {
  const modalContent = {
    1: {
      title: "Welcome to the PHLASK App!",
      body:
        "Your tool for finding and sharing free resources in Philadelphia - all you have to do is PHLask!"
    },
    2: {
      title: "Finding Water & Food",
      body: (
        <>
          <p>
            The control panel at the bottom of the screen allows you to toggle
            between WATER
          </p>
          <img src={waterImg} alt="" className={styles.modalIcon} />
          <p>and FOOD</p>{" "}
          <img className={styles.modalIcon} src={foodImg} alt="" />
          <p>
            interfaces. Select the desired interface to search the city for free
            water and food locations. Use the center PHLASK button
          </p>{" "}
          <img src={phlaskImg} alt="" className={styles.modalIcon} />
          <p>
            to find the nearest source of water or food, depending on which
            interface is toggled.
          </p>
        </>
      )
    },
    3: {
      title: "Filter",
      body:
        "What’s a water app without a filter? Click the (*filter icon*) icon to filter the taps on the WATER and FOOD interfaces with more specific criteria."
    },
    4: { title: "Legend", body: "case 4" }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>{modalContent[step].title}</Modal.Header>
      <Modal.Body className={styles.modalBody}>
        {modalContent[step].body}
      </Modal.Body>
      <Modal.Footer>
        {step != 1 && (
          <Button variant="primary" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {step != 4 && (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialModal;
