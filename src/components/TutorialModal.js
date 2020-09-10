/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TutorialModal = ({ handleClose, show, handleNext, step }) => {
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={{ handleNext }}>
          {step == 4 ? "Prev" : "Next"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialModal;
