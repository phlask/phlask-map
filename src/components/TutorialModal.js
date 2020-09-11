/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TutorialModal = ({ handleClose, show, handleNext, step, handlePrev }) => {
  const modalContent = {
    1: { title: "case1", body: "case 1" },
    2: { title: "case2", body: "case 2" },
    3: { title: "case3", body: "case 3" },
    4: { title: "case4", body: "case 4" }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>{modalContent[step].title}</Modal.Header>
      <Modal.Body>{modalContent[step].body}</Modal.Body>
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
