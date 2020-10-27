import React, {useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import waterImg from "./images/waterButton.png";
import foodImg from "./images/foodButton.png";
import phlaskImg from "./images/PHLASK Button.png";
import "./TutorialModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import phlaskFilterIcon from "./icons/PhlaskFilterIcon";
import schoolIcon from "./images/food-marker-icons/school.png";
import charterSchoolIcon from "./images/food-marker-icons/charter-school.png";
import useLocalStorage from '../hooks/useLocalStorage'

const TutorialModal = ({ handleClose, show, handleNext, showModalCheckbox, setShowModalPreference, step, handlePrev }) => {
  const modalContent = {
    1: {
      title: <h3 className="text">Welcome to the PHLASK App!</h3>,
      body: (
        <p className="text">
          Your tool for finding and sharing free resources in Philadelphia - all
          you have to do is PHLask!
        </p>
      )
    },
    2: {
      title: <h3 className="text">Finding Water & Food</h3>,
      body: (
        <p className="text">
          The control panel at the bottom of the screen allows you to toggle
          between WATER <img src={waterImg} alt="" className="modalIcon" /> and
          FOOD <img className="modalIcon" src={foodImg} alt="" /> interfaces.
          Select the desired interface to search the city for free water and
          food locations. Use the center PHLASK button{" "}
          <img src={phlaskImg} alt="" className="modalIcon" /> to find the
          nearest source of water or food, depending on which interface is
          toggled.
        </p>
      )
    },
    3: {
      title: <h3 className="text">Filter</h3>,
      body: (
        <p className="text">
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
      title: <h3 className="text">Legend</h3>,
      body: (
        <div className="text">
          <p>
            Public{" "}
            <img src={phlaskFilterIcon("Public", 25, 25)} alt="Public"></img>{" "}
            <p>
              These taps are maintained by the City or publicly-funded
              enterprise
            </p>
          </p>
          <p>
            Shared{" "}
            <img src={phlaskFilterIcon("Shared", 25, 25)} alt="Public"></img>{" "}
            <p>
              Taps located in private enterprises that have either explicitly
              granted public access or function as a de-facto public space
            </p>
          </p>{" "}
          <p>
            Private{" "}
            <img src={phlaskFilterIcon("Private", 25, 25)} alt="Public"></img>{" "}
            <p>
              These taps are located in private businesses; public access is not
              guaranteed
            </p>
          </p>{" "}
          <p>
            Restricted{" "}
            <img
              src={phlaskFilterIcon("Restricted", 25, 25)}
              alt="Public"
            ></img>{" "}
            <p>These taps are restricted from public use</p>
          </p>
          <p>
            School{" "}
            <img className="modalIcon" src={schoolIcon} alt="School"></img>{" "}
            <img
              className="modalIcon"
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


  const [modalCheckbox, setModalCheckbox] = useState(false)

  const handleCheckboxChange = (event) => {
    setModalCheckbox(event.target.checked)
    if(modalCheckbox) {
      setShowModalPreference(true)
    } else {
      setShowModalPreference(false)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>{modalContent[step].title}</Modal.Header>
      <Modal.Body className="modalBody">{modalContent[step].body}</Modal.Body>
      <Modal.Footer>
        {step === 1 && showModalCheckbox ? (
        <Form> 
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check checked={modalCheckbox} onChange={handleCheckboxChange} type="checkbox" label="Don't show this again" className='text checkbox'/>
          </Form.Group>
        </Form>
        ) : null}
        {step != 1 && (
          <Button variant="blue" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {step != 4 ? (
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
  );
};

export default TutorialModal;
