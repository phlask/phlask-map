import React from "react";
import { Modal, Button } from "react-bootstrap";
import waterImg from "./images/waterButton.png";
import foodImg from "./images/foodButton.png";
import phlaskImg from "./images/PHLASK Button.png";
import styles from "./TutorialModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import phlaskFilterIcon from "./icons/PhlaskFilterIcon";
import schoolIcon from "./images/food-marker-icons/school.png";
import charterSchoolIcon from "./images/food-marker-icons/charter-school.png";

const TutorialModal = ({ handleClose, show, handleNext, step, handlePrev }) => {
  const modalContent = {
    1: {
      title: <h3 className={styles.text}>Welcome to the PHLASK App!</h3>,
      body: (
        <p className={styles.text}>
          Your tool for finding and sharing free resources in Philadelphia - all
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
            className={styles.filterIcon}
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
          <p>
            Public{" "}
            <img
              className={styles.tapIcon}
              src={phlaskFilterIcon("Public", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>
              These taps are maintained by the City or publicly-funded
              enterprise
            </p>
          </p>
          <p>
            Shared{" "}
            <img
              className={styles.tapIcon}
              src={phlaskFilterIcon("Shared", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>
              Taps located in private enterprises that have either explicitly
              granted public access or function as a de-facto public space
            </p>
          </p>{" "}
          <p>
            Private{" "}
            <img
              className={styles.tapIcon}
              src={phlaskFilterIcon("Private", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>
              These taps are located in private businesses; public access is not
              guaranteed
            </p>
          </p>{" "}
          <p>
            Restricted{" "}
            <img
              className={styles.tapIcon}
              src={phlaskFilterIcon("Restricted", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>These taps are restricted from public use</p>
          </p>
          <p>
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
          </p>
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
