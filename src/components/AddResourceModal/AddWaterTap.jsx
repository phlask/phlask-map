import React from "react";
import { Modal } from "react-bootstrap";

function addWaterTap() {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Water Tap</Modal.Title>
      </Modal.Header>

      <button onClick={() => console.log("previous was clicked")}>
        Previous
      </button>
      <button onClick={() => console.log("next was clicked")}>Next</button>
    </>
  );
}

export default addWaterTap;
