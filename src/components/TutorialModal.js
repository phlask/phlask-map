import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import waterImg from "./images/waterButton.png";
import foodImg from "./images/foodButton.png";
import phlaskImg from "./images/PHLASK Button.png";
import styles from "./TutorialModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

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
        <p>
          The control panel at the bottom of the screen allows you to toggle
          between WATER{" "}
          <img src={waterImg} alt="" className={styles.modalIcon} /> and FOOD{" "}
          <img className={styles.modalIcon} src={foodImg} alt="" /> interfaces.
          Select the desired interface to search the city for free water and
          food locations. Use the center PHLASK button{" "}
          <img src={phlaskImg} alt="" className={styles.modalIcon} /> to find
          the nearest source of water or food, depending on which interface is
          toggled.
        </p>
      )
    },
    3: {
      title: "Filter",
      body: (
        <p>
          What’s a water app without a filter? Click the{" "}
          <FontAwesomeIcon
            icon={faSlidersH}
            className={styles.filterIcon}
            size="1.5x"
            color="#999"
          />{" "}
          icon to filter the taps on the WATER and FOOD interfaces with more
          specific criteria.
        </p>
      )
    },
    4: { title: "Legend", body: "Legend" }
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
