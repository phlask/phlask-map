import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import waterImg from "../images/waterButton.png";
import foodImg from "../images/foodButton.png";
import phlaskImg from "../images/PHLASK Button.png";
import styles from "./TutorialModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import phlaskFilterIcon from "../icons/PhlaskFilterIcon";
import schoolIcon from "../images/food-marker-icons/school.png";
import charterSchoolIcon from "../images/food-marker-icons/charter-school.png";
import useLocalStorage from "../../hooks/useLocalStorage";

const TutorialModal = ({ showButton }) => {
  const [showModal, setShowModal] = useState(null);
  const [modalStep, setModalStep] = useState(1);
  const [showModalPreference, setShowModalPreference] = useLocalStorage(
    "showModalAgain",
    true
  );
  const [showModalCheckbox, setShowModalCheckbox] = useState(true);
  const [modalCheckbox, setModalCheckbox] = useState(false);

  function handleShow() {
    setShowModal(true);
    setShowModalCheckbox(false);
  }

  function handleClose() {
    setShowModal(false);
    setModalStep(1);
  }

  function handleNext() {
    setModalStep(modalStep + 1);
  }

  function handlePrev() {
    setModalStep(modalStep - 1);
  }

  const handleCheckboxChange = (event) => {
    setModalCheckbox(event.target.checked);
    if (modalCheckbox) {
      setShowModalPreference(true);
    } else {
      setShowModalPreference(false);
    }
  };

  useEffect(() => {
    setShowModal(showModalPreference);
  }, []);

  const modalContent = {
    1: {
      title: <h3 className={styles.text}>Find & Share free Resources</h3>,
      body: (
        <p className={styles.text}>
          Your tool for finding and sharing free resources in Philadelphia - all
          you have to do is PHLask!
        </p>
      ),
    },
    2: {
      title: <h3 className={styles.text}>Toggle Between Resources</h3>,
      body: (
        <p className={styles.text}>
          Switch easily between water and food resources. We also got foraging
          and toilets for you.
        </p>
      ),
    },
    3: {
      title: <h3 className={styles.text}>Hit the Phlask Button</h3>,
      body: (
        <p className={styles.text}>
          Use the PHLASK button to find the nearest location to you no matter
          which resource is selected.
        </p>
      ),
    },
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent[modalStep].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {modalContent[modalStep].body}
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          {modalStep === 1 && showModalCheckbox ? (
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={modalCheckbox}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  label="Don't show this again"
                  className={`${styles.text} ${styles.checkbox}`}
                />
              </Form.Group>
            </Form>
          ) : null}
          {modalStep !== 1 && (
            <Button variant="blue" onClick={handlePrev}>
              Previous
            </Button>
          )}
          {modalStep !== 3 ? (
            <Button variant="blue" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="red" onClick={handleClose}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {showButton && (
        <button onClick={handleShow} className={styles.infoButton}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="2x"
            color="#999"
            className={styles.infoIcon}
          />
        </button>
      )}
    </>
  );
};

export default TutorialModal;
