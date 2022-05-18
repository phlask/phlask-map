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

  const handleCheckboxChange = event => {
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
      title: <h3 className={styles.text}>Welcome to the PHLASK App!</h3>,
      body: (
        <p className={styles.text}>
          Your tool--made more awesome by Gabe and Seif (ha-ha)--for finding and sharing free resources in Philadelphia - all
          you have to do is PHLask!
        </p>
      )
    },
    2: {
      title: <h3 className={styles.text}>Finding Water & Food</h3>,
      body: (
        <p className={styles.text}>
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
      title: <h3 className={styles.text}>Filter</h3>,
      body: (
        <p className={styles.text}>
          What’s a water app without a filter? Click the{" "}
          <FontAwesomeIcon
            icon={faSlidersH}
            className="filterIcon"
            color="#999"
          />{" "}
          icon to filter the taps on the WATER and FOOD interfaces with more
          specific criteria.
        </p>
      )
    },
    4: {
      title: <h3 className={styles.text}>Legend</h3>,
      body: (
        <div className={styles.text}>
          <span>
            Public{" "}
            <img src={phlaskFilterIcon("Public", 25, 25)} alt="Public"></img>{" "}
            <p>
              These taps are maintained by the City or publicly-funded
              enterprise
            </p>
          </span>
          <span>
            Shared{" "}
            <img src={phlaskFilterIcon("Shared", 25, 25)} alt="Public"></img>{" "}
            <p>
              Taps located in private enterprises that have either explicitly
              granted public access or function as a de-facto public space
            </p>
          </span>{" "}
          <span>
            Private{" "}
            <img src={phlaskFilterIcon("Private", 25, 25)} alt="Public"></img>{" "}
            <p>
              These taps are located in private businesses; public access is not
              guaranteed
            </p>
          </span>{" "}
          <span>
            Restricted{" "}
            <img
              src={phlaskFilterIcon("Restricted", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>These taps are restricted from public use</p>
          </span>
          <span>
            School{" "}
            <img
              className={styles.modalIcon}
              src={schoolIcon}
              alt="School"
            ></img>{" "}
            <img
              className={styles.modalIcon}
              src={charterSchoolIcon}
              alt="Charter School"
            ></img>
            <p>
              Public, private and charter schools that offer free food and
              meals.
            </p>
          </span>
          <p>
            Recreation Parks and recreation centers that offer free food and
            meals to the public
          </p>
          <p>
            Congregation Houses of worship and religious congregations that
            offer free food
          </p>
          <p>
            Other Places offering free food that do not fit the above categories
          </p>
        </div>
      )
    }
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
          {modalStep !== 4 ? (
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
