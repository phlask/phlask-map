import React from "react";
import { Modal, Button } from "react-bootstrap";

function ChooseResource({ setFormStep }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add a Resource</Modal.Title>
      </Modal.Header>
      <Button variant="primary" onClick={() => setFormStep("addWaterTap")}>
        Water Tap
      </Button>
      <Button variant="primary" onClick={() => setFormStep("addFood")}>
        Food
      </Button>
      <Button variant="primary" onClick={() => setFormStep("addBathroom")}>
        Bathroom
      </Button>
      {/* this copy is different than the copy from the figma page,
        this might be a bit more clear? can make a point to ask 
        about this next week */}
      <Button variant="primary" onClick={() => setFormStep("addForaging")}>
        Foraging
      </Button>
    </>
  );
}

export default ChooseResource;
